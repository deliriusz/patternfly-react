"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const React = tslib_1.__importStar(require("react"));
const react_styles_1 = require("@patternfly/react-styles");
const topology_components_1 = tslib_1.__importDefault(require("@patternfly/react-styles/css/components/Topology/topology-components"));
const terminalUtils_1 = require("./terminalUtils");
const ConnectorCross = ({ startPoint, endPoint, className = '', isTarget = true, size = 14, dragRef }) => {
    if (!startPoint || !endPoint) {
        return null;
    }
    const width = size / 4;
    const yDelta = size / 2;
    const connectorStartPoint = terminalUtils_1.getConnectorStartPoint(startPoint, endPoint, size);
    const angleDeg = terminalUtils_1.getConnectorRotationAngle(startPoint, endPoint);
    const classNames = react_styles_1.css(topology_components_1.default.topologyConnectorArrow, topology_components_1.default.topologyConnectorCross, className, !isTarget && 'pf-m-source', dragRef && 'pf-m-draggable');
    return (React.createElement("g", { transform: `translate(${connectorStartPoint[0]}, ${connectorStartPoint[1]}) rotate(${angleDeg})`, ref: dragRef, className: classNames },
        React.createElement("rect", { x: 0, y: -yDelta, width: size, height: size, fillOpacity: 0, strokeOpacity: 0 }),
        isTarget ? (React.createElement(React.Fragment, null,
            React.createElement("line", { x1: width, y1: yDelta, x2: width, y2: -yDelta }),
            React.createElement("line", { x1: 2 * width, y1: yDelta, x2: 2 * width, y2: -yDelta }))) : (React.createElement("rect", { x: width, y: -yDelta, width: width, height: size }))));
};
exports.default = ConnectorCross;
//# sourceMappingURL=ConnectorCross.js.map