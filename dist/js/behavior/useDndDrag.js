"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.withDndDrag = exports.useDndDrag = exports.Modifiers = void 0;
const tslib_1 = require("tslib");
const React = tslib_1.__importStar(require("react"));
const d3 = tslib_1.__importStar(require("d3"));
const mobx_1 = require("mobx");
const mobx_react_1 = require("mobx-react");
const util_1 = require('@patternfly/react-core/dist/js/helpers/util');
const ElementContext_1 = tslib_1.__importDefault(require("../utils/ElementContext"));
const useCallbackRef_1 = tslib_1.__importDefault(require("../utils/useCallbackRef"));
const useDndManager_1 = require("./useDndManager");
exports.Modifiers = {
    DEFAULT: 0,
    ALT: 0x01,
    CTRL: 0x02,
    META: 0x04,
    SHIFT: 0x08
};
const getModifiers = (event) => {
    let modifiers = exports.Modifiers.DEFAULT;
    if (event.altKey) {
        // eslint-disable-next-line no-bitwise
        modifiers |= exports.Modifiers.ALT;
    }
    if (event.ctrlKey) {
        // eslint-disable-next-line no-bitwise
        modifiers |= exports.Modifiers.CTRL;
    }
    if (event.metaKey) {
        // eslint-disable-next-line no-bitwise
        modifiers |= exports.Modifiers.META;
    }
    if (event.shiftKey) {
        // eslint-disable-next-line no-bitwise
        modifiers |= exports.Modifiers.SHIFT;
    }
    return modifiers;
};
const getOperation = (operation, event) => {
    if (!operation) {
        return undefined;
    }
    if (operation.hasOwnProperty('type')) {
        return operation;
    }
    return operation[getModifiers((event && event.sourceEvent) || event)] || operation[exports.Modifiers.DEFAULT];
};
const hasOperation = (operation) => !!(operation && (operation.hasOwnProperty('type') || Object.keys(operation).length > 0));
const EMPTY_PROPS = Object.freeze({});
const useDndDrag = (spec, props) => {
    const specRef = React.useRef(spec);
    specRef.current = spec;
    const propsRef = React.useRef(props != null ? props : EMPTY_PROPS);
    propsRef.current = props != null ? props : EMPTY_PROPS;
    const dndManager = useDndManager_1.useDndManager();
    const element = React.useContext(ElementContext_1.default);
    const elementRef = React.useRef(element);
    elementRef.current = element;
    const idRef = React.useRef();
    // source monitor
    const monitor = React.useMemo(() => {
        const sourceMonitor = {
            getHandlerId: () => idRef.current,
            receiveHandlerId: (sourceId) => {
                idRef.current = sourceId;
            },
            getDropHints: () => dndManager.getDropHints(),
            canDrag: () => dndManager.canDragSource(idRef.current),
            isDragging: () => dndManager.isDraggingSource(idRef.current),
            getItemType: () => dndManager.getItemType(),
            getItem: () => dndManager.getItem(),
            getDropResult: () => dndManager.getDropResult(),
            didDrop: () => dndManager.didDrop(),
            getDragEvent: () => dndManager.getDragEvent(),
            getOperation: () => dndManager.getOperation(),
            isCancelled: () => dndManager.isCancelled()
        };
        return sourceMonitor;
    }, [dndManager]);
    const createKeyHandlerId = React.useCallback((event = '') => `${event}.useDndDrag-${monitor.getHandlerId()}`, [monitor]);
    React.useEffect(() => () => {
        if (util_1.canUseDOM) {
            d3.select(window.document).on(createKeyHandlerId(), null);
        }
        if (dndManager.isDragging() && dndManager.getSourceId() === monitor.getHandlerId()) {
            dndManager.endDrag();
        }
    }, []);
    const refCallback = useCallbackRef_1.default(React.useCallback((node) => {
        let ownerDocument;
        if (node) {
            ownerDocument = node.ownerDocument;
            let operationChangeEvents;
            let operation;
            d3.select(node).call(d3
                .drag()
                .container(
            // TODO bridge the gap between scene tree and dom tree
            () => {
                const selected = node instanceof SVGElement ? d3.select(node.ownerSVGElement) : d3.select(ownerDocument);
                return selected.select('[data-surface="true"]').node();
            })
                .on('start', function (event) {
                operation =
                    typeof specRef.current.operation === 'function'
                        ? specRef.current.operation(monitor, propsRef.current)
                        : specRef.current.operation;
                const updateOperation = mobx_1.action(() => tslib_1.__awaiter(this, void 0, void 0, function* () {
                    if (operation && idRef.current) {
                        const op = getOperation(operation, event);
                        if (dndManager.getOperation() !== op) {
                            // restart the drag with the new operation
                            if (dndManager.isDragging()) {
                                // copy the event otherwise it will be mutated by #cancel()
                                const event = Object.assign({}, dndManager.getDragEvent());
                                const cancelled = dndManager.cancel();
                                operationChangeEvents = {
                                    begin: [
                                        cancelled ? event.initialX : event.x,
                                        cancelled ? event.initialY : event.y,
                                        cancelled ? event.initialPageX : event.pageX,
                                        cancelled ? event.initialPageY : event.pageY
                                    ],
                                    drag: [event.x, event.y, event.pageX, event.pageY]
                                };
                                yield dndManager.endDrag();
                            }
                            if (op && operationChangeEvents) {
                                mobx_1.runInAction(() => {
                                    dndManager.beginDrag(idRef.current, op, ...operationChangeEvents.begin);
                                    dndManager.drag(...operationChangeEvents.drag);
                                    operationChangeEvents = undefined;
                                });
                            }
                        }
                    }
                }));
                d3.select(ownerDocument)
                    .on(createKeyHandlerId('keydown'), event => mobx_1.action(() => {
                    const e = event;
                    if (e.key === 'Escape') {
                        if (dndManager.isDragging() && dndManager.cancel()) {
                            operationChangeEvents = undefined;
                            d3.select(event.view).on('.drag', null);
                            d3.select(ownerDocument).on(createKeyHandlerId(), null);
                            dndManager.endDrag();
                        }
                    }
                    else {
                        updateOperation();
                    }
                }))
                    .on(createKeyHandlerId('keyup'), updateOperation);
            })
                .on('drag', event => mobx_1.action(() => {
                const { pageX, pageY } = d3.event.sourceEvent;
                const { x, y } = d3.event;
                if (dndManager.isDragging()) {
                    dndManager.drag(x, y, pageX, pageY);
                }
                else if (operationChangeEvents) {
                    operationChangeEvents.drag = [x, y, pageX, pageY];
                }
                else {
                    const op = getOperation(operation, event);
                    if (op || !hasOperation(operation)) {
                        if (idRef.current) {
                            dndManager.beginDrag(idRef.current, op, x, y, pageX, pageY);
                        }
                    }
                    else {
                        operationChangeEvents = {
                            begin: [x, y, pageX, pageY],
                            drag: [x, y, pageX, pageY]
                        };
                    }
                }
            }))
                .on('end', mobx_1.action(() => {
                operationChangeEvents = undefined;
                operation = undefined;
                d3.select(ownerDocument).on(createKeyHandlerId(), null);
                if (dndManager.isDragging()) {
                    dndManager.drop();
                    dndManager.endDrag();
                }
            }))
                .filter(() => !d3.event.ctrlKey && !d3.event.button && dndManager.canDragSource(idRef.current)));
        }
        return () => {
            if (node) {
                d3.select(node).on('.drag', null);
            }
        };
    }, [dndManager, monitor]));
    React.useEffect(() => {
        const dragSource = {
            type: spec.item.type,
            canCancel: () => {
                if (typeof specRef.current.canCancel === 'boolean') {
                    return specRef.current.canCancel;
                }
                if (typeof specRef.current.canCancel === 'function') {
                    return specRef.current.canCancel(monitor, propsRef.current);
                }
                return true;
            },
            canDrag: () => {
                if (typeof specRef.current.canDrag === 'boolean') {
                    return specRef.current.canDrag;
                }
                if (typeof specRef.current.canDrag === 'function') {
                    return specRef.current.canDrag(monitor, propsRef.current);
                }
                return true;
            },
            beginDrag: () => (specRef.current.begin ? specRef.current.begin(monitor, propsRef.current) : undefined),
            drag: () => {
                if (specRef.current.drag) {
                    const event = monitor.getDragEvent();
                    if (event) {
                        specRef.current.drag(event, monitor, propsRef.current);
                    }
                }
            },
            endDrag: () => specRef.current.end ? specRef.current.end(monitor.getDropResult(), monitor, propsRef.current) : undefined
        };
        const [sourceId, unregister] = dndManager.registerSource(dragSource);
        monitor.receiveHandlerId(sourceId);
        return unregister;
    }, [spec.item.type, dndManager, monitor]);
    const collected = React.useMemo(() => mobx_1.computed(() => (spec.collect ? spec.collect(monitor, propsRef.current) : {}), {
        equals: mobx_1.comparer.shallow
    }), [monitor, spec]);
    return [collected.get(), refCallback];
};
exports.useDndDrag = useDndDrag;
const withDndDrag = (spec) => (WrappedComponent) => {
    const Component = props => {
        // TODO fix cast to any
        const [dndDragProps, dndDragRef] = exports.useDndDrag(spec, props);
        return React.createElement(WrappedComponent, Object.assign({}, props, dndDragProps, { dndDragRef: dndDragRef }));
    };
    Component.displayName = `withDndDrag(${WrappedComponent.displayName || WrappedComponent.name})`;
    return mobx_react_1.observer(Component);
};
exports.withDndDrag = withDndDrag;
//# sourceMappingURL=useDndDrag.js.map