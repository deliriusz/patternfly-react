"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.withRemoveConnector = void 0;
const tslib_1 = require("tslib");
const React = tslib_1.__importStar(require("react"));
const mobx_react_1 = require("mobx-react");
const DefaultRemoveConnector_1 = tslib_1.__importDefault(require("../components/DefaultRemoveConnector"));
const defaultRenderRemove = (edge, onRemove) => {
    const removeEdge = () => {
        onRemove(edge);
    };
    return (React.createElement(DefaultRemoveConnector_1.default, { startPoint: edge.getStartPoint(), endPoint: edge.getEndPoint(), onRemove: removeEdge }));
};
const withRemoveConnector = (onRemove, renderRemove = defaultRenderRemove) => (WrappedComponent) => {
    const Component = props => {
        const [show, setShow] = React.useState(false);
        const onShowRemoveConnector = React.useCallback(() => setShow(true), []);
        const onHideRemoveConnector = React.useCallback(() => setShow(false), []);
        return (React.createElement(WrappedComponent, Object.assign({}, props, { onShowRemoveConnector: onShowRemoveConnector, onHideRemoveConnector: onHideRemoveConnector }), show && renderRemove(props.element, onRemove)));
    };
    Component.displayName = `withRemoveConnector(${WrappedComponent.displayName || WrappedComponent.name})`;
    return mobx_react_1.observer(Component);
};
exports.withRemoveConnector = withRemoveConnector;
//# sourceMappingURL=withRemoveConnector.js.map