import * as React from 'react';
import { DragSourceSpec, ConnectDragSource, DragObjectWithType, DragSpecOperationType, DragOperationWithType, DragElementWrapper } from './dnd-types';
export declare const Modifiers: {
    DEFAULT: number;
    ALT: number;
    CTRL: number;
    META: number;
    SHIFT: number;
};
export declare const useDndDrag: <DragObject extends DragObjectWithType = DragObjectWithType, DropResult = any, CollectedProps extends {} = {}, Props extends {} = {}>(spec: DragSourceSpec<DragObject, DragSpecOperationType<DragOperationWithType>, DropResult, CollectedProps, Props>, props?: Props) => [CollectedProps, DragElementWrapper];
export interface WithDndDragProps {
    dndDragRef: ConnectDragSource;
}
export declare const withDndDrag: <DragObject extends DragObjectWithType = DragObjectWithType, DropResult = any, CollectedProps extends {} = {}, Props extends {} = {}>(spec: DragSourceSpec<DragObject, DragSpecOperationType<DragOperationWithType>, DropResult, CollectedProps, Props>) => <P extends WithDndDragProps & CollectedProps & Props>(WrappedComponent: React.ComponentType<Partial<P>>) => React.FunctionComponent<Omit<P, "dndDragRef" & CollectedProps>>;
//# sourceMappingURL=useDndDrag.d.ts.map