import { __awaiter } from "tslib";
import * as React from 'react';
import { action } from 'mobx';
import { observer } from 'mobx-react';
import ElementContext from '../utils/ElementContext';
import { isNode } from '../types';
import { useDndDrag, Modifiers } from './useDndDrag';
import { useDndManager } from './useDndManager';
export const DRAG_NODE_EVENT = 'drag_node';
export const DRAG_NODE_START_EVENT = `${DRAG_NODE_EVENT}_start`;
export const DRAG_NODE_END_EVENT = `${DRAG_NODE_EVENT}_end`;
export const DRAG_MOVE_OPERATION = 'move.useDragNode';
const defaultOperation = {
    [Modifiers.DEFAULT]: { type: DRAG_MOVE_OPERATION }
};
export const useDragNode = (spec, props) => {
    const element = React.useContext(ElementContext);
    if (!isNode(element)) {
        throw new Error('useDragNode must be used within the scope of a Node');
    }
    const elementRef = React.useRef(element);
    elementRef.current = element;
    const dndManager = useDndManager();
    return useDndDrag(React.useMemo(() => {
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
                    .fireEvent(DRAG_NODE_START_EVENT, elementRef.current, monitor.getDragEvent(), monitor.getOperation());
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
                        const nodeChildren = e.getChildren().filter(isNode);
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
                    .fireEvent(DRAG_NODE_EVENT, elementRef.current, event, monitor.getOperation());
            },
            canDrag: spec ? spec.canDrag : undefined,
            end: (dropResult, monitor, p) => __awaiter(void 0, void 0, void 0, function* () {
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
                action(() => {
                    controller.fireEvent(DRAG_NODE_END_EVENT, elementRef.current, monitor.getDragEvent(), monitor.getOperation());
                })();
            }),
            collect: spec ? spec.collect : undefined,
            canCancel: spec ? spec.canCancel : true
        };
        return sourceSpec;
    }, [spec, dndManager]), props);
};
export const withDragNode = (spec) => (WrappedComponent) => {
    const Component = props => {
        // TODO fix cast to any
        const [dragNodeProps, dragNodeRef] = useDragNode(spec, props);
        return React.createElement(WrappedComponent, Object.assign({}, props, { dragNodeRef: dragNodeRef }, dragNodeProps));
    };
    Component.displayName = `withDragNode(${WrappedComponent.displayName || WrappedComponent.name})`;
    return observer(Component);
};
//# sourceMappingURL=useDragNode.js.map