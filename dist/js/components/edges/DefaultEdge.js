"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const React = tslib_1.__importStar(require("react"));
const _ = tslib_1.__importStar(require("lodash"));
const mobx_react_1 = require("mobx-react");
const types_1 = require("../../types");
const utils_1 = require("../../utils");
const layers_1 = require("../layers");
const react_styles_1 = require("@patternfly/react-styles");
const topology_components_1 = tslib_1.__importDefault(require("@patternfly/react-styles/css/components/Topology/topology-components"));
const style_utils_1 = require("../../utils/style-utils");
const DefaultConnectorTerminal_1 = tslib_1.__importDefault(require("./terminals/DefaultConnectorTerminal"));
const const_1 = require("../../const");
const DefaultConnectorTag_1 = tslib_1.__importDefault(require("./DefaultConnectorTag"));
const terminalUtils_1 = require("./terminals/terminalUtils");
const BaseEdge = ({ element, dragging, sourceDragRef, targetDragRef, animationDuration, onShowRemoveConnector, onHideRemoveConnector, startTerminalType = types_1.EdgeTerminalType.none, startTerminalClass, startTerminalStatus, startTerminalSize = 14, endTerminalType = types_1.EdgeTerminalType.directional, endTerminalClass, endTerminalStatus, endTerminalSize = 14, tag, tagClass, tagStatus, children, className, selected, onSelect, onContextMenu }) => {
    const [hover, hoverRef] = utils_1.useHover();
    const startPoint = element.getStartPoint();
    const endPoint = element.getEndPoint();
    // eslint-disable-next-line patternfly-react/no-layout-effect
    React.useLayoutEffect(() => {
        if (hover && !dragging) {
            onShowRemoveConnector && onShowRemoveConnector();
        }
        else {
            onHideRemoveConnector && onHideRemoveConnector();
        }
    }, [hover, dragging, onShowRemoveConnector, onHideRemoveConnector]);
    const groupClassName = react_styles_1.css(topology_components_1.default.topologyEdge, className, dragging && 'pf-m-dragging', hover && !dragging && 'pf-m-hover', selected && !dragging && 'pf-m-selected');
    const edgeAnimationDuration = animationDuration !== null && animationDuration !== void 0 ? animationDuration : style_utils_1.getEdgeAnimationDuration(element.getEdgeAnimationSpeed());
    const linkClassName = react_styles_1.css(topology_components_1.default.topologyEdgeLink, style_utils_1.getEdgeStyleClassModifier(element.getEdgeStyle()));
    const bendpoints = element.getBendpoints();
    const d = `M${startPoint.x} ${startPoint.y} ${bendpoints.map((b) => `L${b.x} ${b.y} `).join('')}L${endPoint.x} ${endPoint.y}`;
    const bgStartPoint = !startTerminalType || startTerminalType === types_1.EdgeTerminalType.none
        ? [startPoint.x, startPoint.y]
        : terminalUtils_1.getConnectorStartPoint(_.head(bendpoints) || endPoint, startPoint, startTerminalSize);
    const bgEndPoint = !endTerminalType || endTerminalType === types_1.EdgeTerminalType.none
        ? [endPoint.x, endPoint.y]
        : terminalUtils_1.getConnectorStartPoint(_.last(bendpoints) || startPoint, endPoint, endTerminalSize);
    const backgroundPath = `M${bgStartPoint[0]} ${bgStartPoint[1]} ${bendpoints
        .map((b) => `L${b.x} ${b.y} `)
        .join('')}L${bgEndPoint[0]} ${bgEndPoint[1]}`;
    return (React.createElement(layers_1.Layer, { id: dragging || hover ? const_1.TOP_LAYER : undefined },
        React.createElement("g", { ref: hoverRef, "data-test-id": "edge-handler", className: groupClassName, onClick: onSelect, onContextMenu: onContextMenu },
            React.createElement("path", { className: react_styles_1.css(topology_components_1.default.topologyEdgeBackground), d: backgroundPath, onMouseEnter: onShowRemoveConnector, onMouseLeave: onHideRemoveConnector }),
            React.createElement("path", { className: linkClassName, d: d, style: { animationDuration: `${edgeAnimationDuration}s` } }),
            tag && (React.createElement(DefaultConnectorTag_1.default, { className: tagClass, startPoint: element.getStartPoint(), endPoint: element.getEndPoint(), tag: tag, status: tagStatus })),
            React.createElement(DefaultConnectorTerminal_1.default, { className: startTerminalClass, isTarget: false, edge: element, size: startTerminalSize, dragRef: sourceDragRef, terminalType: startTerminalType, status: startTerminalStatus, highlight: dragging || hover }),
            React.createElement(DefaultConnectorTerminal_1.default, { className: endTerminalClass, isTarget: true, dragRef: targetDragRef, edge: element, size: endTerminalSize, terminalType: endTerminalType, status: endTerminalStatus, highlight: dragging || hover }),
            children)));
};
exports.default = mobx_react_1.observer(BaseEdge);
//# sourceMappingURL=DefaultEdge.js.map