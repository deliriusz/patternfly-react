import { __rest } from "tslib";
import * as React from 'react';
import { observer } from 'mobx-react';
import * as _ from 'lodash';
import { css } from '@patternfly/react-styles';
import styles from '@patternfly/react-styles/css/components/Topology/topology-components';
import { EdgeTerminalType } from '../../../types';
import ConnectorArrow from './ConnectorArrow';
import ConnectorCross from './ConnectorCross';
import ConnectorSquare from './ConnectorSquare';
import ConnectorCircle from './ConnectorCircle';
import ConnectorArrowAlt from './ConnectorArrowAlt';
import { StatusModifier } from '../../../utils';
const DefaultConnectorTerminal = (_a) => {
    var { className, edge, isTarget = true, terminalType, status } = _a, others = __rest(_a, ["className", "edge", "isTarget", "terminalType", "status"]);
    let Terminal;
    switch (terminalType) {
        case EdgeTerminalType.directional:
            Terminal = ConnectorArrow;
            break;
        case EdgeTerminalType.directionalAlt:
            Terminal = ConnectorArrowAlt;
            break;
        case EdgeTerminalType.cross:
            Terminal = ConnectorCross;
            break;
        case EdgeTerminalType.square:
            Terminal = ConnectorSquare;
            break;
        case EdgeTerminalType.circle:
            Terminal = ConnectorCircle;
            break;
        default:
            return null;
    }
    if (!Terminal) {
        return null;
    }
    const bendPoints = edge.getBendpoints();
    const startPoint = isTarget ? _.last(bendPoints) || edge.getStartPoint() : _.head(bendPoints) || edge.getEndPoint();
    const endPoint = isTarget ? edge.getEndPoint() : edge.getStartPoint();
    const classes = css(styles.topologyEdge, className, StatusModifier[status]);
    return React.createElement(Terminal, Object.assign({ className: classes, startPoint: startPoint, endPoint: endPoint, isTarget: isTarget }, others));
};
export default observer(DefaultConnectorTerminal);
//# sourceMappingURL=DefaultConnectorTerminal.js.map