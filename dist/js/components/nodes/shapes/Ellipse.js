"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const react_styles_1 = require("@patternfly/react-styles");
const topology_components_1 = tslib_1.__importDefault(require("@patternfly/react-styles/css/components/Topology/topology-components"));
const React = tslib_1.__importStar(require("react"));
const behavior_1 = require("../../../behavior");
const anchors_1 = require("../../../anchors");
const Ellipse = ({ className = react_styles_1.css(topology_components_1.default.topologyNodeBackground), width, height, filter, dndDropRef }) => {
    behavior_1.useAnchor(anchors_1.EllipseAnchor);
    return (React.createElement("ellipse", { className: className, ref: dndDropRef, cx: width / 2, cy: height / 2, rx: Math.max(0, width / 2 - 1), ry: Math.max(0, height / 2 - 1), filter: filter }));
};
exports.default = Ellipse;
//# sourceMappingURL=Ellipse.js.map