"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.withDragNode = exports.useDragNode = exports.DRAG_MOVE_OPERATION = exports.DRAG_NODE_END_EVENT = exports.DRAG_NODE_START_EVENT = exports.DRAG_NODE_EVENT = void 0;
const tslib_1 = require("tslib");
const React = tslib_1.__importStar(require("react"));
const mobx_1 = require("mobx");
const mobx_react_1 = require("mobx-react");
const ElementContext_1 = tslib_1.__importDefault(require("../utils/ElementContext"));
const types_1 = require("../types");
const useDndDrag_1 = require("./useDndDrag");
const useDndManager_1 = require("./useDndManager");
exports.DRAG_NODE_EVENT = 'drag_node';
exports.DRAG_NODE_START_EVENT = `${exports.DRAG_NODE_EVENT}_start`;
exports.DRAG_NODE_END_EVENT = `${exports.DRAG_NODE_EVENT}_end`;
exports.DRAG_MOVE_OPERATION = 'move.useDragNode';
const defaultOperation = {
    [useDndDrag_1.Modifiers.DEFAULT]: { type: exports.DRAG_MOVE_OPERATION }
};
const useDragNode = (spec, props) => {
    const element = React.useContext(ElementContext_1.default);
    if (!types_1.isNode(element)) {
        throw new Error('useDragNode must be used within the scope of a Node');
    }
    const elementRef = React.useRef(element);
    elementRef.current = element;
    const dndManager = useDndManager_1.useDndManager();
    return useDndDrag_1.useDndDrag(React.useMemo(() => {
        const sourceSpec = {
            item: (spec && spec.item) || { type: '#useDragNode#' },
            operation: (monitor, p) => {
                if (spec) {
                    const operation = typeof spec.operation === 'function' ? spec.operation(monitor, p) : spec.operation;
                    if (typeof operation === 'object' && Object.keys(operation).length > 0) {
                        return Object.assign(Object.assign({}, defaultOperation), operation);
                    }
                }
                return defaultOperation;
            },
            begin: (monitor, p) => {
                elementRef.current.raise();
                if (elementRef.current.isGroup()) {
                    elementRef.current.getChildren().forEach(c => {
                        c.raise();
                    });
                }
                const result = spec && spec.begin && spec.begin(monitor, p);
                elementRef.current
                    .getController()
                    .fireEvent(exports.DRAG_NODE_START_EVENT, elementRef.current, monitor.getDragEvent(), monitor.getOperation());
                return result || elementRef.current;
            },
            drag: (event, monitor, p) => {
                const { dx, dy } = event;
                /**
                 * @param e
                 */
                function moveElement(e) {
                    let moved = true;
                    if (e.isGroup()) {
                        const nodeChildren = e.getChildren().filter(types_1.isNode);
                        if (nodeChildren.length) {
                            moved = false;
                            nodeChildren.forEach(moveElement);
                        }
                    }
                    if (moved) {
                        e.setPosition(e
                            .getPosition()
                            .clone()
                            .translate(dx, dy));
                    }
                }
                moveElement(elementRef.current);
                spec && spec.drag && spec.drag(event, monitor, p);
                elementRef.current
                    .getController()
                    .fireEvent(exports.DRAG_NODE_EVENT, elementRef.current, event, monitor.getOperation());
            },
            canDrag: spec ? spec.canDrag : undefined,
            end: (dropResult, monitor, p) => tslib_1.__awaiter(void 0, void 0, void 0, function* () {
                // FIXME: Get the controller up front due it issues with model updates during dnd operations
                let controller;
                try {
                    controller = elementRef.current.getController();
                }
                catch (e) {
                    return;
                }
                if (spec && spec.end) {
                    try {
                        yield spec.end(dropResult, monitor, p);
                    }
                    catch (_a) {
                        dndManager.cancel();
                    }
                }
                mobx_1.action(() => {
                    controller.fireEvent(exports.DRAG_NODE_END_EVENT, elementRef.current, monitor.getDragEvent(), monitor.getOperation());
                })();
            }),
            collect: spec ? spec.collect : undefined,
            canCancel: spec ? spec.canCancel : true
        };
        return sourceSpec;
    }, [spec, dndManager]), props);
};
exports.useDragNode = useDragNode;
const withDragNode = (spec) => (WrappedComponent) => {
    const Component = props => {
        // TODO fix cast to any
        const [dragNodeProps, dragNodeRef] = exports.useDragNode(spec, props);
        return React.createElement(WrappedComponent, Object.assign({}, props, { dragNodeRef: dragNodeRef }, dragNodeProps));
    };
    Component.displayName = `withDragNode(${WrappedComponent.displayName || WrappedComponent.name})`;
    return mobx_react_1.observer(Component);
};
exports.withDragNode = withDragNode;
//# sourceMappingURL=useDragNode.js.map