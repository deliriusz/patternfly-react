import * as React from 'react';
import { observer } from 'mobx-react';
import ElementContext from '../utils/ElementContext';
import ContextMenu from '../components/contextmenu/ContextMenu';
export const withContextMenu = (actions, container, className, atPoint = true) => (WrappedComponent) => {
    const Component = props => {
        const element = React.useContext(ElementContext);
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
            reference ? (React.createElement(ContextMenu, { reference: reference, container: container, className: className, open: true, onRequestClose: () => setReference(null) }, actions(element))) : null));
    };
    Component.displayName = `withContextMenu(${WrappedComponent.displayName || WrappedComponent.name})`;
    return observer(Component);
};
//# sourceMappingURL=withContextMenu.js.map