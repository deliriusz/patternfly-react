"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.computeLabelLocation = void 0;
const tslib_1 = require("tslib");
const React = tslib_1.__importStar(require("react"));
const mobx_react_1 = require("mobx-react");
const d3_polygon_1 = require("d3-polygon");
const _ = tslib_1.__importStar(require("lodash"));
const react_styles_1 = require("@patternfly/react-styles");
const topology_components_1 = tslib_1.__importDefault(require("@patternfly/react-styles/css/components/Topology/topology-components"));
const compress_alt_icon_1 = tslib_1.__importDefault(require('@patternfly/react-icons/dist/js/icons/compress-alt-icon'));
const NodeLabel_1 = tslib_1.__importDefault(require("../nodes/labels/NodeLabel"));
const layers_1 = require("../layers");
const const_1 = require("../../const");
const utils_1 = require("../../utils");
const types_1 = require("../../types");
const behavior_1 = require("../../behavior");
// Return the point whose Y is the largest value.
// If multiple points are found, compute the center X between them
// export for testing only
function computeLabelLocation(points) {
    let lowPoints;
    const threshold = 5;
    _.forEach(points, p => {
        const delta = !lowPoints ? Infinity : Math.round(p[1]) - Math.round(lowPoints[0][1]);
        if (delta > threshold) {
            lowPoints = [p];
        }
        else if (Math.abs(delta) <= threshold) {
            lowPoints.push(p);
        }
    });
    return [
        (_.minBy(lowPoints, p => p[0])[0] + _.maxBy(lowPoints, p => p[0])[0]) / 2,
        lowPoints[0][1],
        // use the max size value
        _.maxBy(lowPoints, p => p[2])[2]
    ];
}
exports.computeLabelLocation = computeLabelLocation;
const DefaultGroupExpanded = ({ className, element, collapsible, selected, onSelect, hover, label, secondaryLabel, showLabel = true, truncateLength, dndDropRef, droppable, canDrop, dropTarget, onContextMenu, contextMenuOpen, dragging, dragNodeRef, badge, badgeColor, badgeTextColor, badgeBorderColor, badgeClassName, badgeLocation, labelIconClass, labelIcon, labelIconPadding, onCollapseChange }) => {
    var _a;
    const [hovered, hoverRef] = utils_1.useHover();
    const [labelHover, labelHoverRef] = utils_1.useHover();
    const dragLabelRef = behavior_1.useDragNode()[1];
    const refs = utils_1.useCombineRefs(hoverRef, dragNodeRef);
    const isHover = hover !== undefined ? hover : hovered;
    const anchorRef = behavior_1.useSvgAnchor();
    const outlineRef = utils_1.useCombineRefs(dndDropRef, anchorRef);
    const labelLocation = React.useRef();
    const pathRef = React.useRef();
    let parent = element.getParent();
    let altGroup = false;
    while (!types_1.isGraph(parent)) {
        altGroup = !altGroup;
        parent = parent.getParent();
    }
    // cast to number and coerce
    const padding = utils_1.maxPadding((_a = element.getStyle().padding) !== null && _a !== void 0 ? _a : 17);
    const hullPadding = (point) => (point[2] || 0) + padding;
    if (!droppable || !pathRef.current || !labelLocation.current) {
        const children = element.getNodes().filter(c => c.isVisible());
        if (children.length === 0) {
            return null;
        }
        const points = [];
        _.forEach(children, c => {
            if (c.getNodeShape() === types_1.NodeShape.circle) {
                const bounds = c.getBounds();
                const { width, height } = bounds;
                const { x, y } = bounds.getCenter();
                const radius = Math.max(width, height) / 2;
                points.push([x, y, radius]);
            }
            else {
                // add all 4 corners
                const { width, height, x, y } = c.getBounds();
                points.push([x, y, 0]);
                points.push([x + width, y, 0]);
                points.push([x, y + height, 0]);
                points.push([x + width, y + height, 0]);
            }
        });
        const hullPoints = points.length > 2 ? d3_polygon_1.polygonHull(points) : points;
        if (!hullPoints) {
            return null;
        }
        // change the box only when not dragging
        pathRef.current = utils_1.hullPath(hullPoints, hullPadding);
        // Compute the location of the group label.
        labelLocation.current = computeLabelLocation(hullPoints);
    }
    const groupClassName = react_styles_1.css(topology_components_1.default.topologyGroup, className, altGroup && 'pf-m-alt-group', canDrop && 'pf-m-highlight', dragging && 'pf-m-dragging', selected && 'pf-m-selected');
    const innerGroupClassName = react_styles_1.css(topology_components_1.default.topologyGroup, className, altGroup && 'pf-m-alt-group', canDrop && 'pf-m-highlight', dragging && 'pf-m-dragging', selected && 'pf-m-selected', (isHover || labelHover) && 'pf-m-hover', canDrop && dropTarget && 'pf-m-drop-target');
    return (React.createElement("g", { ref: labelHoverRef, onContextMenu: onContextMenu, onClick: onSelect, className: groupClassName },
        React.createElement(layers_1.Layer, { id: const_1.GROUPS_LAYER },
            React.createElement("g", { ref: refs, onContextMenu: onContextMenu, onClick: onSelect, className: innerGroupClassName },
                React.createElement("path", { ref: outlineRef, className: topology_components_1.default.topologyGroupBackground, d: pathRef.current }))),
        showLabel && (label || element.getLabel()) && (React.createElement(NodeLabel_1.default, { className: topology_components_1.default.topologyGroupLabel, x: labelLocation.current[0], y: labelLocation.current[1] + hullPadding(labelLocation.current) + 24, paddingX: 8, paddingY: 5, dragRef: dragNodeRef ? dragLabelRef : undefined, status: element.getNodeStatus(), secondaryLabel: secondaryLabel, truncateLength: truncateLength, badge: badge, badgeColor: badgeColor, badgeTextColor: badgeTextColor, badgeBorderColor: badgeBorderColor, badgeClassName: badgeClassName, badgeLocation: badgeLocation, labelIconClass: labelIconClass, labelIcon: labelIcon, labelIconPadding: labelIconPadding, onContextMenu: onContextMenu, contextMenuOpen: contextMenuOpen, hover: isHover || labelHover, actionIcon: collapsible ? React.createElement(compress_alt_icon_1.default, null) : undefined, onActionIconClick: () => onCollapseChange(element, true) }, label || element.getLabel()))));
};
exports.default = mobx_react_1.observer(DefaultGroupExpanded);
//# sourceMappingURL=DefaultGroupExpanded.js.map