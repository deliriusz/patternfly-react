"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const React = tslib_1.__importStar(require("react"));
const react_styles_1 = require("@patternfly/react-styles");
const topology_components_1 = tslib_1.__importDefault(require("@patternfly/react-styles/css/components/Topology/topology-components"));
const add_circle_o_icon_1 = tslib_1.__importDefault(require('@patternfly/react-icons/dist/js/icons/add-circle-o-icon'));
const react_core_1 = require("@patternfly/react-core");
const ConnectorArrow_1 = tslib_1.__importDefault(require("./edges/terminals/ConnectorArrow"));
const cursorSize = 20;
const DefaultCreateConnector = ({ startPoint, endPoint, hints, dragging, hover, tipContents, className }) => {
    const classes = react_styles_1.css(topology_components_1.default.topologyDefaultCreateConnector, className, hover && topology_components_1.default.modifiers.hover, dragging && topology_components_1.default.modifiers.dragging);
    return (React.createElement("g", { className: classes },
        React.createElement("line", { className: react_styles_1.css(topology_components_1.default.topologyDefaultCreateConnectorLine), x1: startPoint.x, y1: startPoint.y, x2: endPoint.x, y2: endPoint.y }),
        hints && hints[hints.length - 1] === 'create' ? (React.createElement("g", { transform: `translate(${endPoint.x - cursorSize / 2},${endPoint.y - cursorSize / 2})`, className: react_styles_1.css(topology_components_1.default.topologyDefaultCreateConnectorCreate) },
            React.createElement("circle", { className: react_styles_1.css(topology_components_1.default.topologyDefaultCreateConnectorCreateBg), cx: cursorSize / 2, cy: cursorSize / 2, r: cursorSize / 2 }),
            tipContents ? (React.createElement(react_core_1.Tooltip, { content: tipContents, trigger: "manual", isVisible: true, animationDuration: 0, entryDelay: 0, exitDelay: 0 },
                React.createElement(add_circle_o_icon_1.default, { className: react_styles_1.css(topology_components_1.default.topologyDefaultCreateConnectorCreateCursor), style: { fontSize: cursorSize } }))) : (React.createElement(add_circle_o_icon_1.default, { className: react_styles_1.css(topology_components_1.default.topologyDefaultCreateConnectorCreateCursor), style: { fontSize: cursorSize } })))) : (React.createElement(ConnectorArrow_1.default, { className: react_styles_1.css(topology_components_1.default.topologyDefaultCreateConnectorArrow), startPoint: startPoint, endPoint: endPoint }))));
};
exports.default = DefaultCreateConnector;
//# sourceMappingURL=DefaultCreateConnector.js.map