"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const React = tslib_1.__importStar(require("react"));
const mobx_react_1 = require("mobx-react");
const react_styles_1 = require("@patternfly/react-styles");
const react_core_1 = require("@patternfly/react-core");
const check_circle_icon_1 = tslib_1.__importDefault(require('@patternfly/react-icons/dist/js/icons/check-circle-icon'));
const exclamation_circle_icon_1 = tslib_1.__importDefault(require('@patternfly/react-icons/dist/js/icons/exclamation-circle-icon'));
const exclamation_triangle_icon_1 = tslib_1.__importDefault(require('@patternfly/react-icons/dist/js/icons/exclamation-triangle-icon'));
const topology_components_1 = tslib_1.__importDefault(require("@patternfly/react-styles/css/components/Topology/topology-components"));
const types_1 = require("../../types");
const Decorator_1 = tslib_1.__importDefault(require("../decorators/Decorator"));
const utils_1 = require("../../utils");
const NodeLabel_1 = tslib_1.__importDefault(require("./labels/NodeLabel"));
const NodeShadows_1 = tslib_1.__importStar(require("./NodeShadows"));
const shapes_1 = require("./shapes");
const StatusQuadrant = types_1.TopologyQuadrant.upperLeft;
const getStatusIcon = (status) => {
    switch (status) {
        case types_1.NodeStatus.danger:
            return React.createElement(exclamation_circle_icon_1.default, { className: "pf-m-danger" });
        case types_1.NodeStatus.warning:
            return React.createElement(exclamation_triangle_icon_1.default, { className: "pf-m-warning" });
        case types_1.NodeStatus.success:
            return React.createElement(check_circle_icon_1.default, { className: "pf-m-success" });
        default:
            return null;
    }
};
const SCALE_UP_TIME = 200;
const DefaultNode = ({ className, element, selected, hover, scaleNode, showLabel = true, label, secondaryLabel, labelClassName, labelPosition, scaleLabel, truncateLength, labelIconClass, labelIcon, labelIconPadding, nodeStatus, showStatusBackground, showStatusDecorator = false, statusDecoratorTooltip, getCustomShape, getShapeDecoratorCenter, onStatusDecoratorClick, badge, badgeColor, badgeTextColor, badgeBorderColor, badgeClassName, badgeLocation, onSelect, children, attachments, dragNodeRef, dragging, edgeDragging, canDrop, dropTarget, dndDropRef, onHideCreateConnector, onShowCreateConnector, onContextMenu, contextMenuOpen }) => {
    const [hovered, hoverRef] = utils_1.useHover();
    const status = nodeStatus || element.getNodeStatus();
    const refs = utils_1.useCombineRefs(hoverRef, dragNodeRef);
    const { width, height } = element.getDimensions();
    const isHover = hover !== undefined ? hover : hovered;
    const [nodeScale, setNodeScale] = React.useState(1);
    const statusDecorator = React.useMemo(() => {
        if (!status || !showStatusDecorator) {
            return null;
        }
        const icon = getStatusIcon(status);
        if (!icon) {
            return null;
        }
        const { x, y } = getShapeDecoratorCenter
            ? getShapeDecoratorCenter(StatusQuadrant, element)
            : shapes_1.getDefaultShapeDecoratorCenter(StatusQuadrant, element);
        const decorator = (React.createElement(Decorator_1.default, { x: x, y: y, radius: shapes_1.DEFAULT_DECORATOR_RADIUS, showBackground: true, onClick: e => onStatusDecoratorClick(e, element), icon: React.createElement("g", { className: react_styles_1.css(topology_components_1.default.topologyNodeDecoratorStatus) }, icon) }));
        if (statusDecoratorTooltip) {
            return (React.createElement(react_core_1.Tooltip, { content: statusDecoratorTooltip, position: react_core_1.TooltipPosition.left }, decorator));
        }
        return decorator;
    }, [showStatusDecorator, status, getShapeDecoratorCenter, element, statusDecoratorTooltip, onStatusDecoratorClick]);
    React.useEffect(() => {
        if (isHover) {
            onShowCreateConnector && onShowCreateConnector();
        }
        else {
            onHideCreateConnector && onHideCreateConnector();
        }
    }, [isHover, onShowCreateConnector, onHideCreateConnector]);
    const ShapeComponent = (getCustomShape && getCustomShape(element)) || shapes_1.getShapeComponent(element);
    const groupClassName = react_styles_1.css(topology_components_1.default.topologyNode, className, isHover && 'pf-m-hover', (dragging || edgeDragging) && 'pf-m-dragging', canDrop && 'pf-m-highlight', canDrop && dropTarget && 'pf-m-drop-target', selected && 'pf-m-selected', utils_1.StatusModifier[status]);
    const backgroundClassName = react_styles_1.css(topology_components_1.default.topologyNodeBackground, showStatusBackground && utils_1.StatusModifier[status], showStatusBackground && selected && 'pf-m-selected');
    let filter;
    if (status === 'danger') {
        filter = utils_1.createSvgIdUrl(NodeShadows_1.NODE_SHADOW_FILTER_ID_DANGER);
    }
    else if (isHover || dragging || edgeDragging || dropTarget) {
        filter = utils_1.createSvgIdUrl(NodeShadows_1.NODE_SHADOW_FILTER_ID_HOVER);
    }
    const nodeLabelPosition = labelPosition || element.getLabelPosition();
    const scale = element.getGraph().getScale();
    const animationRef = React.useRef();
    const scaleGoal = React.useRef(1);
    const nodeScaled = React.useRef(false);
    React.useEffect(() => {
        if (!scaleNode || scale >= 1) {
            setNodeScale(1);
            nodeScaled.current = false;
            if (animationRef.current) {
                window.cancelAnimationFrame(animationRef.current);
                animationRef.current = 0;
            }
        }
        else {
            scaleGoal.current = 1 / scale;
            const scaleDelta = scaleGoal.current - scale;
            const initTime = performance.now();
            const bumpScale = (bumpTime) => {
                const scalePercent = (bumpTime - initTime) / SCALE_UP_TIME;
                const nextScale = Math.min(scale + scaleDelta * scalePercent, scaleGoal.current);
                setNodeScale(nextScale);
                if (nextScale < scaleGoal.current) {
                    animationRef.current = window.requestAnimationFrame(bumpScale);
                }
                else {
                    nodeScaled.current = true;
                    animationRef.current = 0;
                }
            };
            if (nodeScaled.current) {
                setNodeScale(scaleGoal.current);
            }
            else if (!animationRef.current) {
                animationRef.current = window.requestAnimationFrame(bumpScale);
            }
        }
        return () => {
            if (animationRef.current) {
                window.cancelAnimationFrame(animationRef.current);
                animationRef.current = 0;
            }
        };
    }, [scale, scaleNode]);
    const labelScale = scaleLabel && !scaleNode ? Math.max(1, 1 / scale) : 1;
    const labelPositionScale = scaleLabel && !scaleNode ? Math.min(1, scale) : 1;
    const { translateX, translateY } = React.useMemo(() => {
        if (!scaleNode) {
            return { translateX: 0, translateY: 0 };
        }
        const bounds = element.getBounds();
        const translateX = bounds.width / 2 - (bounds.width / 2) * nodeScale;
        const translateY = bounds.height / 2 - (bounds.height / 2) * nodeScale;
        return { translateX, translateY };
    }, [element, nodeScale, scaleNode]);
    return (React.createElement("g", { className: groupClassName, transform: `${scaleNode ? `translate(${translateX}, ${translateY})` : ''} scale(${nodeScale})` },
        React.createElement(NodeShadows_1.default, null),
        React.createElement("g", { ref: refs, onClick: onSelect, onContextMenu: onContextMenu },
            ShapeComponent && (React.createElement(ShapeComponent, { className: backgroundClassName, element: element, width: width, height: height, dndDropRef: dndDropRef, filter: filter })),
            showLabel && (label || element.getLabel()) && (React.createElement("g", { transform: `scale(${labelScale})` },
                React.createElement(NodeLabel_1.default, { className: react_styles_1.css(topology_components_1.default.topologyNodeLabel, labelClassName), x: (nodeLabelPosition === types_1.LabelPosition.right ? width + 8 : width / 2) * labelPositionScale, y: (nodeLabelPosition === types_1.LabelPosition.right ? height / 2 : height + 6) * labelPositionScale, position: nodeLabelPosition, paddingX: 8, paddingY: 4, secondaryLabel: secondaryLabel, truncateLength: truncateLength, status: status, badge: badge, badgeColor: badgeColor, badgeTextColor: badgeTextColor, badgeBorderColor: badgeBorderColor, badgeClassName: badgeClassName, badgeLocation: badgeLocation, onContextMenu: onContextMenu, contextMenuOpen: contextMenuOpen, hover: isHover, labelIconClass: labelIconClass, labelIcon: labelIcon, labelIconPadding: labelIconPadding }, label || element.getLabel()))),
            children),
        statusDecorator,
        attachments));
};
exports.default = mobx_react_1.observer(DefaultNode);
//# sourceMappingURL=DefaultNode.js.map