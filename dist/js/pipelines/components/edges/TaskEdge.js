"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const React = tslib_1.__importStar(require("react"));
const mobx_react_1 = require("mobx-react");
const react_styles_1 = require("@patternfly/react-styles");
const topology_components_1 = tslib_1.__importDefault(require("@patternfly/react-styles/css/components/Topology/topology-components"));
const utils_1 = require("../../utils");
const TaskEdge = ({ element, className, nodeSeparation }) => {
    var _a;
    const startPoint = element.getStartPoint();
    const endPoint = element.getEndPoint();
    const groupClassName = react_styles_1.css(topology_components_1.default.topologyEdge, className);
    const startIndent = ((_a = element.getData()) === null || _a === void 0 ? void 0 : _a.indent) || 0;
    return (React.createElement("g", { "data-test-id": "task-handler", className: groupClassName, fillOpacity: 0 },
        React.createElement("path", { d: utils_1.integralShapePath(startPoint, endPoint, startIndent, nodeSeparation), transform: "translate(0.5,0.5)", shapeRendering: "geometricPrecision" })));
};
exports.default = mobx_react_1.observer(TaskEdge);
//# sourceMappingURL=TaskEdge.js.map