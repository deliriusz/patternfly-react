import * as React from 'react';
import { WithContextMenuProps, WithDndDragProps } from '../../../behavior';
import { BadgeLocation, LabelPosition, NodeStatus } from '../../../types';
declare type NodeLabelProps = {
    children?: string;
    className?: string;
    paddingX?: number;
    paddingY?: number;
    x?: number;
    y?: number;
    position?: LabelPosition;
    cornerRadius?: number;
    status?: NodeStatus;
    secondaryLabel?: string;
    truncateLength?: number;
    labelIconClass?: string;
    labelIcon?: React.ReactNode;
    labelIconPadding?: number;
    dragRef?: WithDndDragProps['dndDragRef'];
    hover?: boolean;
    dragging?: boolean;
    edgeDragging?: boolean;
    dropTarget?: boolean;
    actionIcon?: React.ReactElement;
    actionIconClassName?: string;
    onActionIconClick?: (e: React.MouseEvent) => void;
    badge?: string;
    badgeColor?: string;
    badgeTextColor?: string;
    badgeBorderColor?: string;
    badgeClassName?: string;
    badgeLocation?: BadgeLocation;
} & Partial<WithContextMenuProps>;
/**
 * Renders a `<text>` component with a `<rect>` box behind.
 */
declare const NodeLabel: React.FunctionComponent<NodeLabelProps>;
export default NodeLabel;
//# sourceMappingURL=NodeLabel.d.ts.map