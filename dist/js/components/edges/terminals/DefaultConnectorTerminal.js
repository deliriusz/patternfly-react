"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const React = tslib_1.__importStar(require("react"));
const mobx_react_1 = require("mobx-react");
const _ = tslib_1.__importStar(require("lodash"));
const react_styles_1 = require("@patternfly/react-styles");
const topology_components_1 = tslib_1.__importDefault(require("@patternfly/react-styles/css/components/Topology/topology-components"));
const types_1 = require("../../../types");
const ConnectorArrow_1 = tslib_1.__importDefault(require("./ConnectorArrow"));
const ConnectorCross_1 = tslib_1.__importDefault(require("./ConnectorCross"));
const ConnectorSquare_1 = tslib_1.__importDefault(require("./ConnectorSquare"));
const ConnectorCircle_1 = tslib_1.__importDefault(require("./ConnectorCircle"));
const ConnectorArrowAlt_1 = tslib_1.__importDefault(require("./ConnectorArrowAlt"));
const utils_1 = require("../../../utils");
const DefaultConnectorTerminal = (_a) => {
    var { className, edge, isTarget = true, terminalType, status } = _a, others = tslib_1.__rest(_a, ["className", "edge", "isTarget", "terminalType", "status"]);
    let Terminal;
    switch (terminalType) {
        case types_1.EdgeTerminalType.directional:
            Terminal = ConnectorArrow_1.default;
            break;
        case types_1.EdgeTerminalType.directionalAlt:
            Terminal = ConnectorArrowAlt_1.default;
            break;
        case types_1.EdgeTerminalType.cross:
            Terminal = ConnectorCross_1.default;
            break;
        case types_1.EdgeTerminalType.square:
            Terminal = ConnectorSquare_1.default;
            break;
        case types_1.EdgeTerminalType.circle:
            Terminal = ConnectorCircle_1.default;
            break;
        default:
            return null;
    }
    if (!Terminal) {
        return null;
    }
    const bendPoints = edge.getBendpoints();
    const startPoint = isTarget ? _.last(bendPoints) || edge.getStartPoint() : _.head(bendPoints) || edge.getEndPoint();
    const endPoint = isTarget ? edge.getEndPoint() : edge.getStartPoint();
    const classes = react_styles_1.css(topology_components_1.default.topologyEdge, className, utils_1.StatusModifier[status]);
    return React.createElement(Terminal, Object.assign({ className: classes, startPoint: startPoint, endPoint: endPoint, isTarget: isTarget }, others));
};
exports.default = mobx_react_1.observer(DefaultConnectorTerminal);
//# sourceMappingURL=DefaultConnectorTerminal.js.map