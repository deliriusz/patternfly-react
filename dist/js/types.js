"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GRAPH_POSITION_CHANGE_EVENT = exports.GRAPH_LAYOUT_END_EVENT = exports.NODE_POSITIONED_EVENT = exports.NODE_COLLAPSE_CHANGE_EVENT = exports.REMOVE_CHILD_EVENT = exports.ELEMENT_VISIBILITY_CHANGE_EVENT = exports.ADD_CHILD_EVENT = exports.isEdge = exports.isNode = exports.isGraph = exports.ScaleDetailsLevel = exports.ModelKind = exports.BadgeLocation = exports.LabelPosition = exports.EdgeTerminalType = exports.EdgeAnimationSpeed = exports.EdgeStyle = exports.NodeStatus = exports.NodeShape = exports.TopologyQuadrant = exports.AnchorEnd = void 0;
var AnchorEnd;
(function (AnchorEnd) {
    AnchorEnd[AnchorEnd["target"] = 0] = "target";
    AnchorEnd[AnchorEnd["source"] = 1] = "source";
    AnchorEnd[AnchorEnd["both"] = 2] = "both";
})(AnchorEnd = exports.AnchorEnd || (exports.AnchorEnd = {}));
var TopologyQuadrant;
(function (TopologyQuadrant) {
    TopologyQuadrant["upperLeft"] = "upperLeft";
    TopologyQuadrant["upperRight"] = "upperRight";
    TopologyQuadrant["lowerLeft"] = "lowerLeft";
    TopologyQuadrant["lowerRight"] = "lowerRight";
})(TopologyQuadrant = exports.TopologyQuadrant || (exports.TopologyQuadrant = {}));
var NodeShape;
(function (NodeShape) {
    NodeShape["circle"] = "circle";
    NodeShape["ellipse"] = "ellipse";
    NodeShape["rect"] = "rect";
    NodeShape["rhombus"] = "rhombus";
    NodeShape["trapezoid"] = "trapezoid";
    NodeShape["hexagon"] = "hexagon";
    NodeShape["octagon"] = "octagon";
    NodeShape["stadium"] = "stadium";
})(NodeShape = exports.NodeShape || (exports.NodeShape = {}));
var NodeStatus;
(function (NodeStatus) {
    NodeStatus["default"] = "default";
    NodeStatus["info"] = "info";
    NodeStatus["success"] = "success";
    NodeStatus["warning"] = "warning";
    NodeStatus["danger"] = "danger";
})(NodeStatus = exports.NodeStatus || (exports.NodeStatus = {}));
var EdgeStyle;
(function (EdgeStyle) {
    EdgeStyle["default"] = "default";
    EdgeStyle["solid"] = "solid";
    EdgeStyle["dotted"] = "dotted";
    EdgeStyle["dashed"] = "dashed";
    EdgeStyle["dashedMd"] = "dashedMd";
    EdgeStyle["dashedLg"] = "dashedLg";
    EdgeStyle["dashedXl"] = "dashedXl";
})(EdgeStyle = exports.EdgeStyle || (exports.EdgeStyle = {}));
var EdgeAnimationSpeed;
(function (EdgeAnimationSpeed) {
    EdgeAnimationSpeed["none"] = "none";
    EdgeAnimationSpeed["slow"] = "slow";
    EdgeAnimationSpeed["mediumSlow"] = "mediumSlow";
    EdgeAnimationSpeed["medium"] = "medium";
    EdgeAnimationSpeed["mediumFast"] = "mediumFast";
    EdgeAnimationSpeed["fast"] = "fast";
})(EdgeAnimationSpeed = exports.EdgeAnimationSpeed || (exports.EdgeAnimationSpeed = {}));
var EdgeTerminalType;
(function (EdgeTerminalType) {
    EdgeTerminalType["none"] = "none";
    EdgeTerminalType["directional"] = "directional";
    EdgeTerminalType["directionalAlt"] = "directionalAlt";
    EdgeTerminalType["circle"] = "circle";
    EdgeTerminalType["square"] = "square";
    EdgeTerminalType["cross"] = "cross";
})(EdgeTerminalType = exports.EdgeTerminalType || (exports.EdgeTerminalType = {}));
var LabelPosition;
(function (LabelPosition) {
    LabelPosition[LabelPosition["right"] = 0] = "right";
    LabelPosition[LabelPosition["bottom"] = 1] = "bottom";
})(LabelPosition = exports.LabelPosition || (exports.LabelPosition = {}));
var BadgeLocation;
(function (BadgeLocation) {
    BadgeLocation[BadgeLocation["inner"] = 0] = "inner";
    BadgeLocation[BadgeLocation["below"] = 1] = "below";
})(BadgeLocation = exports.BadgeLocation || (exports.BadgeLocation = {}));
var ModelKind;
(function (ModelKind) {
    ModelKind["graph"] = "graph";
    ModelKind["node"] = "node";
    ModelKind["edge"] = "edge";
})(ModelKind = exports.ModelKind || (exports.ModelKind = {}));
var ScaleDetailsLevel;
(function (ScaleDetailsLevel) {
    ScaleDetailsLevel["high"] = "high";
    ScaleDetailsLevel["medium"] = "medium";
    ScaleDetailsLevel["low"] = "low";
})(ScaleDetailsLevel = exports.ScaleDetailsLevel || (exports.ScaleDetailsLevel = {}));
const isGraph = (element) => element && element.getKind() === ModelKind.graph;
exports.isGraph = isGraph;
const isNode = (element) => element && element.getKind() === ModelKind.node;
exports.isNode = isNode;
const isEdge = (element) => element && element.getKind() === ModelKind.edge;
exports.isEdge = isEdge;
exports.ADD_CHILD_EVENT = 'element-add-child';
exports.ELEMENT_VISIBILITY_CHANGE_EVENT = 'element-visibility-change';
exports.REMOVE_CHILD_EVENT = 'element-remove-child';
exports.NODE_COLLAPSE_CHANGE_EVENT = 'node-collapse-change';
exports.NODE_POSITIONED_EVENT = 'node-positioned';
exports.GRAPH_LAYOUT_END_EVENT = 'graph-layout-end';
exports.GRAPH_POSITION_CHANGE_EVENT = 'graph-position-change';
//# sourceMappingURL=types.js.map