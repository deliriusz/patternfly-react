"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.WhenDecorator = exports.DEFAULT_WHEN_OFFSET = exports.DEFAULT_WHEN_SIZE = void 0;
const tslib_1 = require("tslib");
const React = tslib_1.__importStar(require("react"));
const react_core_1 = require("@patternfly/react-core");
const react_styles_1 = require("@patternfly/react-styles");
const topology_pipelines_1 = tslib_1.__importDefault(require("@patternfly/react-styles/css/components/Topology/topology-pipelines"));
const topology_components_1 = tslib_1.__importDefault(require("@patternfly/react-styles/css/components/Topology/topology-components"));
const mobx_exports_1 = require("../../mobx-exports");
const utils_1 = require("../utils");
exports.DEFAULT_WHEN_SIZE = 12;
exports.DEFAULT_WHEN_OFFSET = 12;
const WhenDecorator = ({ element, width = exports.DEFAULT_WHEN_SIZE, height = exports.DEFAULT_WHEN_SIZE, className, status, leftOffset = exports.DEFAULT_WHEN_OFFSET, edgeLength = exports.DEFAULT_WHEN_OFFSET, toolTip, disableTooltip = false }) => {
    const { height: taskHeight } = element.getBounds();
    const y = taskHeight / 2 - height / 2;
    const startX = -width - leftOffset;
    const points = `${startX + width / 2} ${y} ${startX + width} ${y + height / 2} ${startX + width / 2} ${y +
        height} ${startX} ${y + height / 2}`;
    const diamondNode = (React.createElement("g", { className: className },
        React.createElement("line", { className: react_styles_1.css(topology_components_1.default.topologyEdgeBackground), x1: -leftOffset, y1: taskHeight / 2 - height / 2, x2: -leftOffset + edgeLength, y2: taskHeight / 2 - height / 2 }),
        React.createElement("line", { className: react_styles_1.css(topology_components_1.default.topologyEdge, topology_pipelines_1.default.topologyPipelinesWhenExpressionEdge), x1: -leftOffset, y1: taskHeight / 2, x2: -leftOffset + edgeLength, y2: taskHeight / 2 }),
        React.createElement("polygon", { "data-test": "diamond-decorator", className: react_styles_1.css(topology_pipelines_1.default.topologyPipelinesWhenExpressionBackground, utils_1.getWhenStatusModifier(status)), points: points })));
    return toolTip && !disableTooltip ? (React.createElement(react_core_1.Tooltip, { position: "bottom", enableFlip: false, content: React.createElement("div", { "data-test": "when-expression-tooltip" }, toolTip) }, diamondNode)) : (diamondNode);
};
exports.WhenDecorator = WhenDecorator;
exports.WhenDecorator.displayName = 'WhenDecorator';
exports.default = mobx_exports_1.observer(exports.WhenDecorator);
//# sourceMappingURL=WhenDecorator.js.map