"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const React = tslib_1.__importStar(require("react"));
const react_styles_1 = require("@patternfly/react-styles");
const topology_components_1 = tslib_1.__importDefault(require("@patternfly/react-styles/css/components/Topology/topology-components"));
const terminalUtils_1 = require("./terminalUtils");
const ConnectorCircle = ({ startPoint, endPoint, className = '', isTarget = true, size = 14, dragRef }) => {
    if (!startPoint || !endPoint) {
        return null;
    }
    const connectorStartPoint = terminalUtils_1.getConnectorStartPoint(startPoint, endPoint, size / 2); // add stroke width rather than rotating
    const classNames = react_styles_1.css(topology_components_1.default.topologyConnectorArrow, topology_components_1.default.topologyConnectorCircle, className, !isTarget && topology_components_1.default.modifiers.source, dragRef && 'pf-m-draggable');
    return (React.createElement("g", { transform: `translate(${connectorStartPoint[0]}, ${connectorStartPoint[1]})`, ref: dragRef, className: classNames },
        React.createElement("circle", { cx: 0, cy: 0, r: size / 2 })));
};
exports.default = ConnectorCircle;
//# sourceMappingURL=ConnectorCircle.js.map