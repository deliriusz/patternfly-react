"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const React = tslib_1.__importStar(require("react"));
const react_styles_1 = require("@patternfly/react-styles");
const topology_components_1 = tslib_1.__importDefault(require("@patternfly/react-styles/css/components/Topology/topology-components"));
const behavior_1 = require("../../../behavior");
const anchors_1 = require("../../../anchors");
const Rectangle = ({ className = react_styles_1.css(topology_components_1.default.topologyNodeBackground), width, height, filter, cornerRadius = 15, dndDropRef }) => {
    behavior_1.useAnchor(anchors_1.RectAnchor);
    return (React.createElement("rect", { className: className, ref: dndDropRef, x: 0, y: 0, rx: cornerRadius, ry: cornerRadius, width: width, height: height, filter: filter }));
};
exports.default = Rectangle;
//# sourceMappingURL=Rectangle.js.map