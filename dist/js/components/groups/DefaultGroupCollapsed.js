"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const React = tslib_1.__importStar(require("react"));
const mobx_react_1 = require("mobx-react");
const react_styles_1 = require("@patternfly/react-styles");
const topology_components_1 = tslib_1.__importDefault(require("@patternfly/react-styles/css/components/Topology/topology-components"));
const expand_alt_icon_1 = tslib_1.__importDefault(require('@patternfly/react-icons/dist/js/icons/expand-alt-icon'));
const layers_1 = require("../layers");
const const_1 = require("../../const");
const utils_1 = require("../../utils");
const types_1 = require("../../types");
const behavior_1 = require("../../behavior");
const shapes_1 = require("../nodes/shapes");
const NodeLabel_1 = tslib_1.__importDefault(require("../nodes/labels/NodeLabel"));
const NodeShadows_1 = require("../nodes/NodeShadows");
const LabelBadge_1 = tslib_1.__importDefault(require("../nodes/labels/LabelBadge"));
const DefaultGroupCollapsed = ({ className, element, collapsible, selected, onSelect, children, hover, label, secondaryLabel, showLabel = true, truncateLength, collapsedWidth, collapsedHeight, getCollapsedShape, onCollapseChange, collapsedShadowOffset = 8, dndDropRef, dragNodeRef, canDrop, dropTarget, onContextMenu, contextMenuOpen, dragging, labelPosition, badge, badgeColor, badgeTextColor, badgeBorderColor, badgeClassName, badgeLocation, labelIconClass, labelIcon, labelIconPadding }) => {
    var _a;
    const [hovered, hoverRef] = utils_1.useHover();
    const [labelHover, labelHoverRef] = utils_1.useHover();
    const dragLabelRef = behavior_1.useDragNode()[1];
    const [shapeSize, shapeRef] = utils_1.useSize([collapsedWidth, collapsedHeight]);
    const refs = utils_1.useCombineRefs(hoverRef, dragNodeRef, shapeRef);
    const isHover = hover !== undefined ? hover : hovered;
    const childCount = element.getAllNodeChildren().length;
    const [badgeSize, badgeRef] = utils_1.useSize([childCount]);
    const groupClassName = react_styles_1.css(topology_components_1.default.topologyGroup, className, canDrop && 'pf-m-highlight', canDrop && dropTarget && 'pf-m-drop-target', dragging && 'pf-m-dragging', selected && 'pf-m-selected');
    const ShapeComponent = getCollapsedShape ? getCollapsedShape(element) : shapes_1.Ellipse;
    const filter = isHover || dragging || dropTarget ? utils_1.createSvgIdUrl(NodeShadows_1.NODE_SHADOW_FILTER_ID_HOVER) : undefined;
    return (React.createElement("g", { ref: labelHoverRef, onContextMenu: onContextMenu, onClick: onSelect, className: groupClassName },
        React.createElement(layers_1.Layer, { id: const_1.GROUPS_LAYER },
            React.createElement("g", { ref: refs, onClick: onSelect }, ShapeComponent && (React.createElement(React.Fragment, null,
                React.createElement("g", { transform: `translate(${collapsedShadowOffset * 2}, 0)` },
                    React.createElement(ShapeComponent, { className: react_styles_1.css(topology_components_1.default.topologyNodeBackground, 'pf-m-disabled'), element: element, width: collapsedWidth, height: collapsedHeight })),
                React.createElement("g", { transform: `translate(${collapsedShadowOffset}, 0)` },
                    React.createElement(ShapeComponent, { className: react_styles_1.css(topology_components_1.default.topologyNodeBackground, 'pf-m-disabled'), element: element, width: collapsedWidth, height: collapsedHeight })),
                React.createElement(ShapeComponent, { className: react_styles_1.css(topology_components_1.default.topologyNodeBackground), key: isHover || dragging || dropTarget ? 'shape-background-hover' : 'shape-background', element: element, width: collapsedWidth, height: collapsedHeight, dndDropRef: dndDropRef, filter: filter }))))),
        shapeSize && childCount && (React.createElement(LabelBadge_1.default, { className: topology_components_1.default.topologyGroupCollapsedBadge, ref: badgeRef, x: shapeSize.width - 8, y: (shapeSize.width - ((_a = badgeSize === null || badgeSize === void 0 ? void 0 : badgeSize.height) !== null && _a !== void 0 ? _a : 0)) / 2, badge: `${childCount}`, badgeColor: badgeColor, badgeTextColor: badgeTextColor, badgeBorderColor: badgeBorderColor })),
        showLabel && (React.createElement(NodeLabel_1.default, { className: topology_components_1.default.topologyGroupLabel, x: labelPosition === types_1.LabelPosition.right ? collapsedWidth + 8 : collapsedWidth / 2, y: labelPosition === types_1.LabelPosition.right ? collapsedHeight / 2 : collapsedHeight + 6, paddingX: 8, paddingY: 5, dragRef: dragNodeRef ? dragLabelRef : undefined, status: element.getNodeStatus(), secondaryLabel: secondaryLabel, truncateLength: truncateLength, badge: badge, badgeColor: badgeColor, badgeTextColor: badgeTextColor, badgeBorderColor: badgeBorderColor, badgeClassName: badgeClassName, badgeLocation: badgeLocation, labelIconClass: labelIconClass, labelIcon: labelIcon, labelIconPadding: labelIconPadding, onContextMenu: onContextMenu, contextMenuOpen: contextMenuOpen, hover: isHover || labelHover, actionIcon: collapsible ? React.createElement(expand_alt_icon_1.default, null) : undefined, onActionIconClick: () => onCollapseChange(element, false) }, label || element.getLabel())),
        children));
};
exports.default = mobx_react_1.observer(DefaultGroupCollapsed);
//# sourceMappingURL=DefaultGroupCollapsed.js.map