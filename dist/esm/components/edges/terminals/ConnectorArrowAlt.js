import * as React from 'react';
import { css } from '@patternfly/react-styles';
import styles from '@patternfly/react-styles/css/components/Topology/topology-components';
import ConnectorArrow from './ConnectorArrow';
const ConnectorArrowAlt = ({ startPoint, endPoint, className = '', size, dragRef }) => {
    const classes = css(styles.topologyConnectorArrow, styles.modifiers.altConnectorArrow, className, dragRef && 'pf-m-draggable');
    return (React.createElement(ConnectorArrow, { startPoint: startPoint, endPoint: endPoint, className: classes, size: size, dragRef: dragRef }));
};
export default ConnectorArrowAlt;
//# sourceMappingURL=ConnectorArrowAlt.js.map