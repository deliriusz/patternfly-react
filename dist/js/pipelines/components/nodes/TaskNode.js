"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const React = tslib_1.__importStar(require("react"));
const react_styles_1 = require("@patternfly/react-styles");
const topology_pipelines_1 = tslib_1.__importDefault(require("@patternfly/react-styles/css/components/Topology/topology-pipelines"));
const topology_components_1 = tslib_1.__importDefault(require("@patternfly/react-styles/css/components/Topology/topology-components"));
const react_core_1 = require("@patternfly/react-core");
const mobx_exports_1 = require("../../../mobx-exports");
const types_1 = require("../../../types");
const types_2 = require("../../types");
const behavior_1 = require("../../../behavior");
const truncate_middle_1 = require("../../../utils/truncate-middle");
const utils_1 = require("../../../utils");
const utils_2 = require("../../utils");
const StatusIcon_1 = tslib_1.__importDefault(require("../../utils/StatusIcon"));
const anchors_1 = require("../anchors");
const LabelActionIcon_1 = tslib_1.__importDefault(require("../../../components/nodes/labels/LabelActionIcon"));
const LabelContextMenu_1 = tslib_1.__importDefault(require("../../../components/nodes/labels/LabelContextMenu"));
const NodeShadows_1 = tslib_1.__importStar(require("../../../components/nodes/NodeShadows"));
const LabelBadge_1 = tslib_1.__importDefault(require("../../../components/nodes/labels/LabelBadge"));
const LabelIcon_1 = tslib_1.__importDefault(require("../../../components/nodes/labels/LabelIcon"));
const useDetailsLevel_1 = tslib_1.__importDefault(require("../../../hooks/useDetailsLevel"));
const hooks_1 = require("../../../hooks");
const STATUS_ICON_SIZE = 16;
const SCALE_UP_TIME = 200;
const TaskNode = ({ innerRef, element, className, paddingX = 8, paddingY = 8, status, statusIconSize = STATUS_ICON_SIZE, showStatusState = true, scaleNode, hideDetailsAtMedium, hiddenDetailsShownStatuses = [types_2.RunStatus.Failed, types_2.RunStatus.FailedToStart, types_2.RunStatus.Cancelled], badge, badgeColor, badgeTextColor, badgeBorderColor, badgeClassName = topology_pipelines_1.default.topologyPipelinesPillBadge, badgeTooltip, badgePopoverProps, badgePopoverParams, taskIconClass, taskIcon, taskIconTooltip, taskIconPadding = 4, hover, truncateLength = 14, toolTip, disableTooltip = false, selected, onSelect, hasWhenExpression = false, whenSize = 0, whenOffset = 0, onContextMenu, contextMenuOpen, actionIcon, actionIconClassName, onActionIconClick, children }) => {
    var _a, _b, _c;
    const [hovered, innerHoverRef] = utils_1.useHover();
    const hoverRef = utils_1.useCombineRefs(innerRef, innerHoverRef);
    const isHover = hover !== undefined ? hover : hovered;
    const { width } = element.getBounds();
    const label = truncate_middle_1.truncateMiddle(element.getLabel(), { length: truncateLength, omission: '...' });
    const [textSize, textRef] = utils_1.useSize([label, className]);
    const [statusSize, statusRef] = utils_1.useSize([status, showStatusState, statusIconSize]);
    const [badgeSize, badgeRef] = utils_1.useSize([badge]);
    const [actionSize, actionRef] = utils_1.useSize([actionIcon, paddingX]);
    const [contextSize, contextRef] = utils_1.useSize([onContextMenu, paddingX]);
    const detailsLevel = useDetailsLevel_1.default();
    if (badgePopoverProps) {
        // eslint-disable-next-line no-console
        console.warn('badgePopoverProps is deprecated. Use badgePopoverParams instead.');
    }
    const textWidth = (_a = textSize === null || textSize === void 0 ? void 0 : textSize.width) !== null && _a !== void 0 ? _a : 0;
    const textHeight = (_b = textSize === null || textSize === void 0 ? void 0 : textSize.height) !== null && _b !== void 0 ? _b : 0;
    behavior_1.useAnchor(
    // Include scaleNode to cause an update when it changes
    // eslint-disable-next-line react-hooks/exhaustive-deps
    React.useCallback((node) => new anchors_1.TaskNodeSourceAnchor(node, detailsLevel, statusIconSize + 4), [
        detailsLevel,
        statusIconSize,
        scaleNode
    ]), types_1.AnchorEnd.source);
    behavior_1.useAnchor(React.useCallback((node) => new anchors_1.TaskNodeTargetAnchor(node, hasWhenExpression ? 0 : whenSize + whenOffset), [
        hasWhenExpression,
        whenSize,
        whenOffset
    ]), types_1.AnchorEnd.target);
    const { height, statusStartX, textStartX, actionStartX, contextStartX, pillWidth, badgeStartX, iconWidth, iconStartX } = React.useMemo(() => {
        if (!textSize) {
            return {
                height: 0,
                statusStartX: 0,
                textStartX: 0,
                actionStartX: 0,
                contextStartX: 0,
                pillWidth: 0,
                badgeStartX: 0,
                iconWidth: 0,
                iconStartX: 0
            };
        }
        const height = textHeight + 2 * paddingY;
        const startX = paddingX + paddingX / 2;
        const iconWidth = taskIconClass || taskIcon ? height - taskIconPadding : 0;
        const iconStartX = -(iconWidth * 0.75);
        const statusStartX = startX - statusIconSize / 4; // Adjust for icon padding
        const statusSpace = status && showStatusState && statusSize ? statusSize.width + paddingX : 0;
        const textStartX = startX + statusSpace;
        const textSpace = textWidth + paddingX;
        const badgeStartX = textStartX + textSpace;
        const badgeSpace = badge && badgeSize ? badgeSize.width + paddingX : 0;
        const actionStartX = badgeStartX + badgeSpace;
        const actionSpace = actionIcon && actionSize ? actionSize.width + paddingX : 0;
        const contextStartX = actionStartX + actionSpace;
        const contextSpace = onContextMenu && contextSize ? contextSize.width + paddingX / 2 : 0;
        const pillWidth = contextStartX + contextSpace + paddingX / 2;
        return {
            height,
            statusStartX,
            textStartX,
            actionStartX,
            contextStartX,
            badgeStartX,
            iconWidth,
            iconStartX,
            pillWidth
        };
    }, [
        textSize,
        textHeight,
        textWidth,
        paddingY,
        paddingX,
        taskIconClass,
        taskIcon,
        taskIconPadding,
        statusIconSize,
        status,
        showStatusState,
        statusSize,
        badgeSize,
        badge,
        actionIcon,
        actionSize,
        onContextMenu,
        contextSize
    ]);
    React.useEffect(() => {
        const sourceEdges = element.getSourceEdges();
        sourceEdges.forEach(edge => {
            const data = edge.getData();
            edge.setData(Object.assign(Object.assign({}, (data || {})), { indent: detailsLevel === types_1.ScaleDetailsLevel.high ? width - pillWidth : 0 }));
        });
    }, [detailsLevel, element, pillWidth, width]);
    const scale = element.getGraph().getScale();
    const nodeScale = hooks_1.useScaleNode(scaleNode, scale, SCALE_UP_TIME);
    const { translateX, translateY } = utils_1.getNodeScaleTranslation(element, nodeScale, scaleNode);
    const nameLabel = (React.createElement("text", { ref: textRef, className: react_styles_1.css(topology_pipelines_1.default.topologyPipelinesPillText), dominantBaseline: "middle" }, label));
    const runStatusModifier = utils_2.getRunStatusModifier(status);
    const pillClasses = react_styles_1.css(topology_pipelines_1.default.topologyPipelinesPill, className, isHover && topology_pipelines_1.default.modifiers.hover, runStatusModifier, selected && topology_pipelines_1.default.modifiers.selected, onSelect && topology_pipelines_1.default.modifiers.selectable);
    let filter;
    if (runStatusModifier === topology_pipelines_1.default.modifiers.danger) {
        filter = utils_1.createSvgIdUrl(NodeShadows_1.NODE_SHADOW_FILTER_ID_DANGER);
    }
    else if (isHover && !utils_2.nonShadowModifiers.includes(runStatusModifier)) {
        filter = utils_1.createSvgIdUrl(NodeShadows_1.NODE_SHADOW_FILTER_ID_HOVER);
    }
    const taskIconComponent = (taskIconClass || taskIcon) && (React.createElement(LabelIcon_1.default, { x: iconStartX + iconWidth, y: (height - iconWidth) / 2, width: iconWidth, height: iconWidth, iconClass: taskIconClass, icon: taskIcon, padding: taskIconPadding }));
    const badgeLabel = badge ? (React.createElement(LabelBadge_1.default, { ref: badgeRef, x: badgeStartX, y: (height - ((_c = badgeSize === null || badgeSize === void 0 ? void 0 : badgeSize.height) !== null && _c !== void 0 ? _c : 0)) / 2, badge: badge, badgeClassName: badgeClassName, badgeColor: badgeColor, badgeTextColor: badgeTextColor, badgeBorderColor: badgeBorderColor })) : null;
    let badgeComponent;
    if (badgeLabel && badgeTooltip) {
        badgeComponent = React.createElement(react_core_1.Tooltip, { content: badgeTooltip }, badgeLabel);
    }
    else if (badgeLabel && badgePopoverParams) {
        badgeComponent = (React.createElement("g", { onClick: e => e.stopPropagation() },
            React.createElement(react_core_1.Popover, Object.assign({}, badgePopoverParams), badgeLabel)));
    }
    else {
        badgeComponent = badgeLabel;
    }
    const renderTask = () => {
        if (showStatusState && !scaleNode && hideDetailsAtMedium && detailsLevel !== types_1.ScaleDetailsLevel.high) {
            const statusBackgroundRadius = statusIconSize / 2 + 4;
            const height = element.getBounds().height;
            const upScale = 1 / scale;
            return (React.createElement("g", { transform: `translate(0, ${(height - statusBackgroundRadius * 2 * upScale) / 2}) scale(${upScale})` },
                React.createElement("circle", { className: react_styles_1.css(topology_pipelines_1.default.topologyPipelinesStatusIconBackground, topology_pipelines_1.default.topologyPipelinesPillStatus, runStatusModifier, selected && 'pf-m-selected'), cx: statusBackgroundRadius, cy: statusBackgroundRadius, r: statusBackgroundRadius }),
                status && (!hiddenDetailsShownStatuses || hiddenDetailsShownStatuses.includes(status)) ? (React.createElement("g", { transform: `translate(4, 4)` },
                    React.createElement("g", { className: react_styles_1.css(topology_pipelines_1.default.topologyPipelinesStatusIcon, runStatusModifier, selected && 'pf-m-selected', (status === types_2.RunStatus.Running || status === types_2.RunStatus.InProgress) && topology_pipelines_1.default.modifiers.spin) },
                        React.createElement(StatusIcon_1.default, { status: status })))) : null));
        }
        return (React.createElement("g", { className: pillClasses, transform: `translate(${whenOffset + whenSize}, 0)`, onClick: onSelect, onContextMenu: onContextMenu },
            React.createElement(NodeShadows_1.default, null),
            React.createElement("rect", { x: 0, y: 0, width: pillWidth, height: height, rx: height / 2, className: react_styles_1.css(topology_pipelines_1.default.topologyPipelinesPillBackground), filter: filter }),
            React.createElement("g", { transform: `translate(${textStartX}, ${paddingY + textHeight / 2 + 1})` }, element.getLabel() !== label && !disableTooltip ? (React.createElement(react_core_1.Tooltip, { content: element.getLabel() },
                React.createElement("g", null, nameLabel))) : (nameLabel)),
            status && showStatusState && (React.createElement("g", { transform: `translate(${statusStartX + paddingX / 2}, ${(height - statusIconSize) / 2})`, ref: statusRef },
                React.createElement("g", { className: react_styles_1.css(topology_pipelines_1.default.topologyPipelinesPillStatus, runStatusModifier, selected && 'pf-m-selected', (status === types_2.RunStatus.Running || status === types_2.RunStatus.InProgress) && topology_pipelines_1.default.modifiers.spin) },
                    React.createElement(StatusIcon_1.default, { status: status })))),
            taskIconComponent &&
                (taskIconTooltip ? React.createElement(react_core_1.Tooltip, { content: taskIconTooltip }, taskIconComponent) : taskIconComponent),
            badgeComponent,
            actionIcon && (React.createElement(React.Fragment, null,
                React.createElement("line", { className: react_styles_1.css(topology_components_1.default.topologyNodeSeparator), x1: actionStartX, y1: 0, x2: actionStartX, y2: height, shapeRendering: "crispEdges" }),
                React.createElement(LabelActionIcon_1.default, { ref: actionRef, x: actionStartX, y: 0, height: height, paddingX: paddingX, paddingY: 0, icon: actionIcon, className: actionIconClassName, onClick: onActionIconClick }))),
            textSize && onContextMenu && (React.createElement(React.Fragment, null,
                React.createElement("line", { className: react_styles_1.css(topology_components_1.default.topologyNodeSeparator), x1: contextStartX, y1: 0, x2: contextStartX, y2: height, shapeRendering: "crispEdges" }),
                React.createElement(LabelContextMenu_1.default, { ref: contextRef, x: contextStartX, y: 0, height: height, paddingX: paddingX, paddingY: 0, onContextMenu: onContextMenu, contextMenuOpen: contextMenuOpen }))),
            children));
    };
    return (React.createElement("g", { className: react_styles_1.css('pf-topology__pipelines__task-node', className), transform: `${scaleNode ? `translate(${translateX}, ${translateY})` : ''} scale(${nodeScale})`, ref: hoverRef }, !toolTip || disableTooltip ? (renderTask()) : (React.createElement(react_core_1.Tooltip, { position: "bottom", enableFlip: false, content: toolTip }, renderTask()))));
};
exports.default = mobx_exports_1.observer(React.forwardRef((props, ref) => React.createElement(TaskNode, Object.assign({ innerRef: ref }, props))));
//# sourceMappingURL=TaskNode.js.map