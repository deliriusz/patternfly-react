import * as React from 'react';
import Point from '../geom/Point';
import { Graph, Node } from '../types';
import { DragEvent, DragObjectWithType, DragOperationWithType } from './dnd-types';
export declare const CREATE_CONNECTOR_OPERATION = "#createconnector#";
export declare const CREATE_CONNECTOR_DROP_TYPE = "#createConnector#";
export interface ConnectorChoice {
    label: string;
}
export interface CreateConnectorOptions {
    handleAngle?: number;
    handleAngleTop?: number;
    handleLength?: number;
    dragItem?: DragObjectWithType;
    dragOperation?: DragOperationWithType;
    hideConnectorMenu?: boolean;
}
interface ConnectorComponentProps {
    startPoint: Point;
    endPoint: Point;
    hints: string[];
    dragging: boolean;
    hover?: boolean;
}
declare type CreateConnectorRenderer = React.ComponentType<ConnectorComponentProps>;
declare type OnCreateResult = ConnectorChoice[] | void | undefined | null | React.ReactElement[];
declare type CreateConnectorWidgetProps = {
    element: Node;
    onKeepAlive: (isAlive: boolean) => void;
    onCreate: (element: Node, target: Node | Graph, event: DragEvent, dropHints?: string[] | undefined, choice?: ConnectorChoice) => Promise<OnCreateResult> | OnCreateResult;
    ConnectorComponent: CreateConnectorRenderer;
    contextMenuClass?: string;
} & CreateConnectorOptions;
declare const CreateConnectorWidget: React.FunctionComponent<CreateConnectorWidgetProps>;
interface ElementProps {
    element: Node;
}
export interface WithCreateConnectorProps {
    onShowCreateConnector: () => void;
    onHideCreateConnector: () => void;
}
export declare const withCreateConnector: <P extends WithCreateConnectorProps & ElementProps>(onCreate: React.ComponentProps<typeof CreateConnectorWidget>['onCreate'], ConnectorComponent?: CreateConnectorRenderer, contextMenuClass?: string, options?: CreateConnectorOptions) => (WrappedComponent: React.ComponentType<Partial<P>>) => React.FunctionComponent<Omit<P, keyof WithCreateConnectorProps>>;
export {};
//# sourceMappingURL=withCreateConnector.d.ts.map