import * as React from 'react';
import { BadgeLocation } from '../../../types';
interface LabelBadgeProps {
    className?: string;
    x: number;
    y: number;
    badge?: string;
    badgeColor?: string;
    badgeTextColor?: string;
    badgeBorderColor?: string;
    badgeClassName?: string;
    badgeLocation?: BadgeLocation;
}
declare const LabelBadge: React.ForwardRefExoticComponent<LabelBadgeProps & React.RefAttributes<SVGRectElement>>;
export default LabelBadge;
//# sourceMappingURL=LabelBadge.d.ts.map