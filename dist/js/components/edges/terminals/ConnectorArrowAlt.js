"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const React = tslib_1.__importStar(require("react"));
const react_styles_1 = require("@patternfly/react-styles");
const topology_components_1 = tslib_1.__importDefault(require("@patternfly/react-styles/css/components/Topology/topology-components"));
const ConnectorArrow_1 = tslib_1.__importDefault(require("./ConnectorArrow"));
const ConnectorArrowAlt = ({ startPoint, endPoint, className = '', size, dragRef }) => {
    const classes = react_styles_1.css(topology_components_1.default.topologyConnectorArrow, topology_components_1.default.modifiers.altConnectorArrow, className, dragRef && 'pf-m-draggable');
    return (React.createElement(ConnectorArrow_1.default, { startPoint: startPoint, endPoint: endPoint, className: classes, size: size, dragRef: dragRef }));
};
exports.default = ConnectorArrowAlt;
//# sourceMappingURL=ConnectorArrowAlt.js.map