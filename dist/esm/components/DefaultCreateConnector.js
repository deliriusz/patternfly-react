import * as React from 'react';
import { css } from '@patternfly/react-styles';
import styles from '@patternfly/react-styles/css/components/Topology/topology-components';
import AddCircleOIcon from '@patternfly/react-icons/dist/esm/icons/add-circle-o-icon';
import { Tooltip } from '@patternfly/react-core';
import ConnectorArrow from './edges/terminals/ConnectorArrow';
const cursorSize = 20;
const DefaultCreateConnector = ({ startPoint, endPoint, hints, dragging, hover, tipContents, className }) => {
    const classes = css(styles.topologyDefaultCreateConnector, className, hover && styles.modifiers.hover, dragging && styles.modifiers.dragging);
    return (React.createElement("g", { className: classes },
        React.createElement("line", { className: css(styles.topologyDefaultCreateConnectorLine), x1: startPoint.x, y1: startPoint.y, x2: endPoint.x, y2: endPoint.y }),
        hints && hints[hints.length - 1] === 'create' ? (React.createElement("g", { transform: `translate(${endPoint.x - cursorSize / 2},${endPoint.y - cursorSize / 2})`, className: css(styles.topologyDefaultCreateConnectorCreate) },
            React.createElement("circle", { className: css(styles.topologyDefaultCreateConnectorCreateBg), cx: cursorSize / 2, cy: cursorSize / 2, r: cursorSize / 2 }),
            tipContents ? (React.createElement(Tooltip, { content: tipContents, trigger: "manual", isVisible: true, animationDuration: 0, entryDelay: 0, exitDelay: 0 },
                React.createElement(AddCircleOIcon, { className: css(styles.topologyDefaultCreateConnectorCreateCursor), style: { fontSize: cursorSize } }))) : (React.createElement(AddCircleOIcon, { className: css(styles.topologyDefaultCreateConnectorCreateCursor), style: { fontSize: cursorSize } })))) : (React.createElement(ConnectorArrow, { className: css(styles.topologyDefaultCreateConnectorArrow), startPoint: startPoint, endPoint: endPoint }))));
};
export default DefaultCreateConnector;
//# sourceMappingURL=DefaultCreateConnector.js.map