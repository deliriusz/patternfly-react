import * as React from 'react';
import { action } from 'mobx';
import { isNode, AnchorEnd } from '../types';
import ElementContext from '../utils/ElementContext';
import SVGAnchor from '../anchors/SVGAnchor';
export const useSvgAnchor = (end = AnchorEnd.both, type = '') => {
    const element = React.useContext(ElementContext);
    if (!isNode(element)) {
        throw new Error('useSvgAnchor must be used within the scope of a Node');
    }
    const setAnchorSvgRef = React.useCallback(action((node) => {
        if (node) {
            const anchor = new SVGAnchor(element);
            anchor.setSVGElement(node);
            element.setAnchor(anchor, end, type);
        }
    }), [element, type, end]);
    return setAnchorSvgRef;
};
export const withSvgAnchor = (end, type) => () => (WrappedComponent) => {
    const Component = props => {
        const svgAnchorRef = useSvgAnchor(end, type);
        return React.createElement(WrappedComponent, Object.assign({}, props, { svgAnchorRef: svgAnchorRef }));
    };
    Component.displayName = `withSvgAnchor(${WrappedComponent.displayName || WrappedComponent.name})`;
    return Component;
};
//# sourceMappingURL=useSvgAnchor.js.map