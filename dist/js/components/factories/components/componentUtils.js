"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.highlightNode = exports.canDropEdgeOnNode = exports.EDGE_DRAG_TYPE = exports.NODE_DRAG_TYPE = exports.MOVE_CONNECTOR_DROP_TYPE = exports.REGROUP_OPERATION = exports.noDropTargetSpec = exports.edgeDragSourceSpec = exports.groupDropTargetSpec = exports.graphDropTargetSpec = exports.nodeDropTargetSpec = exports.nodeDragSourceSpec = exports.noRegroupDragSourceSpec = exports.nodesEdgeIsDragging = void 0;
const tslib_1 = require("tslib");
const mobx_1 = require("mobx");
const types_1 = require("../../../types");
const behavior_1 = require("../../../behavior");
const MOVE_CONNECTOR_DROP_TYPE = '#moveConnector#';
exports.MOVE_CONNECTOR_DROP_TYPE = MOVE_CONNECTOR_DROP_TYPE;
const NODE_DRAG_TYPE = '#node#';
exports.NODE_DRAG_TYPE = NODE_DRAG_TYPE;
const EDGE_DRAG_TYPE = '#edge#';
exports.EDGE_DRAG_TYPE = EDGE_DRAG_TYPE;
const MOVE_CONNECTOR_OPERATION = 'moveconnector';
const REGROUP_OPERATION = 'regroup';
exports.REGROUP_OPERATION = REGROUP_OPERATION;
const canDropEdgeOnNode = (operation, element, node) => {
    if (!types_1.isEdge(element)) {
        return false;
    }
    const edge = element;
    if (edge.getSource() === node) {
        return false;
    }
    if (edge.getTarget() === node) {
        return true;
    }
    return !node.getTargetEdges().find(e => e.getSource() === edge.getSource());
};
exports.canDropEdgeOnNode = canDropEdgeOnNode;
const highlightNode = (monitor, element) => {
    const operation = monitor.getOperation();
    if (!monitor.isDragging() || !operation) {
        return false;
    }
    if (operation.type === behavior_1.CREATE_CONNECTOR_OPERATION) {
        return (monitor.getItem() !== element &&
            monitor.getItem().getParent() !== element &&
            !monitor
                .getItem()
                .getSourceEdges()
                .find((e) => e.getTarget() === element));
    }
    return operation.canDropOnNode && operation.canDropOnNode(operation.type, monitor.getItem(), element);
};
exports.highlightNode = highlightNode;
const nodeDragSourceSpec = (type, allowRegroup = true, canEdit = false) => ({
    item: { type: NODE_DRAG_TYPE },
    operation: (monitor, props) => (canEdit || props.canEdit) && allowRegroup
        ? {
            [behavior_1.Modifiers.SHIFT]: { type: REGROUP_OPERATION, edit: true }
        }
        : undefined,
    canCancel: monitor => { var _a; return ((_a = monitor.getOperation()) === null || _a === void 0 ? void 0 : _a.type) === REGROUP_OPERATION; },
    begin: (monitor, props) => ({
        element: props.element,
        allowRegroup: (canEdit || props.canEdit) && allowRegroup
    }),
    end: (dropResult, monitor, props) => tslib_1.__awaiter(void 0, void 0, void 0, function* () {
        var _a;
        if (!monitor.isCancelled() && ((_a = monitor.getOperation()) === null || _a === void 0 ? void 0 : _a.type) === REGROUP_OPERATION) {
            if (monitor.didDrop() && dropResult && props && props.element.getParent() !== dropResult) {
                const controller = props.element.getController();
                // perform the update in an action so as not to render too soon
                mobx_1.action(() => {
                    if (controller.getNodeById(props.element.getId())) {
                        dropResult.appendChild(props.element);
                    }
                })();
            }
            else {
                // cancel operation
                return Promise.reject();
            }
        }
        return undefined;
    }),
    collect: monitor => {
        var _a;
        return ({
            dragging: monitor.isDragging(),
            regrouping: ((_a = monitor.getOperation()) === null || _a === void 0 ? void 0 : _a.type) === REGROUP_OPERATION
        });
    }
});
exports.nodeDragSourceSpec = nodeDragSourceSpec;
const noRegroupDragSourceSpec = {
    item: { type: NODE_DRAG_TYPE },
    collect: monitor => ({
        dragging: monitor.isDragging()
    })
};
exports.noRegroupDragSourceSpec = noRegroupDragSourceSpec;
const nodesEdgeIsDragging = (monitor, props) => {
    if (!monitor.isDragging()) {
        return false;
    }
    if (monitor.getOperation() === MOVE_CONNECTOR_OPERATION) {
        return monitor.getItem().getSource() === props.element;
    }
    if (monitor.getOperation() === behavior_1.CREATE_CONNECTOR_OPERATION) {
        return monitor.getItem() === props.element;
    }
    return false;
};
exports.nodesEdgeIsDragging = nodesEdgeIsDragging;
const nodeDropTargetSpec = (accept) => ({
    accept: accept || [EDGE_DRAG_TYPE, behavior_1.CREATE_CONNECTOR_DROP_TYPE],
    canDrop: (item, monitor, props) => {
        var _a;
        if (types_1.isEdge(item)) {
            return canDropEdgeOnNode((_a = monitor.getOperation()) === null || _a === void 0 ? void 0 : _a.type, item, props.element);
        }
        if (item === props.element) {
            return false;
        }
        return !props.element.getTargetEdges().find(e => e.getSource() === item);
    },
    collect: (monitor, props) => ({
        canDrop: highlightNode(monitor, props.element),
        dropTarget: monitor.isOver({ shallow: true }),
        edgeDragging: nodesEdgeIsDragging(monitor, props)
    })
});
exports.nodeDropTargetSpec = nodeDropTargetSpec;
const graphDropTargetSpec = (accept) => ({
    accept: accept || [NODE_DRAG_TYPE, EDGE_DRAG_TYPE, behavior_1.CREATE_CONNECTOR_DROP_TYPE],
    hitTest: () => true,
    canDrop: (item, monitor, props) => {
        var _a;
        return monitor.isOver({ shallow: monitor.getItemType() === behavior_1.CREATE_CONNECTOR_DROP_TYPE }) &&
            ((((_a = monitor.getOperation()) === null || _a === void 0 ? void 0 : _a.type) === REGROUP_OPERATION &&
                // FIXME: the hasParent check is necessary due to model updates during async actions
                item.element.hasParent() &&
                item.element.getParent() !== props.element) ||
                monitor.getItemType() === behavior_1.CREATE_CONNECTOR_DROP_TYPE);
    },
    collect: monitor => {
        const operation = monitor.getOperation();
        const dragEditInProgress = monitor.isDragging() && ((operation === null || operation === void 0 ? void 0 : operation.type) === behavior_1.CREATE_CONNECTOR_OPERATION || (operation === null || operation === void 0 ? void 0 : operation.edit));
        const dragCreate = dragEditInProgress &&
            (monitor.getItemType() === behavior_1.CREATE_CONNECTOR_DROP_TYPE || monitor.getItemType() === MOVE_CONNECTOR_DROP_TYPE);
        return {
            dragEditInProgress,
            dragCreate,
            hasDropTarget: dragEditInProgress && monitor.hasDropTarget()
        };
    },
    dropHint: 'create'
});
exports.graphDropTargetSpec = graphDropTargetSpec;
const groupDropTargetSpec = {
    accept: [NODE_DRAG_TYPE, EDGE_DRAG_TYPE, behavior_1.CREATE_CONNECTOR_DROP_TYPE],
    canDrop: (item, monitor) => {
        var _a;
        return monitor.isOver({ shallow: monitor.getItemType() === behavior_1.CREATE_CONNECTOR_DROP_TYPE }) &&
            (((_a = monitor.getOperation()) === null || _a === void 0 ? void 0 : _a.type) === REGROUP_OPERATION || monitor.getItemType() === behavior_1.CREATE_CONNECTOR_DROP_TYPE);
    },
    collect: monitor => {
        var _a, _b, _c;
        return ({
            droppable: monitor.isDragging() && ((_a = monitor.getOperation()) === null || _a === void 0 ? void 0 : _a.type) === REGROUP_OPERATION,
            dropTarget: monitor.isOver({ shallow: monitor.getItemType() === behavior_1.CREATE_CONNECTOR_DROP_TYPE }),
            canDrop: monitor.isDragging() &&
                (((_b = monitor.getOperation()) === null || _b === void 0 ? void 0 : _b.type) === REGROUP_OPERATION || monitor.getItemType() === behavior_1.CREATE_CONNECTOR_DROP_TYPE),
            dragRegroupable: monitor.isDragging() && ((_c = monitor.getItem()) === null || _c === void 0 ? void 0 : _c.allowRegroup)
        });
    },
    dropHint: 'create'
};
exports.groupDropTargetSpec = groupDropTargetSpec;
const edgeDragSourceSpec = (type, callback) => ({
    item: { type: EDGE_DRAG_TYPE },
    operation: { type: MOVE_CONNECTOR_OPERATION, edit: true, canDropOnNode: canDropEdgeOnNode },
    begin: (monitor, props) => {
        props.element.raise();
        return props.element;
    },
    drag: (event, monitor, props) => {
        props.element.setEndPoint(event.x, event.y);
    },
    end: (dropResult, monitor, props) => {
        var _a;
        props.element.setEndPoint();
        if (monitor.didDrop() && dropResult && canDropEdgeOnNode((_a = monitor.getOperation()) === null || _a === void 0 ? void 0 : _a.type, props.element, dropResult)) {
            callback(props.element.getSource(), dropResult, props.element.getTarget());
        }
    },
    collect: monitor => ({
        dragging: monitor.isDragging()
    })
});
exports.edgeDragSourceSpec = edgeDragSourceSpec;
const noDropTargetSpec = {
    accept: [NODE_DRAG_TYPE, EDGE_DRAG_TYPE, behavior_1.CREATE_CONNECTOR_DROP_TYPE],
    canDrop: () => false
};
exports.noDropTargetSpec = noDropTargetSpec;
//# sourceMappingURL=componentUtils.js.map