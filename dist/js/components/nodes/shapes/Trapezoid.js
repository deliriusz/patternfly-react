"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const react_styles_1 = require("@patternfly/react-styles");
const topology_components_1 = tslib_1.__importDefault(require("@patternfly/react-styles/css/components/Topology/topology-components"));
const React = tslib_1.__importStar(require("react"));
const shapeUtils_1 = require("./shapeUtils");
const behavior_1 = require("../../../behavior");
const TOP_INSET_AMOUNT = 1 / 8;
const getTrapezoidPoints = (width, height, padding, outline = false) => {
    const yPadding = outline ? 0 : padding;
    const topXPadding = outline ? padding / 4 : padding;
    const bottomXPadding = outline ? -padding / 4 : padding;
    return [
        [width * TOP_INSET_AMOUNT + topXPadding, yPadding],
        [width - width * TOP_INSET_AMOUNT - topXPadding, yPadding],
        [width - bottomXPadding, height - yPadding],
        [bottomXPadding, height - yPadding]
    ];
};
const Trapezoid = ({ className = react_styles_1.css(topology_components_1.default.topologyNodeBackground), width, height, filter, cornerRadius = shapeUtils_1.TRAPEZOID_CORNER_RADIUS, dndDropRef }) => {
    const [polygonPoints, points] = React.useMemo(() => {
        const polygonPoints = getTrapezoidPoints(width, height, cornerRadius, true);
        const path = cornerRadius
            ? shapeUtils_1.getHullPath(getTrapezoidPoints(width, height, cornerRadius), cornerRadius)
            : polygonPoints.map(p => `${p[0]},${p[1]}`).join(' ');
        return [polygonPoints, path];
    }, [height, cornerRadius, width]);
    behavior_1.usePolygonAnchor(polygonPoints);
    return cornerRadius ? (React.createElement("path", { className: className, ref: dndDropRef, d: points, filter: filter })) : (React.createElement("polygon", { className: className, ref: dndDropRef, points: points, filter: filter }));
};
exports.default = Trapezoid;
//# sourceMappingURL=Trapezoid.js.map