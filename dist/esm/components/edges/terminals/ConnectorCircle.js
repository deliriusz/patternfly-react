import * as React from 'react';
import { css } from '@patternfly/react-styles';
import styles from '@patternfly/react-styles/css/components/Topology/topology-components';
import { getConnectorStartPoint } from './terminalUtils';
const ConnectorCircle = ({ startPoint, endPoint, className = '', isTarget = true, size = 14, dragRef }) => {
    if (!startPoint || !endPoint) {
        return null;
    }
    const connectorStartPoint = getConnectorStartPoint(startPoint, endPoint, size / 2); // add stroke width rather than rotating
    const classNames = css(styles.topologyConnectorArrow, styles.topologyConnectorCircle, className, !isTarget && styles.modifiers.source, dragRef && 'pf-m-draggable');
    return (React.createElement("g", { transform: `translate(${connectorStartPoint[0]}, ${connectorStartPoint[1]})`, ref: dragRef, className: classNames },
        React.createElement("circle", { cx: 0, cy: 0, r: size / 2 })));
};
export default ConnectorCircle;
//# sourceMappingURL=ConnectorCircle.js.map