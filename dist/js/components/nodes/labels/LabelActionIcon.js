"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const React = tslib_1.__importStar(require("react"));
const utils_1 = require("../../../utils");
const react_styles_1 = require("@patternfly/react-styles");
const topology_components_1 = tslib_1.__importDefault(require("@patternfly/react-styles/css/components/Topology/topology-components"));
const LabelActionIcon = React.forwardRef(({ icon, onClick, className, x, y, paddingX, height, iconOffsetX = 0, iconOffsetY = 0 }, actionRef) => {
    var _a, _b;
    const [iconSize, iconRef] = utils_1.useSize([icon, paddingX]);
    const iconWidth = (_a = iconSize === null || iconSize === void 0 ? void 0 : iconSize.width) !== null && _a !== void 0 ? _a : 0;
    const iconHeight = (_b = iconSize === null || iconSize === void 0 ? void 0 : iconSize.height) !== null && _b !== void 0 ? _b : 0;
    const iconY = (height - iconHeight) / 2;
    const classes = react_styles_1.css(topology_components_1.default.topologyNodeActionIcon, className);
    const handleClick = (e) => {
        if (onClick) {
            e.stopPropagation();
            onClick(e);
        }
    };
    return (React.createElement("g", { className: classes, onClick: handleClick },
        iconSize && (React.createElement("rect", { ref: actionRef, className: react_styles_1.css(topology_components_1.default.topologyNodeActionIconBackground), x: x, y: y, width: iconWidth + paddingX * 2, height: height })),
        React.createElement("g", { className: react_styles_1.css(topology_components_1.default.topologyNodeActionIconIcon), transform: `translate(${x + paddingX + iconOffsetX}, ${y + iconY + iconOffsetY})`, ref: iconRef }, icon)));
});
exports.default = LabelActionIcon;
//# sourceMappingURL=LabelActionIcon.js.map