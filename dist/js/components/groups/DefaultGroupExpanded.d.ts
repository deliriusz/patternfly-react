import * as React from 'react';
import { BadgeLocation, Node } from '../../types';
import { WithContextMenuProps, WithDndDropProps, WithDragNodeProps, WithSelectionProps } from '../../behavior';
import { CollapsibleGroupProps } from './types';
declare type DefaultGroupExpandedProps = {
    className?: string;
    element: Node;
    droppable?: boolean;
    canDrop?: boolean;
    dropTarget?: boolean;
    dragging?: boolean;
    hover?: boolean;
    label?: string;
    secondaryLabel?: string;
    showLabel?: boolean;
    truncateLength?: number;
    badge?: string;
    badgeColor?: string;
    badgeTextColor?: string;
    badgeBorderColor?: string;
    badgeClassName?: string;
    badgeLocation?: BadgeLocation;
    labelIconClass?: string;
    labelIcon?: string;
    labelIconPadding?: number;
} & Partial<CollapsibleGroupProps & WithDragNodeProps & WithSelectionProps & WithDndDropProps & WithContextMenuProps>;
declare type PointWithSize = [number, number, number];
export declare function computeLabelLocation(points: PointWithSize[]): PointWithSize;
declare const _default: React.FunctionComponent<DefaultGroupExpandedProps>;
export default _default;
//# sourceMappingURL=DefaultGroupExpanded.d.ts.map