import * as React from 'react';
import { observer } from 'mobx-react';
import { css } from '@patternfly/react-styles';
import styles from '@patternfly/react-styles/css/components/Topology/topology-components';
import ExpandIcon from '@patternfly/react-icons/dist/esm/icons/expand-alt-icon';
import { Layer } from '../layers';
import { GROUPS_LAYER } from '../../const';
import { createSvgIdUrl, useCombineRefs, useHover, useSize } from '../../utils';
import { LabelPosition } from '../../types';
import { useDragNode } from '../../behavior';
import { Ellipse } from '../nodes/shapes';
import NodeLabel from '../nodes/labels/NodeLabel';
import { NODE_SHADOW_FILTER_ID_HOVER } from '../nodes/NodeShadows';
import LabelBadge from '../nodes/labels/LabelBadge';
const DefaultGroupCollapsed = ({ className, element, collapsible, selected, onSelect, children, hover, label, secondaryLabel, showLabel = true, truncateLength, collapsedWidth, collapsedHeight, getCollapsedShape, onCollapseChange, collapsedShadowOffset = 8, dndDropRef, dragNodeRef, canDrop, dropTarget, onContextMenu, contextMenuOpen, dragging, labelPosition, badge, badgeColor, badgeTextColor, badgeBorderColor, badgeClassName, badgeLocation, labelIconClass, labelIcon, labelIconPadding }) => {
    var _a;
    const [hovered, hoverRef] = useHover();
    const [labelHover, labelHoverRef] = useHover();
    const dragLabelRef = useDragNode()[1];
    const [shapeSize, shapeRef] = useSize([collapsedWidth, collapsedHeight]);
    const refs = useCombineRefs(hoverRef, dragNodeRef, shapeRef);
    const isHover = hover !== undefined ? hover : hovered;
    const childCount = element.getAllNodeChildren().length;
    const [badgeSize, badgeRef] = useSize([childCount]);
    const groupClassName = css(styles.topologyGroup, className, canDrop && 'pf-m-highlight', canDrop && dropTarget && 'pf-m-drop-target', dragging && 'pf-m-dragging', selected && 'pf-m-selected');
    const ShapeComponent = getCollapsedShape ? getCollapsedShape(element) : Ellipse;
    const filter = isHover || dragging || dropTarget ? createSvgIdUrl(NODE_SHADOW_FILTER_ID_HOVER) : undefined;
    return (React.createElement("g", { ref: labelHoverRef, onContextMenu: onContextMenu, onClick: onSelect, className: groupClassName },
        React.createElement(Layer, { id: GROUPS_LAYER },
            React.createElement("g", { ref: refs, onClick: onSelect }, ShapeComponent && (React.createElement(React.Fragment, null,
                React.createElement("g", { transform: `translate(${collapsedShadowOffset * 2}, 0)` },
                    React.createElement(ShapeComponent, { className: css(styles.topologyNodeBackground, 'pf-m-disabled'), element: element, width: collapsedWidth, height: collapsedHeight })),
                React.createElement("g", { transform: `translate(${collapsedShadowOffset}, 0)` },
                    React.createElement(ShapeComponent, { className: css(styles.topologyNodeBackground, 'pf-m-disabled'), element: element, width: collapsedWidth, height: collapsedHeight })),
                React.createElement(ShapeComponent, { className: css(styles.topologyNodeBackground), key: isHover || dragging || dropTarget ? 'shape-background-hover' : 'shape-background', element: element, width: collapsedWidth, height: collapsedHeight, dndDropRef: dndDropRef, filter: filter }))))),
        shapeSize && childCount && (React.createElement(LabelBadge, { className: styles.topologyGroupCollapsedBadge, ref: badgeRef, x: shapeSize.width - 8, y: (shapeSize.width - ((_a = badgeSize === null || badgeSize === void 0 ? void 0 : badgeSize.height) !== null && _a !== void 0 ? _a : 0)) / 2, badge: `${childCount}`, badgeColor: badgeColor, badgeTextColor: badgeTextColor, badgeBorderColor: badgeBorderColor })),
        showLabel && (React.createElement(NodeLabel, { className: styles.topologyGroupLabel, x: labelPosition === LabelPosition.right ? collapsedWidth + 8 : collapsedWidth / 2, y: labelPosition === LabelPosition.right ? collapsedHeight / 2 : collapsedHeight + 6, paddingX: 8, paddingY: 5, dragRef: dragNodeRef ? dragLabelRef : undefined, status: element.getNodeStatus(), secondaryLabel: secondaryLabel, truncateLength: truncateLength, badge: badge, badgeColor: badgeColor, badgeTextColor: badgeTextColor, badgeBorderColor: badgeBorderColor, badgeClassName: badgeClassName, badgeLocation: badgeLocation, labelIconClass: labelIconClass, labelIcon: labelIcon, labelIconPadding: labelIconPadding, onContextMenu: onContextMenu, contextMenuOpen: contextMenuOpen, hover: isHover || labelHover, actionIcon: collapsible ? React.createElement(ExpandIcon, null) : undefined, onActionIconClick: () => onCollapseChange(element, false) }, label || element.getLabel())),
        children));
};
export default observer(DefaultGroupCollapsed);
//# sourceMappingURL=DefaultGroupCollapsed.js.map