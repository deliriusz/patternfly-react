import * as React from 'react';
import { css } from '@patternfly/react-styles';
import styles from '@patternfly/react-styles/css/components/Topology/topology-pipelines';
import topologyStyles from '@patternfly/react-styles/css/components/Topology/topology-components';
import { Popover, Tooltip } from '@patternfly/react-core';
import { observer } from '../../../mobx-exports';
import { AnchorEnd, ScaleDetailsLevel } from '../../../types';
import { RunStatus } from '../../types';
import { useAnchor } from '../../../behavior';
import { truncateMiddle } from '../../../utils/truncate-middle';
import { createSvgIdUrl, getNodeScaleTranslation, useCombineRefs, useHover, useSize } from '../../../utils';
import { getRunStatusModifier, nonShadowModifiers } from '../../utils';
import StatusIcon from '../../utils/StatusIcon';
import { TaskNodeSourceAnchor, TaskNodeTargetAnchor } from '../anchors';
import LabelActionIcon from '../../../components/nodes/labels/LabelActionIcon';
import LabelContextMenu from '../../../components/nodes/labels/LabelContextMenu';
import NodeShadows, { NODE_SHADOW_FILTER_ID_DANGER, NODE_SHADOW_FILTER_ID_HOVER } from '../../../components/nodes/NodeShadows';
import LabelBadge from '../../../components/nodes/labels/LabelBadge';
import LabelIcon from '../../../components/nodes/labels/LabelIcon';
import useDetailsLevel from '../../../hooks/useDetailsLevel';
import { useScaleNode } from '../../../hooks';
const STATUS_ICON_SIZE = 16;
const SCALE_UP_TIME = 200;
const TaskNode = ({ innerRef, element, className, paddingX = 8, paddingY = 8, status, statusIconSize = STATUS_ICON_SIZE, showStatusState = true, scaleNode, hideDetailsAtMedium, hiddenDetailsShownStatuses = [RunStatus.Failed, RunStatus.FailedToStart, RunStatus.Cancelled], badge, badgeColor, badgeTextColor, badgeBorderColor, badgeClassName = styles.topologyPipelinesPillBadge, badgeTooltip, badgePopoverProps, badgePopoverParams, taskIconClass, taskIcon, taskIconTooltip, taskIconPadding = 4, hover, truncateLength = 14, toolTip, disableTooltip = false, selected, onSelect, hasWhenExpression = false, whenSize = 0, whenOffset = 0, onContextMenu, contextMenuOpen, actionIcon, actionIconClassName, onActionIconClick, children }) => {
    var _a, _b, _c;
    const [hovered, innerHoverRef] = useHover();
    const hoverRef = useCombineRefs(innerRef, innerHoverRef);
    const isHover = hover !== undefined ? hover : hovered;
    const { width } = element.getBounds();
    const label = truncateMiddle(element.getLabel(), { length: truncateLength, omission: '...' });
    const [textSize, textRef] = useSize([label, className]);
    const [statusSize, statusRef] = useSize([status, showStatusState, statusIconSize]);
    const [badgeSize, badgeRef] = useSize([badge]);
    const [actionSize, actionRef] = useSize([actionIcon, paddingX]);
    const [contextSize, contextRef] = useSize([onContextMenu, paddingX]);
    const detailsLevel = useDetailsLevel();
    if (badgePopoverProps) {
        // eslint-disable-next-line no-console
        console.warn('badgePopoverProps is deprecated. Use badgePopoverParams instead.');
    }
    const textWidth = (_a = textSize === null || textSize === void 0 ? void 0 : textSize.width) !== null && _a !== void 0 ? _a : 0;
    const textHeight = (_b = textSize === null || textSize === void 0 ? void 0 : textSize.height) !== null && _b !== void 0 ? _b : 0;
    useAnchor(
    // Include scaleNode to cause an update when it changes
    // eslint-disable-next-line react-hooks/exhaustive-deps
    React.useCallback((node) => new TaskNodeSourceAnchor(node, detailsLevel, statusIconSize + 4), [
        detailsLevel,
        statusIconSize,
        scaleNode
    ]), AnchorEnd.source);
    useAnchor(React.useCallback((node) => new TaskNodeTargetAnchor(node, hasWhenExpression ? 0 : whenSize + whenOffset), [
        hasWhenExpression,
        whenSize,
        whenOffset
    ]), AnchorEnd.target);
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
            edge.setData(Object.assign(Object.assign({}, (data || {})), { indent: detailsLevel === ScaleDetailsLevel.high ? width - pillWidth : 0 }));
        });
    }, [detailsLevel, element, pillWidth, width]);
    const scale = element.getGraph().getScale();
    const nodeScale = useScaleNode(scaleNode, scale, SCALE_UP_TIME);
    const { translateX, translateY } = getNodeScaleTranslation(element, nodeScale, scaleNode);
    const nameLabel = (React.createElement("text", { ref: textRef, className: css(styles.topologyPipelinesPillText), dominantBaseline: "middle" }, label));
    const runStatusModifier = getRunStatusModifier(status);
    const pillClasses = css(styles.topologyPipelinesPill, className, isHover && styles.modifiers.hover, runStatusModifier, selected && styles.modifiers.selected, onSelect && styles.modifiers.selectable);
    let filter;
    if (runStatusModifier === styles.modifiers.danger) {
        filter = createSvgIdUrl(NODE_SHADOW_FILTER_ID_DANGER);
    }
    else if (isHover && !nonShadowModifiers.includes(runStatusModifier)) {
        filter = createSvgIdUrl(NODE_SHADOW_FILTER_ID_HOVER);
    }
    const taskIconComponent = (taskIconClass || taskIcon) && (React.createElement(LabelIcon, { x: iconStartX + iconWidth, y: (height - iconWidth) / 2, width: iconWidth, height: iconWidth, iconClass: taskIconClass, icon: taskIcon, padding: taskIconPadding }));
    const badgeLabel = badge ? (React.createElement(LabelBadge, { ref: badgeRef, x: badgeStartX, y: (height - ((_c = badgeSize === null || badgeSize === void 0 ? void 0 : badgeSize.height) !== null && _c !== void 0 ? _c : 0)) / 2, badge: badge, badgeClassName: badgeClassName, badgeColor: badgeColor, badgeTextColor: badgeTextColor, badgeBorderColor: badgeBorderColor })) : null;
    let badgeComponent;
    if (badgeLabel && badgeTooltip) {
        badgeComponent = React.createElement(Tooltip, { content: badgeTooltip }, badgeLabel);
    }
    else if (badgeLabel && badgePopoverParams) {
        badgeComponent = (React.createElement("g", { onClick: e => e.stopPropagation() },
            React.createElement(Popover, Object.assign({}, badgePopoverParams), badgeLabel)));
    }
    else {
        badgeComponent = badgeLabel;
    }
    const renderTask = () => {
        if (showStatusState && !scaleNode && hideDetailsAtMedium && detailsLevel !== ScaleDetailsLevel.high) {
            const statusBackgroundRadius = statusIconSize / 2 + 4;
            const height = element.getBounds().height;
            const upScale = 1 / scale;
            return (React.createElement("g", { transform: `translate(0, ${(height - statusBackgroundRadius * 2 * upScale) / 2}) scale(${upScale})` },
                React.createElement("circle", { className: css(styles.topologyPipelinesStatusIconBackground, styles.topologyPipelinesPillStatus, runStatusModifier, selected && 'pf-m-selected'), cx: statusBackgroundRadius, cy: statusBackgroundRadius, r: statusBackgroundRadius }),
                status && (!hiddenDetailsShownStatuses || hiddenDetailsShownStatuses.includes(status)) ? (React.createElement("g", { transform: `translate(4, 4)` },
                    React.createElement("g", { className: css(styles.topologyPipelinesStatusIcon, runStatusModifier, selected && 'pf-m-selected', (status === RunStatus.Running || status === RunStatus.InProgress) && styles.modifiers.spin) },
                        React.createElement(StatusIcon, { status: status })))) : null));
        }
        return (React.createElement("g", { className: pillClasses, transform: `translate(${whenOffset + whenSize}, 0)`, onClick: onSelect, onContextMenu: onContextMenu },
            React.createElement(NodeShadows, null),
            React.createElement("rect", { x: 0, y: 0, width: pillWidth, height: height, rx: height / 2, className: css(styles.topologyPipelinesPillBackground), filter: filter }),
            React.createElement("g", { transform: `translate(${textStartX}, ${paddingY + textHeight / 2 + 1})` }, element.getLabel() !== label && !disableTooltip ? (React.createElement(Tooltip, { content: element.getLabel() },
                React.createElement("g", null, nameLabel))) : (nameLabel)),
            status && showStatusState && (React.createElement("g", { transform: `translate(${statusStartX + paddingX / 2}, ${(height - statusIconSize) / 2})`, ref: statusRef },
                React.createElement("g", { className: css(styles.topologyPipelinesPillStatus, runStatusModifier, selected && 'pf-m-selected', (status === RunStatus.Running || status === RunStatus.InProgress) && styles.modifiers.spin) },
                    React.createElement(StatusIcon, { status: status })))),
            taskIconComponent &&
                (taskIconTooltip ? React.createElement(Tooltip, { content: taskIconTooltip }, taskIconComponent) : taskIconComponent),
            badgeComponent,
            actionIcon && (React.createElement(React.Fragment, null,
                React.createElement("line", { className: css(topologyStyles.topologyNodeSeparator), x1: actionStartX, y1: 0, x2: actionStartX, y2: height, shapeRendering: "crispEdges" }),
                React.createElement(LabelActionIcon, { ref: actionRef, x: actionStartX, y: 0, height: height, paddingX: paddingX, paddingY: 0, icon: actionIcon, className: actionIconClassName, onClick: onActionIconClick }))),
            textSize && onContextMenu && (React.createElement(React.Fragment, null,
                React.createElement("line", { className: css(topologyStyles.topologyNodeSeparator), x1: contextStartX, y1: 0, x2: contextStartX, y2: height, shapeRendering: "crispEdges" }),
                React.createElement(LabelContextMenu, { ref: contextRef, x: contextStartX, y: 0, height: height, paddingX: paddingX, paddingY: 0, onContextMenu: onContextMenu, contextMenuOpen: contextMenuOpen }))),
            children));
    };
    return (React.createElement("g", { className: css('pf-topology__pipelines__task-node', className), transform: `${scaleNode ? `translate(${translateX}, ${translateY})` : ''} scale(${nodeScale})`, ref: hoverRef }, !toolTip || disableTooltip ? (renderTask()) : (React.createElement(Tooltip, { position: "bottom", enableFlip: false, content: toolTip }, renderTask()))));
};
export default observer(React.forwardRef((props, ref) => React.createElement(TaskNode, Object.assign({ innerRef: ref }, props))));
//# sourceMappingURL=TaskNode.js.map