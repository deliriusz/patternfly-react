import * as React from 'react';
import * as _ from 'lodash';
import { observer } from 'mobx-react';
import { EdgeTerminalType } from '../../types';
import { useHover } from '../../utils';
import { Layer } from '../layers';
import { css } from '@patternfly/react-styles';
import styles from '@patternfly/react-styles/css/components/Topology/topology-components';
import { getEdgeAnimationDuration, getEdgeStyleClassModifier } from '../../utils/style-utils';
import DefaultConnectorTerminal from './terminals/DefaultConnectorTerminal';
import { TOP_LAYER } from '../../const';
import DefaultConnectorTag from './DefaultConnectorTag';
import { getConnectorStartPoint } from './terminals/terminalUtils';
const BaseEdge = ({ element, dragging, sourceDragRef, targetDragRef, animationDuration, onShowRemoveConnector, onHideRemoveConnector, startTerminalType = EdgeTerminalType.none, startTerminalClass, startTerminalStatus, startTerminalSize = 14, endTerminalType = EdgeTerminalType.directional, endTerminalClass, endTerminalStatus, endTerminalSize = 14, tag, tagClass, tagStatus, children, className, selected, onSelect, onContextMenu }) => {
    const [hover, hoverRef] = useHover();
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
    const groupClassName = css(styles.topologyEdge, className, dragging && 'pf-m-dragging', hover && !dragging && 'pf-m-hover', selected && !dragging && 'pf-m-selected');
    const edgeAnimationDuration = animationDuration !== null && animationDuration !== void 0 ? animationDuration : getEdgeAnimationDuration(element.getEdgeAnimationSpeed());
    const linkClassName = css(styles.topologyEdgeLink, getEdgeStyleClassModifier(element.getEdgeStyle()));
    const bendpoints = element.getBendpoints();
    const d = `M${startPoint.x} ${startPoint.y} ${bendpoints.map((b) => `L${b.x} ${b.y} `).join('')}L${endPoint.x} ${endPoint.y}`;
    const bgStartPoint = !startTerminalType || startTerminalType === EdgeTerminalType.none
        ? [startPoint.x, startPoint.y]
        : getConnectorStartPoint(_.head(bendpoints) || endPoint, startPoint, startTerminalSize);
    const bgEndPoint = !endTerminalType || endTerminalType === EdgeTerminalType.none
        ? [endPoint.x, endPoint.y]
        : getConnectorStartPoint(_.last(bendpoints) || startPoint, endPoint, endTerminalSize);
    const backgroundPath = `M${bgStartPoint[0]} ${bgStartPoint[1]} ${bendpoints
        .map((b) => `L${b.x} ${b.y} `)
        .join('')}L${bgEndPoint[0]} ${bgEndPoint[1]}`;
    return (React.createElement(Layer, { id: dragging || hover ? TOP_LAYER : undefined },
        React.createElement("g", { ref: hoverRef, "data-test-id": "edge-handler", className: groupClassName, onClick: onSelect, onContextMenu: onContextMenu },
            React.createElement("path", { className: css(styles.topologyEdgeBackground), d: backgroundPath, onMouseEnter: onShowRemoveConnector, onMouseLeave: onHideRemoveConnector }),
            React.createElement("path", { className: linkClassName, d: d, style: { animationDuration: `${edgeAnimationDuration}s` } }),
            tag && (React.createElement(DefaultConnectorTag, { className: tagClass, startPoint: element.getStartPoint(), endPoint: element.getEndPoint(), tag: tag, status: tagStatus })),
            React.createElement(DefaultConnectorTerminal, { className: startTerminalClass, isTarget: false, edge: element, size: startTerminalSize, dragRef: sourceDragRef, terminalType: startTerminalType, status: startTerminalStatus, highlight: dragging || hover }),
            React.createElement(DefaultConnectorTerminal, { className: endTerminalClass, isTarget: true, dragRef: targetDragRef, edge: element, size: endTerminalSize, terminalType: endTerminalType, status: endTerminalStatus, highlight: dragging || hover }),
            children)));
};
export default observer(BaseEdge);
//# sourceMappingURL=DefaultEdge.js.map