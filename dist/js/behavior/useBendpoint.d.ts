import * as React from 'react';
import Point from '../geom/Point';
import { ConnectDragSource, DragSourceSpec, DragObjectWithType, DragSpecOperationType, DragOperationWithType } from './dnd-types';
import { WithDndDragProps } from './useDndDrag';
export interface WithBendpoint {
    sourceDragRef: ConnectDragSource;
}
export declare const useBendpoint: <DropResult, CollectedProps, Props = {}>(point: Point, spec?: Omit<DragSourceSpec<DragObjectWithType, DragSpecOperationType<DragOperationWithType>, DropResult, CollectedProps, {}>, "type">, props?: Props) => [CollectedProps, import("./dnd-types").DragElementWrapper];
interface HocProps {
    point: Point;
}
export interface WithBendpointProps {
    dragNodeRef: WithDndDragProps['dndDragRef'];
}
export declare const withBendpoint: <DropResult, CollectedProps, Props = {}>(spec?: Omit<DragSourceSpec<DragObjectWithType, DragSpecOperationType<DragOperationWithType>, DropResult, CollectedProps, Props>, "type">) => <P extends WithBendpointProps & CollectedProps & Props>(WrappedComponent: React.ComponentType<P>) => React.FunctionComponent<Omit<P, "dragNodeRef"> & HocProps>;
/**
 * @deprecated Use withBendpoint instead
 */
export declare const WithBendpoint: <DropResult, CollectedProps, Props = {}>(spec?: Omit<DragSourceSpec<DragObjectWithType, DragSpecOperationType<DragOperationWithType>, DropResult, CollectedProps, Props>, "type">) => <P extends WithBendpointProps & CollectedProps & Props>(WrappedComponent: React.ComponentType<P>) => React.FunctionComponent<Omit<P, "dragNodeRef"> & HocProps>;
export {};
//# sourceMappingURL=useBendpoint.d.ts.map