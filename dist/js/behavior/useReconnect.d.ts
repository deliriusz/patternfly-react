import * as React from 'react';
import { ConnectDragSource, DragObjectWithType, DragOperationWithType, DragSourceSpec, DragSpecOperationType } from './dnd-types';
export interface WithSourceDragProps {
    sourceDragRef: ConnectDragSource;
}
export declare const withSourceDrag: <DragObject extends DragObjectWithType = DragObjectWithType, DropResult = any, CollectedProps extends {} = {}, Props extends {} = {}>(spec: DragSourceSpec<DragObject, DragSpecOperationType<DragOperationWithType>, DropResult, CollectedProps, Props>) => <P extends WithSourceDragProps & CollectedProps & Props>(WrappedComponent: React.ComponentType<P>) => React.FunctionComponent<Omit<P, "sourceDragRef" & CollectedProps>>;
export interface WithTargetDragProps {
    targetDragRef: ConnectDragSource;
}
export declare const withTargetDrag: <DragObject extends DragObjectWithType = DragObjectWithType, DropResult = any, CollectedProps extends {} = {}, Props extends {} = {}>(spec: DragSourceSpec<DragObject, DragSpecOperationType<DragOperationWithType>, DropResult, CollectedProps, Props>) => <P extends WithSourceDragProps & CollectedProps & Props>(WrappedComponent: React.ComponentType<P>) => React.FunctionComponent<Omit<P, "sourceDragRef" & CollectedProps>>;
//# sourceMappingURL=useReconnect.d.ts.map