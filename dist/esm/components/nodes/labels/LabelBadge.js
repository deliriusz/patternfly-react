/* eslint patternfly-react/import-tokens-icons: 0 */
import * as React from 'react';
import { css } from '@patternfly/react-styles';
import { global_palette_blue_50 as defaultBadgeFill } from '@patternfly/react-tokens/dist/js/global_palette_blue_50';
import { global_palette_blue_300 as defaultBadgeBorder } from '@patternfly/react-tokens/dist/js/global_palette_blue_300';
import { global_palette_blue_300 as defaultBadgeTextColor } from '@patternfly/react-tokens/dist/js/global_palette_blue_300';
import styles from '@patternfly/react-styles/css/components/Topology/topology-components';
import { useSize } from '../../../utils';
const LabelBadge = React.forwardRef(({ badge, badgeTextColor, badgeColor, badgeBorderColor, badgeClassName, className, x, y }, iconRef) => {
    const [textSize, textRef] = useSize([]);
    const classes = css(styles.topologyNodeLabelBadge, badgeClassName && badgeClassName, className && className);
    let rect = null;
    let paddingX = 0;
    let paddingY = 0;
    let width = 0;
    let height = 0;
    if (textSize) {
        ({ height, width } = textSize);
        paddingX = height / 2;
        paddingY = height / 14;
        height += paddingY * 2;
        rect = (React.createElement("rect", { fill: badgeColor || (badgeClassName ? undefined : defaultBadgeFill.value), stroke: badgeBorderColor || (badgeClassName ? undefined : defaultBadgeBorder.value), ref: iconRef, x: 0, width: width + paddingX * 2, y: 0, height: height, rx: height / 2, ry: height / 2 }));
    }
    return (React.createElement("g", { className: classes, transform: `translate(${x}, ${y})` },
        rect,
        React.createElement("text", { fill: badgeTextColor || badgeClassName ? undefined : defaultBadgeTextColor.value, ref: textRef, x: width / 2 + paddingX, y: height / 2, textAnchor: "middle", dy: "0.35em" }, badge)));
});
export default LabelBadge;
//# sourceMappingURL=LabelBadge.js.map