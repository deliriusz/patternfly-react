import * as React from 'react';
import { runInAction } from 'mobx';
import { isNode, AnchorEnd } from '../types';
import ElementContext from '../utils/ElementContext';
import PolygonAnchor from '../anchors/PolygonAnchor';
export const usePolygonAnchor = (points, end = AnchorEnd.both, type = '') => {
    const element = React.useContext(ElementContext);
    if (!isNode(element)) {
        throw new Error('usePolygonAnchor must be used within the scope of a Node');
    }
    React.useEffect(() => {
        runInAction(() => {
            if (points) {
                const anchor = new PolygonAnchor(element);
                anchor.setPoints(points);
                element.setAnchor(anchor, end, type);
            }
        });
    }, [points, end, type, element]);
};
export const withPolygonAnchor = (getPoints, end, type) => (WrappedComponent) => {
    const element = React.useContext(ElementContext);
    const Component = props => {
        usePolygonAnchor(getPoints(element), end, type);
        return React.createElement(WrappedComponent, Object.assign({}, props));
    };
    Component.displayName = `withPolygonAnchor(${WrappedComponent.displayName || WrappedComponent.name})`;
    return Component;
};
//# sourceMappingURL=usePolygonAnchor.js.map