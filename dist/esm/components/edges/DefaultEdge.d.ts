import * as React from 'react';
import { Edge, EdgeTerminalType, NodeStatus } from '../../types';
import { WithContextMenuProps, WithRemoveConnectorProps, WithSelectionProps, WithSourceDragProps, WithTargetDragProps } from '../../behavior';
declare type BaseEdgeProps = {
    children?: React.ReactNode;
    element: Edge;
    dragging?: boolean;
    className?: string;
    animationDuration?: number;
    startTerminalType?: EdgeTerminalType;
    startTerminalClass?: string;
    startTerminalStatus?: NodeStatus;
    startTerminalSize?: number;
    endTerminalType?: EdgeTerminalType;
    endTerminalClass?: string;
    endTerminalStatus?: NodeStatus;
    endTerminalSize?: number;
    tag?: string;
    tagClass?: string;
    tagStatus?: NodeStatus;
} & Partial<WithRemoveConnectorProps & WithSourceDragProps & WithTargetDragProps & WithSelectionProps & WithContextMenuProps>;
declare const _default: React.FunctionComponent<BaseEdgeProps>;
export default _default;
//# sourceMappingURL=DefaultEdge.d.ts.map