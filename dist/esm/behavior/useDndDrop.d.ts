import * as React from 'react';
import { GraphElement } from '../types';
import { ConnectDropTarget, DropTargetSpec } from './dnd-types';
export declare const useDndDrop: <DragObject, DropResult = GraphElement<import("../types").ElementModel, any>, CollectedProps extends {} = {}, Props extends {} = {}>(spec: DropTargetSpec<DragObject, DropResult, CollectedProps, Props>, props?: Props) => [CollectedProps, import("./dnd-types").DragElementWrapper];
export interface WithDndDropProps {
    dndDropRef: ConnectDropTarget;
}
export declare const withDndDrop: <DragObject, DropResult = GraphElement<import("../types").ElementModel, any>, CollectedProps extends {} = {}, Props extends {} = {}>(spec: DropTargetSpec<DragObject, DropResult, CollectedProps, Props>) => <P extends WithDndDropProps & CollectedProps & Props>(WrappedComponent: React.ComponentType<Partial<P>>) => React.FunctionComponent<Omit<P, "dndDropRef" & CollectedProps>>;
//# sourceMappingURL=useDndDrop.d.ts.map