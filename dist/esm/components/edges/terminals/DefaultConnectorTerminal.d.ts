import * as React from 'react';
import { Edge, EdgeTerminalType, NodeStatus } from '../../../types';
import { ConnectDragSource } from '../../../behavior/dnd-types';
interface EdgeConnectorArrowProps {
    edge: Edge;
    className?: string;
    highlight?: boolean;
    isTarget?: boolean;
    status?: NodeStatus;
    terminalType?: EdgeTerminalType;
    size?: number;
    dragRef?: ConnectDragSource;
}
declare const _default: React.FunctionComponent<EdgeConnectorArrowProps>;
export default _default;
//# sourceMappingURL=DefaultConnectorTerminal.d.ts.map