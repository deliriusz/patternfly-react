import * as React from 'react';
import { observer } from 'mobx-react';
import DefaultRemoveConnector from '../components/DefaultRemoveConnector';
const defaultRenderRemove = (edge, onRemove) => {
    const removeEdge = () => {
        onRemove(edge);
    };
    return (React.createElement(DefaultRemoveConnector, { startPoint: edge.getStartPoint(), endPoint: edge.getEndPoint(), onRemove: removeEdge }));
};
export const withRemoveConnector = (onRemove, renderRemove = defaultRenderRemove) => (WrappedComponent) => {
    const Component = props => {
        const [show, setShow] = React.useState(false);
        const onShowRemoveConnector = React.useCallback(() => setShow(true), []);
        const onHideRemoveConnector = React.useCallback(() => setShow(false), []);
        return (React.createElement(WrappedComponent, Object.assign({}, props, { onShowRemoveConnector: onShowRemoveConnector, onHideRemoveConnector: onHideRemoveConnector }), show && renderRemove(props.element, onRemove)));
    };
    Component.displayName = `withRemoveConnector(${WrappedComponent.displayName || WrappedComponent.name})`;
    return observer(Component);
};
//# sourceMappingURL=withRemoveConnector.js.map