import * as React from 'react';
import { useSize } from '../../../utils';
import { css } from '@patternfly/react-styles';
import styles from '@patternfly/react-styles/css/components/Topology/topology-components';
const LabelActionIcon = React.forwardRef(({ icon, onClick, className, x, y, paddingX, height, iconOffsetX = 0, iconOffsetY = 0 }, actionRef) => {
    var _a, _b;
    const [iconSize, iconRef] = useSize([icon, paddingX]);
    const iconWidth = (_a = iconSize === null || iconSize === void 0 ? void 0 : iconSize.width) !== null && _a !== void 0 ? _a : 0;
    const iconHeight = (_b = iconSize === null || iconSize === void 0 ? void 0 : iconSize.height) !== null && _b !== void 0 ? _b : 0;
    const iconY = (height - iconHeight) / 2;
    const classes = css(styles.topologyNodeActionIcon, className);
    const handleClick = (e) => {
        if (onClick) {
            e.stopPropagation();
            onClick(e);
        }
    };
    return (React.createElement("g", { className: classes, onClick: handleClick },
        iconSize && (React.createElement("rect", { ref: actionRef, className: css(styles.topologyNodeActionIconBackground), x: x, y: y, width: iconWidth + paddingX * 2, height: height })),
        React.createElement("g", { className: css(styles.topologyNodeActionIconIcon), transform: `translate(${x + paddingX + iconOffsetX}, ${y + iconY + iconOffsetY})`, ref: iconRef }, icon)));
});
export default LabelActionIcon;
//# sourceMappingURL=LabelActionIcon.js.map