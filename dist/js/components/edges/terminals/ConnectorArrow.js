"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const React = tslib_1.__importStar(require("react"));
const _ = tslib_1.__importStar(require("lodash"));
const react_styles_1 = require("@patternfly/react-styles");
const topology_components_1 = tslib_1.__importDefault(require("@patternfly/react-styles/css/components/Topology/topology-components"));
const terminalUtils_1 = require("./terminalUtils");
const pointsStringFromPoints = (points) => _.reduce(points, (result, nextPoint) => `${result} ${nextPoint[0]},${nextPoint[1]}`, '');
const ConnectorArrow = ({ startPoint, endPoint, className = '', size = 14, dragRef }) => {
    const polygonPoints = React.useMemo(() => pointsStringFromPoints([
        [0, size / 2],
        [0, -size / 2],
        [size, 0]
    ]), [size]);
    const boundingPoints = React.useMemo(() => {
        if (startPoint || !endPoint) {
            return null;
        }
        return pointsStringFromPoints(terminalUtils_1.getConnectorBoundingBox(startPoint, endPoint, size));
    }, [endPoint, size, startPoint]);
    if (!startPoint || !endPoint) {
        return null;
    }
    const connectorStartPoint = terminalUtils_1.getConnectorStartPoint(startPoint, endPoint, size);
    const angleDeg = terminalUtils_1.getConnectorRotationAngle(startPoint, endPoint);
    const classNames = react_styles_1.css(topology_components_1.default.topologyConnectorArrow, className, dragRef && 'pf-m-draggable');
    return (React.createElement("g", { transform: `translate(${connectorStartPoint[0]}, ${connectorStartPoint[1]}) rotate(${angleDeg})`, ref: dragRef, className: classNames },
        React.createElement("polygon", { points: polygonPoints }),
        React.createElement("polygon", { points: boundingPoints, fillOpacity: 0, strokeWidth: 0 })));
};
exports.default = ConnectorArrow;
//# sourceMappingURL=ConnectorArrow.js.map