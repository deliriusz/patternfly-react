"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const React = tslib_1.__importStar(require("react"));
const react_styles_1 = require("@patternfly/react-styles");
const topology_components_1 = tslib_1.__importDefault(require("@patternfly/react-styles/css/components/Topology/topology-components"));
const LabelIcon = React.forwardRef(({ className, x, y, width, height, iconClass, icon, padding = 4 }, circleRef) => {
    const radius = width / 2;
    const cx = x - radius;
    const cy = y + height / 2;
    const innerX = x - width + padding + 1;
    const innerY = y + padding + 1;
    const innerWidth = width - padding * 2 - 2; // -2 for 1px border on each side
    const innerHeight = height - padding * 2 - 2; // -2 for 1px border on each side
    return (React.createElement("g", { className: react_styles_1.css(topology_components_1.default.topologyNodeLabelIcon, className) },
        React.createElement("circle", { className: react_styles_1.css(topology_components_1.default.topologyNodeLabelIconBackground), ref: circleRef, cx: cx, cy: cy, r: radius }),
        icon ? (React.createElement("foreignObject", { className: react_styles_1.css(topology_components_1.default.topologyNodeLabelIcon), x: innerX, y: innerY, width: innerWidth, height: innerHeight }, icon)) : (React.createElement("image", { x: innerX, y: innerY, width: innerWidth, height: innerHeight, xlinkHref: iconClass }))));
});
exports.default = LabelIcon;
//# sourceMappingURL=LabelIcon.js.map