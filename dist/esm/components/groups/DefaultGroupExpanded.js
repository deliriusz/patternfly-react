import * as React from 'react';
import { observer } from 'mobx-react';
import { polygonHull } from 'd3-polygon';
import * as _ from 'lodash';
import { css } from '@patternfly/react-styles';
import styles from '@patternfly/react-styles/css/components/Topology/topology-components';
import CollapseIcon from '@patternfly/react-icons/dist/esm/icons/compress-alt-icon';
import NodeLabel from '../nodes/labels/NodeLabel';
import { Layer } from '../layers';
import { GROUPS_LAYER } from '../../const';
import { hullPath, maxPadding, useCombineRefs, useHover } from '../../utils';
import { isGraph, NodeShape } from '../../types';
import { useDragNode, useSvgAnchor } from '../../behavior';
// Return the point whose Y is the largest value.
// If multiple points are found, compute the center X between them
// export for testing only
export function computeLabelLocation(points) {
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
const DefaultGroupExpanded = ({ className, element, collapsible, selected, onSelect, hover, label, secondaryLabel, showLabel = true, truncateLength, dndDropRef, droppable, canDrop, dropTarget, onContextMenu, contextMenuOpen, dragging, dragNodeRef, badge, badgeColor, badgeTextColor, badgeBorderColor, badgeClassName, badgeLocation, labelIconClass, labelIcon, labelIconPadding, onCollapseChange }) => {
    var _a;
    const [hovered, hoverRef] = useHover();
    const [labelHover, labelHoverRef] = useHover();
    const dragLabelRef = useDragNode()[1];
    const refs = useCombineRefs(hoverRef, dragNodeRef);
    const isHover = hover !== undefined ? hover : hovered;
    const anchorRef = useSvgAnchor();
    const outlineRef = useCombineRefs(dndDropRef, anchorRef);
    const labelLocation = React.useRef();
    const pathRef = React.useRef();
    let parent = element.getParent();
    let altGroup = false;
    while (!isGraph(parent)) {
        altGroup = !altGroup;
        parent = parent.getParent();
    }
    // cast to number and coerce
    const padding = maxPadding((_a = element.getStyle().padding) !== null && _a !== void 0 ? _a : 17);
    const hullPadding = (point) => (point[2] || 0) + padding;
    if (!droppable || !pathRef.current || !labelLocation.current) {
        const children = element.getNodes().filter(c => c.isVisible());
        if (children.length === 0) {
            return null;
        }
        const points = [];
        _.forEach(children, c => {
            if (c.getNodeShape() === NodeShape.circle) {
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
        const hullPoints = points.length > 2 ? polygonHull(points) : points;
        if (!hullPoints) {
            return null;
        }
        // change the box only when not dragging
        pathRef.current = hullPath(hullPoints, hullPadding);
        // Compute the location of the group label.
        labelLocation.current = computeLabelLocation(hullPoints);
    }
    const groupClassName = css(styles.topologyGroup, className, altGroup && 'pf-m-alt-group', canDrop && 'pf-m-highlight', dragging && 'pf-m-dragging', selected && 'pf-m-selected');
    const innerGroupClassName = css(styles.topologyGroup, className, altGroup && 'pf-m-alt-group', canDrop && 'pf-m-highlight', dragging && 'pf-m-dragging', selected && 'pf-m-selected', (isHover || labelHover) && 'pf-m-hover', canDrop && dropTarget && 'pf-m-drop-target');
    return (React.createElement("g", { ref: labelHoverRef, onContextMenu: onContextMenu, onClick: onSelect, className: groupClassName },
        React.createElement(Layer, { id: GROUPS_LAYER },
            React.createElement("g", { ref: refs, onContextMenu: onContextMenu, onClick: onSelect, className: innerGroupClassName },
                React.createElement("path", { ref: outlineRef, className: styles.topologyGroupBackground, d: pathRef.current }))),
        showLabel && (label || element.getLabel()) && (React.createElement(NodeLabel, { className: styles.topologyGroupLabel, x: labelLocation.current[0], y: labelLocation.current[1] + hullPadding(labelLocation.current) + 24, paddingX: 8, paddingY: 5, dragRef: dragNodeRef ? dragLabelRef : undefined, status: element.getNodeStatus(), secondaryLabel: secondaryLabel, truncateLength: truncateLength, badge: badge, badgeColor: badgeColor, badgeTextColor: badgeTextColor, badgeBorderColor: badgeBorderColor, badgeClassName: badgeClassName, badgeLocation: badgeLocation, labelIconClass: labelIconClass, labelIcon: labelIcon, labelIconPadding: labelIconPadding, onContextMenu: onContextMenu, contextMenuOpen: contextMenuOpen, hover: isHover || labelHover, actionIcon: collapsible ? React.createElement(CollapseIcon, null) : undefined, onActionIconClick: () => onCollapseChange(element, true) }, label || element.getLabel()))));
};
export default observer(DefaultGroupExpanded);
//# sourceMappingURL=DefaultGroupExpanded.js.map