export var AnchorEnd;
(function (AnchorEnd) {
    AnchorEnd[AnchorEnd["target"] = 0] = "target";
    AnchorEnd[AnchorEnd["source"] = 1] = "source";
    AnchorEnd[AnchorEnd["both"] = 2] = "both";
})(AnchorEnd || (AnchorEnd = {}));
export var TopologyQuadrant;
(function (TopologyQuadrant) {
    TopologyQuadrant["upperLeft"] = "upperLeft";
    TopologyQuadrant["upperRight"] = "upperRight";
    TopologyQuadrant["lowerLeft"] = "lowerLeft";
    TopologyQuadrant["lowerRight"] = "lowerRight";
})(TopologyQuadrant || (TopologyQuadrant = {}));
export var NodeShape;
(function (NodeShape) {
    NodeShape["circle"] = "circle";
    NodeShape["ellipse"] = "ellipse";
    NodeShape["rect"] = "rect";
    NodeShape["rhombus"] = "rhombus";
    NodeShape["trapezoid"] = "trapezoid";
    NodeShape["hexagon"] = "hexagon";
    NodeShape["octagon"] = "octagon";
    NodeShape["stadium"] = "stadium";
})(NodeShape || (NodeShape = {}));
export var NodeStatus;
(function (NodeStatus) {
    NodeStatus["default"] = "default";
    NodeStatus["info"] = "info";
    NodeStatus["success"] = "success";
    NodeStatus["warning"] = "warning";
    NodeStatus["danger"] = "danger";
})(NodeStatus || (NodeStatus = {}));
export var EdgeStyle;
(function (EdgeStyle) {
    EdgeStyle["default"] = "default";
    EdgeStyle["solid"] = "solid";
    EdgeStyle["dotted"] = "dotted";
    EdgeStyle["dashed"] = "dashed";
    EdgeStyle["dashedMd"] = "dashedMd";
    EdgeStyle["dashedLg"] = "dashedLg";
    EdgeStyle["dashedXl"] = "dashedXl";
})(EdgeStyle || (EdgeStyle = {}));
export var EdgeAnimationSpeed;
(function (EdgeAnimationSpeed) {
    EdgeAnimationSpeed["none"] = "none";
    EdgeAnimationSpeed["slow"] = "slow";
    EdgeAnimationSpeed["mediumSlow"] = "mediumSlow";
    EdgeAnimationSpeed["medium"] = "medium";
    EdgeAnimationSpeed["mediumFast"] = "mediumFast";
    EdgeAnimationSpeed["fast"] = "fast";
})(EdgeAnimationSpeed || (EdgeAnimationSpeed = {}));
export var EdgeTerminalType;
(function (EdgeTerminalType) {
    EdgeTerminalType["none"] = "none";
    EdgeTerminalType["directional"] = "directional";
    EdgeTerminalType["directionalAlt"] = "directionalAlt";
    EdgeTerminalType["circle"] = "circle";
    EdgeTerminalType["square"] = "square";
    EdgeTerminalType["cross"] = "cross";
})(EdgeTerminalType || (EdgeTerminalType = {}));
export var LabelPosition;
(function (LabelPosition) {
    LabelPosition[LabelPosition["right"] = 0] = "right";
    LabelPosition[LabelPosition["bottom"] = 1] = "bottom";
})(LabelPosition || (LabelPosition = {}));
export var BadgeLocation;
(function (BadgeLocation) {
    BadgeLocation[BadgeLocation["inner"] = 0] = "inner";
    BadgeLocation[BadgeLocation["below"] = 1] = "below";
})(BadgeLocation || (BadgeLocation = {}));
export var ModelKind;
(function (ModelKind) {
    ModelKind["graph"] = "graph";
    ModelKind["node"] = "node";
    ModelKind["edge"] = "edge";
})(ModelKind || (ModelKind = {}));
export var ScaleDetailsLevel;
(function (ScaleDetailsLevel) {
    ScaleDetailsLevel["high"] = "high";
    ScaleDetailsLevel["medium"] = "medium";
    ScaleDetailsLevel["low"] = "low";
})(ScaleDetailsLevel || (ScaleDetailsLevel = {}));
export const isGraph = (element) => element && element.getKind() === ModelKind.graph;
export const isNode = (element) => element && element.getKind() === ModelKind.node;
export const isEdge = (element) => element && element.getKind() === ModelKind.edge;
export const ADD_CHILD_EVENT = 'element-add-child';
export const ELEMENT_VISIBILITY_CHANGE_EVENT = 'element-visibility-change';
export const REMOVE_CHILD_EVENT = 'element-remove-child';
export const NODE_COLLAPSE_CHANGE_EVENT = 'node-collapse-change';
export const NODE_POSITIONED_EVENT = 'node-positioned';
export const GRAPH_LAYOUT_END_EVENT = 'graph-layout-end';
export const GRAPH_POSITION_CHANGE_EVENT = 'graph-position-change';
//# sourceMappingURL=types.js.map