import * as React from 'react';
import { runInAction } from 'mobx';
import { observer } from 'mobx-react';
import { isNode, AnchorEnd } from '../types';
import ElementContext from '../utils/ElementContext';
export const useAnchor = (anchorCallback, end = AnchorEnd.both, type) => {
    const element = React.useContext(ElementContext);
    if (!isNode(element)) {
        throw new Error('useAnchor must be used within the scope of a Node');
    }
    React.useEffect(() => {
        runInAction(() => {
            const anchor = anchorCallback.prototype ? new anchorCallback(element) : anchorCallback(element);
            if (anchor) {
                element.setAnchor(anchor, end, type);
            }
        });
    }, [anchorCallback, element, end, type]);
};
export const withAnchor = (anchor, end, type) => (WrappedComponent) => {
    const Component = props => {
        useAnchor(React.useCallback(() => anchor, []), end, type);
        return React.createElement(WrappedComponent, Object.assign({}, props));
    };
    Component.displayName = `withAnchor(${WrappedComponent.displayName || WrappedComponent.name})`;
    return observer(Component);
};
//# sourceMappingURL=useAnchor.js.map