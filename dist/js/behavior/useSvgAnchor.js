"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.withSvgAnchor = exports.useSvgAnchor = void 0;
const tslib_1 = require("tslib");
const React = tslib_1.__importStar(require("react"));
const mobx_1 = require("mobx");
const types_1 = require("../types");
const ElementContext_1 = tslib_1.__importDefault(require("../utils/ElementContext"));
const SVGAnchor_1 = tslib_1.__importDefault(require("../anchors/SVGAnchor"));
const useSvgAnchor = (end = types_1.AnchorEnd.both, type = '') => {
    const element = React.useContext(ElementContext_1.default);
    if (!types_1.isNode(element)) {
        throw new Error('useSvgAnchor must be used within the scope of a Node');
    }
    const setAnchorSvgRef = React.useCallback(mobx_1.action((node) => {
        if (node) {
            const anchor = new SVGAnchor_1.default(element);
            anchor.setSVGElement(node);
            element.setAnchor(anchor, end, type);
        }
    }), [element, type, end]);
    return setAnchorSvgRef;
};
exports.useSvgAnchor = useSvgAnchor;
const withSvgAnchor = (end, type) => () => (WrappedComponent) => {
    const Component = props => {
        const svgAnchorRef = exports.useSvgAnchor(end, type);
        return React.createElement(WrappedComponent, Object.assign({}, props, { svgAnchorRef: svgAnchorRef }));
    };
    Component.displayName = `withSvgAnchor(${WrappedComponent.displayName || WrappedComponent.name})`;
    return Component;
};
exports.withSvgAnchor = withSvgAnchor;
//# sourceMappingURL=useSvgAnchor.js.map