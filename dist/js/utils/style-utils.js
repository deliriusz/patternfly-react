"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getEdgeAnimationDuration = exports.getEdgeStyleClassModifier = exports.StatusModifier = void 0;
const tslib_1 = require("tslib");
const types_1 = require("../types");
const topology_components_1 = tslib_1.__importDefault(require("@patternfly/react-styles/css/components/Topology/topology-components"));
exports.StatusModifier = {
    [types_1.NodeStatus.default]: '',
    [types_1.NodeStatus.info]: topology_components_1.default.modifiers.info,
    [types_1.NodeStatus.success]: topology_components_1.default.modifiers.success,
    [types_1.NodeStatus.warning]: topology_components_1.default.modifiers.warning,
    [types_1.NodeStatus.danger]: topology_components_1.default.modifiers.danger
};
const getEdgeStyleClassModifier = (edgeType) => {
    switch (edgeType) {
        case types_1.EdgeStyle.solid:
            return 'pf-m-solid';
        case types_1.EdgeStyle.dotted:
            return 'pf-m-dotted';
        case types_1.EdgeStyle.dashed:
            return 'pf-m-dashed';
        case types_1.EdgeStyle.dashedMd:
            return 'pf-m-dashed-md';
        case types_1.EdgeStyle.dashedLg:
            return 'pf-m-dashed-lg';
        case types_1.EdgeStyle.dashedXl:
            return 'pf-m-dashed-xl';
        default:
            return '';
    }
};
exports.getEdgeStyleClassModifier = getEdgeStyleClassModifier;
const getEdgeAnimationDuration = (speed) => {
    switch (speed) {
        case types_1.EdgeAnimationSpeed.slow:
            return 1.25;
        case types_1.EdgeAnimationSpeed.mediumSlow:
            return 1;
        case types_1.EdgeAnimationSpeed.medium:
            return 0.75;
        case types_1.EdgeAnimationSpeed.mediumFast:
            return 0.5;
        case types_1.EdgeAnimationSpeed.fast:
            return 0.25;
        default:
            return 0;
    }
};
exports.getEdgeAnimationDuration = getEdgeAnimationDuration;
//# sourceMappingURL=style-utils.js.map