"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
/* eslint patternfly-react/import-tokens-icons: 0 */
const React = tslib_1.__importStar(require("react"));
const react_styles_1 = require("@patternfly/react-styles");
const global_palette_blue_50_1 = require("@patternfly/react-tokens/dist/js/global_palette_blue_50");
const global_palette_blue_300_1 = require("@patternfly/react-tokens/dist/js/global_palette_blue_300");
const global_palette_blue_300_2 = require("@patternfly/react-tokens/dist/js/global_palette_blue_300");
const topology_components_1 = tslib_1.__importDefault(require("@patternfly/react-styles/css/components/Topology/topology-components"));
const utils_1 = require("../../../utils");
const TaskBadge = React.forwardRef(({ badge, badgeTextColor, badgeColor, badgeBorderColor, badgeClassName, className, x, y }, iconRef) => {
    const [textSize, textRef] = utils_1.useSize([]);
    const classes = react_styles_1.css(topology_components_1.default.topologyNodeLabelBadge, badgeClassName && badgeClassName, className && className);
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
        rect = (React.createElement("rect", { fill: badgeColor || (badgeClassName ? undefined : global_palette_blue_50_1.global_palette_blue_50.value), stroke: badgeBorderColor || (badgeClassName ? undefined : global_palette_blue_300_1.global_palette_blue_300.value), ref: iconRef, x: 0, width: width + paddingX * 2, y: 0, height: height, rx: height / 2, ry: height / 2 }));
    }
    return (React.createElement("g", { className: classes, transform: `translate(${x}, ${y})` },
        rect,
        typeof badge === 'string' ? (React.createElement("text", { fill: badgeTextColor || badgeClassName ? undefined : global_palette_blue_300_2.global_palette_blue_300.value, ref: textRef, x: width / 2 + paddingX, y: height / 2, textAnchor: "middle", dy: "0.35em" }, badge)) : (React.createElement("foreignObject", { ref: textRef }, badge))));
});
exports.default = TaskBadge;
//# sourceMappingURL=TaskBadge.js.map