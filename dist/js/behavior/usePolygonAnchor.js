"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.withPolygonAnchor = exports.usePolygonAnchor = void 0;
const tslib_1 = require("tslib");
const React = tslib_1.__importStar(require("react"));
const mobx_1 = require("mobx");
const types_1 = require("../types");
const ElementContext_1 = tslib_1.__importDefault(require("../utils/ElementContext"));
const PolygonAnchor_1 = tslib_1.__importDefault(require("../anchors/PolygonAnchor"));
const usePolygonAnchor = (points, end = types_1.AnchorEnd.both, type = '') => {
    const element = React.useContext(ElementContext_1.default);
    if (!types_1.isNode(element)) {
        throw new Error('usePolygonAnchor must be used within the scope of a Node');
    }
    React.useEffect(() => {
        mobx_1.runInAction(() => {
            if (points) {
                const anchor = new PolygonAnchor_1.default(element);
                anchor.setPoints(points);
                element.setAnchor(anchor, end, type);
            }
        });
    }, [points, end, type, element]);
};
exports.usePolygonAnchor = usePolygonAnchor;
const withPolygonAnchor = (getPoints, end, type) => (WrappedComponent) => {
    const element = React.useContext(ElementContext_1.default);
    const Component = props => {
        exports.usePolygonAnchor(getPoints(element), end, type);
        return React.createElement(WrappedComponent, Object.assign({}, props));
    };
    Component.displayName = `withPolygonAnchor(${WrappedComponent.displayName || WrappedComponent.name})`;
    return Component;
};
exports.withPolygonAnchor = withPolygonAnchor;
//# sourceMappingURL=usePolygonAnchor.js.map