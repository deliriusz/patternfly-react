"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.withContextMenu = void 0;
const tslib_1 = require("tslib");
const React = tslib_1.__importStar(require("react"));
const mobx_react_1 = require("mobx-react");
const ElementContext_1 = tslib_1.__importDefault(require("../utils/ElementContext"));
const ContextMenu_1 = tslib_1.__importDefault(require("../components/contextmenu/ContextMenu"));
const withContextMenu = (actions, container, className, atPoint = true) => (WrappedComponent) => {
    const Component = props => {
        const element = React.useContext(ElementContext_1.default);
        const [reference, setReference] = React.useState(null);
        const onContextMenu = React.useCallback((e) => {
            e.preventDefault();
            e.stopPropagation();
            setReference(atPoint
                ? {
                    x: e.pageX,
                    y: e.pageY
                }
                : e.currentTarget);
        }, []);
        return (React.createElement(React.Fragment, null,
            React.createElement(WrappedComponent, Object.assign({}, props, { onContextMenu: onContextMenu, contextMenuOpen: !!reference })),
            reference ? (React.createElement(ContextMenu_1.default, { reference: reference, container: container, className: className, open: true, onRequestClose: () => setReference(null) }, actions(element))) : null));
    };
    Component.displayName = `withContextMenu(${WrappedComponent.displayName || WrappedComponent.name})`;
    return mobx_react_1.observer(Component);
};
exports.withContextMenu = withContextMenu;
//# sourceMappingURL=withContextMenu.js.map