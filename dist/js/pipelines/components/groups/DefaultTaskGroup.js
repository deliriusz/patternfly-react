"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const React = tslib_1.__importStar(require("react"));
const mobx_react_1 = require("mobx-react");
const react_styles_1 = require("@patternfly/react-styles");
const topology_components_1 = tslib_1.__importDefault(require("@patternfly/react-styles/css/components/Topology/topology-components"));
const compress_alt_icon_1 = tslib_1.__importDefault(require('@patternfly/react-icons/dist/js/icons/compress-alt-icon'));
const NodeLabel_1 = tslib_1.__importDefault(require("../../../components/nodes/labels/NodeLabel"));
const layers_1 = require("../../../components/layers");
const const_1 = require("../../../const");
const utils_1 = require("../../../utils");
const types_1 = require("../../../types");
const behavior_1 = require("../../../behavior");
const DefaultTaskGroup = ({ className, element, collapsible, selected, onSelect, hover, label, secondaryLabel, showLabel = true, truncateLength, canDrop, dropTarget, onContextMenu, contextMenuOpen, dragging, dragNodeRef, badge, badgeColor, badgeTextColor, badgeBorderColor, badgeClassName, badgeLocation, labelOffset = 17, labelIconClass, labelIcon, labelIconPadding, onCollapseChange }) => {
    var _a;
    const [hovered, hoverRef] = utils_1.useHover();
    const [labelHover, labelHoverRef] = utils_1.useHover();
    const dragLabelRef = behavior_1.useDragNode()[1];
    const refs = utils_1.useCombineRefs(hoverRef, dragNodeRef);
    const isHover = hover !== undefined ? hover : hovered;
    const labelPosition = element.getLabelPosition();
    let parent = element.getParent();
    let altGroup = false;
    while (!types_1.isGraph(parent)) {
        altGroup = !altGroup;
        parent = parent.getParent();
    }
    const children = element.getNodes().filter(c => c.isVisible());
    // cast to number and coerce
    const padding = utils_1.maxPadding((_a = element.getStyle().padding) !== null && _a !== void 0 ? _a : 17);
    const { minX, minY, maxX, maxY } = children.reduce((acc, child) => {
        const bounds = child.getBounds();
        return {
            minX: Math.min(acc.minX, bounds.x - padding),
            minY: Math.min(acc.minY, bounds.y - padding),
            maxX: Math.max(acc.maxX, bounds.x + bounds.width + padding),
            maxY: Math.max(acc.maxY, bounds.y + bounds.height + padding)
        };
    }, { minX: Infinity, minY: Infinity, maxX: 0, maxY: 0 });
    const [labelX, labelY] = React.useMemo(() => {
        if (!showLabel || !(label || element.getLabel())) {
            return [0, 0];
        }
        switch (labelPosition) {
            case types_1.LabelPosition.right:
                return [maxX + labelOffset, minY + (maxY - minY) / 2];
            case types_1.LabelPosition.bottom:
            default:
                return [minX + (maxX - minX) / 2, maxY + labelOffset];
        }
    }, [element, label, labelOffset, labelPosition, maxX, maxY, minX, minY, showLabel]);
    if (children.length === 0) {
        return null;
    }
    const groupClassName = react_styles_1.css(topology_components_1.default.topologyGroup, className, altGroup && 'pf-m-alt-group', canDrop && 'pf-m-highlight', dragging && 'pf-m-dragging', selected && 'pf-m-selected');
    const innerGroupClassName = react_styles_1.css(topology_components_1.default.topologyGroup, className, altGroup && 'pf-m-alt-group', canDrop && 'pf-m-highlight', dragging && 'pf-m-dragging', selected && 'pf-m-selected', (isHover || labelHover) && 'pf-m-hover', canDrop && dropTarget && 'pf-m-drop-target');
    return (React.createElement("g", { ref: labelHoverRef, onContextMenu: onContextMenu, onClick: onSelect, className: groupClassName },
        React.createElement(layers_1.Layer, { id: const_1.GROUPS_LAYER },
            React.createElement("g", { ref: refs, onContextMenu: onContextMenu, onClick: onSelect, className: innerGroupClassName },
                React.createElement("rect", { x: minX, y: minY, width: maxX - minX, height: maxY - minY, className: topology_components_1.default.topologyGroupBackground }))),
        showLabel && (label || element.getLabel()) && (React.createElement(NodeLabel_1.default, { className: topology_components_1.default.topologyGroupLabel, x: labelX, y: labelY, position: labelPosition, paddingX: 8, paddingY: 5, dragRef: dragNodeRef ? dragLabelRef : undefined, status: element.getNodeStatus(), secondaryLabel: secondaryLabel, truncateLength: truncateLength, badge: badge, badgeColor: badgeColor, badgeTextColor: badgeTextColor, badgeBorderColor: badgeBorderColor, badgeClassName: badgeClassName, badgeLocation: badgeLocation, labelIconClass: labelIconClass, labelIcon: labelIcon, labelIconPadding: labelIconPadding, onContextMenu: onContextMenu, contextMenuOpen: contextMenuOpen, hover: isHover || labelHover, actionIcon: collapsible ? React.createElement(compress_alt_icon_1.default, null) : undefined, onActionIconClick: () => onCollapseChange(element, true) }, label || element.getLabel()))));
};
exports.default = mobx_react_1.observer(DefaultTaskGroup);
//# sourceMappingURL=DefaultTaskGroup.js.map