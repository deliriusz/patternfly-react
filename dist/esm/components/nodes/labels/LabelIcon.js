import * as React from 'react';
import { css } from '@patternfly/react-styles';
import styles from '@patternfly/react-styles/css/components/Topology/topology-components';
const LabelIcon = React.forwardRef(({ className, x, y, width, height, iconClass, icon, padding = 4 }, circleRef) => {
    const radius = width / 2;
    const cx = x - radius;
    const cy = y + height / 2;
    const innerX = x - width + padding + 1;
    const innerY = y + padding + 1;
    const innerWidth = width - padding * 2 - 2; // -2 for 1px border on each side
    const innerHeight = height - padding * 2 - 2; // -2 for 1px border on each side
    return (React.createElement("g", { className: css(styles.topologyNodeLabelIcon, className) },
        React.createElement("circle", { className: css(styles.topologyNodeLabelIconBackground), ref: circleRef, cx: cx, cy: cy, r: radius }),
        icon ? (React.createElement("foreignObject", { className: css(styles.topologyNodeLabelIcon), x: innerX, y: innerY, width: innerWidth, height: innerHeight }, icon)) : (React.createElement("image", { x: innerX, y: innerY, width: innerWidth, height: innerHeight, xlinkHref: iconClass }))));
});
export default LabelIcon;
//# sourceMappingURL=LabelIcon.js.map