"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const react_styles_1 = require("@patternfly/react-styles");
const topology_components_1 = tslib_1.__importDefault(require("@patternfly/react-styles/css/components/Topology/topology-components"));
const React = tslib_1.__importStar(require("react"));
const shapeUtils_1 = require("./shapeUtils");
const behavior_1 = require("../../../behavior");
const SidedShape = ({ className = react_styles_1.css(topology_components_1.default.topologyNodeBackground), width, height, filter, sides = 6, cornerRadius = 0, dndDropRef }) => {
    const [polygonPoints, points] = React.useMemo(() => {
        const polygonPoints = shapeUtils_1.getPointsForSides(sides, Math.min(width, height));
        return [
            polygonPoints,
            cornerRadius
                ? shapeUtils_1.getPathForSides(sides, Math.min(width, height), cornerRadius)
                : polygonPoints.map(p => `${p[0]},${p[1]}`).join(' ')
        ];
    }, [cornerRadius, height, sides, width]);
    behavior_1.usePolygonAnchor(polygonPoints);
    return cornerRadius ? (React.createElement("path", { className: className, ref: dndDropRef, d: points, filter: filter })) : (React.createElement("polygon", { className: className, ref: dndDropRef, points: points, filter: filter }));
};
exports.default = SidedShape;
//# sourceMappingURL=SidedShape.js.map