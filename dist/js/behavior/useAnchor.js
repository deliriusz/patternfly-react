"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.withAnchor = exports.useAnchor = void 0;
const tslib_1 = require("tslib");
const React = tslib_1.__importStar(require("react"));
const mobx_1 = require("mobx");
const mobx_react_1 = require("mobx-react");
const types_1 = require("../types");
const ElementContext_1 = tslib_1.__importDefault(require("../utils/ElementContext"));
const useAnchor = (anchorCallback, end = types_1.AnchorEnd.both, type) => {
    const element = React.useContext(ElementContext_1.default);
    if (!types_1.isNode(element)) {
        throw new Error('useAnchor must be used within the scope of a Node');
    }
    React.useEffect(() => {
        mobx_1.runInAction(() => {
            const anchor = anchorCallback.prototype ? new anchorCallback(element) : anchorCallback(element);
            if (anchor) {
                element.setAnchor(anchor, end, type);
            }
        });
    }, [anchorCallback, element, end, type]);
};
exports.useAnchor = useAnchor;
const withAnchor = (anchor, end, type) => (WrappedComponent) => {
    const Component = props => {
        exports.useAnchor(React.useCallback(() => anchor, []), end, type);
        return React.createElement(WrappedComponent, Object.assign({}, props));
    };
    Component.displayName = `withAnchor(${WrappedComponent.displayName || WrappedComponent.name})`;
    return mobx_react_1.observer(Component);
};
exports.withAnchor = withAnchor;
//# sourceMappingURL=useAnchor.js.map