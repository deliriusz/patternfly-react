import * as React from 'react';
import { css } from '@patternfly/react-styles';
import styles from '@patternfly/react-styles/css/components/Topology/topology-components';
import { getConnectorRotationAngle, getConnectorStartPoint } from './terminalUtils';
const ConnectorCross = ({ startPoint, endPoint, className = '', isTarget = true, size = 14, dragRef }) => {
    if (!startPoint || !endPoint) {
        return null;
    }
    const width = size / 4;
    const yDelta = size / 2;
    const connectorStartPoint = getConnectorStartPoint(startPoint, endPoint, size);
    const angleDeg = getConnectorRotationAngle(startPoint, endPoint);
    const classNames = css(styles.topologyConnectorArrow, styles.topologyConnectorCross, className, !isTarget && 'pf-m-source', dragRef && 'pf-m-draggable');
    return (React.createElement("g", { transform: `translate(${connectorStartPoint[0]}, ${connectorStartPoint[1]}) rotate(${angleDeg})`, ref: dragRef, className: classNames },
        React.createElement("rect", { x: 0, y: -yDelta, width: size, height: size, fillOpacity: 0, strokeOpacity: 0 }),
        isTarget ? (React.createElement(React.Fragment, null,
            React.createElement("line", { x1: width, y1: yDelta, x2: width, y2: -yDelta }),
            React.createElement("line", { x1: 2 * width, y1: yDelta, x2: 2 * width, y2: -yDelta }))) : (React.createElement("rect", { x: width, y: -yDelta, width: width, height: size }))));
};
export default ConnectorCross;
//# sourceMappingURL=ConnectorCross.js.map