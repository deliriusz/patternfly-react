import { Edge, Graph, GraphElement, Node } from '../../../types';
import { DragObjectWithType, DragOperationWithType, DragSourceSpec, DragSpecOperationType, DropTargetMonitor, DropTargetSpec, TargetType } from '../../../behavior';
declare const MOVE_CONNECTOR_DROP_TYPE = "#moveConnector#";
declare const NODE_DRAG_TYPE = "#node#";
declare const EDGE_DRAG_TYPE = "#edge#";
declare const REGROUP_OPERATION = "regroup";
export interface GraphComponentProps {
    element: Graph;
}
export interface NodeComponentProps {
    element: Node;
}
export interface EdgeComponentProps {
    element: Edge;
}
/**
 * type: the drag operation type
 * edit: true if the operation performs an edit, used to dim invalid drop targets
 * canDropOnNode: true if the drag object can be dropped on node, used to highlight valid drop nodes
 */
export declare type EditableDragOperationType = DragOperationWithType & {
    edit?: boolean;
    canDropOnNode?: (operationType: string, dragElement: GraphElement, node: Node) => boolean;
};
export interface DragNodeObject {
    element: GraphElement;
    allowRegroup: boolean;
}
declare const canDropEdgeOnNode: (operation: string, element: GraphElement, node: Node) => boolean;
declare const highlightNode: (monitor: DropTargetMonitor, element: Node) => boolean;
declare const nodeDragSourceSpec: (type: string, allowRegroup?: boolean, canEdit?: boolean) => DragSourceSpec<DragObjectWithType, DragSpecOperationType<EditableDragOperationType>, Node<import("../../../types").NodeModel, any>, {
    dragging?: boolean;
    regrouping?: boolean;
}, NodeComponentProps & {
    canEdit?: boolean;
}>;
declare const noRegroupDragSourceSpec: DragSourceSpec<DragObjectWithType, DragSpecOperationType<EditableDragOperationType>, Node, {
    dragging?: boolean;
}, NodeComponentProps>;
declare const nodesEdgeIsDragging: (monitor: any, props: NodeComponentProps) => boolean;
declare const nodeDropTargetSpec: (accept?: TargetType) => DropTargetSpec<GraphElement, any, {
    canDrop: boolean;
    dropTarget: boolean;
    edgeDragging: boolean;
}, NodeComponentProps>;
declare const graphDropTargetSpec: (accept?: TargetType) => DropTargetSpec<DragNodeObject, any, {
    dragEditInProgress: boolean;
}, GraphComponentProps>;
declare const groupDropTargetSpec: DropTargetSpec<any, any, {
    droppable: boolean;
    dropTarget: boolean;
    canDrop: boolean;
}, any>;
declare const edgeDragSourceSpec: (type: string, callback: (sourceNode: Node, targetNode: Node, replaceTargetNode?: Node) => void) => DragSourceSpec<DragObjectWithType, DragSpecOperationType<EditableDragOperationType>, Node, {
    dragging: boolean;
}, EdgeComponentProps>;
declare const noDropTargetSpec: DropTargetSpec<GraphElement, any, {}, {
    element: GraphElement;
}>;
export { nodesEdgeIsDragging, noRegroupDragSourceSpec, nodeDragSourceSpec, nodeDropTargetSpec, graphDropTargetSpec, groupDropTargetSpec, edgeDragSourceSpec, noDropTargetSpec, REGROUP_OPERATION, MOVE_CONNECTOR_DROP_TYPE, NODE_DRAG_TYPE, EDGE_DRAG_TYPE, canDropEdgeOnNode, highlightNode };
//# sourceMappingURL=componentUtils.d.ts.map