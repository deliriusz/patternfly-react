"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const React = tslib_1.__importStar(require("react"));
const react_styles_1 = require("@patternfly/react-styles");
const topology_components_1 = tslib_1.__importDefault(require("@patternfly/react-styles/css/components/Topology/topology-components"));
const shapeUtils_1 = require("./shapeUtils");
const behavior_1 = require("../../../behavior");
const utils_1 = require("../../../utils");
const getRhombusPoints = (width, height, padding) => [
    [width / 2, -padding],
    [width + padding, height / 2],
    [width / 2, height + padding],
    [-padding, height / 2]
];
const Rhombus = ({ className = react_styles_1.css(topology_components_1.default.topologyNodeBackground), width, height, filter, cornerRadius = shapeUtils_1.RHOMBUS_CORNER_RADIUS, dndDropRef }) => {
    const anchorRef = behavior_1.useSvgAnchor();
    const refs = utils_1.useCombineRefs(dndDropRef, anchorRef);
    const points = React.useMemo(() => {
        const polygonPoints = getRhombusPoints(width, height, cornerRadius / 2);
        return cornerRadius
            ? shapeUtils_1.getHullPath(getRhombusPoints(width, height, -cornerRadius), cornerRadius)
            : polygonPoints.map(p => `${p[0]},${p[1]}`).join(' ');
    }, [cornerRadius, height, width]);
    return cornerRadius ? (React.createElement("path", { className: className, ref: refs, d: points, filter: filter })) : (React.createElement("polygon", { className: className, ref: refs, points: points, filter: filter }));
};
exports.default = Rhombus;
//# sourceMappingURL=Rhombus.js.map