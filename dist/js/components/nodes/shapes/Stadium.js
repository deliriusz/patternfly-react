"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const react_styles_1 = require("@patternfly/react-styles");
const topology_components_1 = tslib_1.__importDefault(require("@patternfly/react-styles/css/components/Topology/topology-components"));
const React = tslib_1.__importStar(require("react"));
const behavior_1 = require("../../../behavior");
const shapeUtils_1 = require("./shapeUtils");
const utils_1 = require("../../../utils");
const getStadiumPoints = (width, radius) => [
    [radius, radius],
    [width - radius, radius],
    [width - radius, radius],
    [radius, radius]
];
const Stadium = ({ className = react_styles_1.css(topology_components_1.default.topologyNodeBackground), width, height, filter, dndDropRef }) => {
    const anchorRef = behavior_1.useSvgAnchor();
    const refs = utils_1.useCombineRefs(dndDropRef, anchorRef);
    const points = React.useMemo(() => shapeUtils_1.getHullPath(getStadiumPoints(width, height / 2), height / 2), [height, width]);
    return React.createElement("path", { className: className, ref: refs, d: points, filter: filter });
};
exports.default = Stadium;
//# sourceMappingURL=Stadium.js.map