"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.withTargetDrag = exports.withSourceDrag = void 0;
const tslib_1 = require("tslib");
const React = tslib_1.__importStar(require("react"));
const mobx_react_1 = require("mobx-react");
const useDndDrag_1 = require("./useDndDrag");
const withSourceDrag = (spec) => (WrappedComponent) => {
    const Component = props => {
        // TODO fix cast to any
        const [dndDragProps, dndDragRef] = useDndDrag_1.useDndDrag(spec, props);
        return React.createElement(WrappedComponent, Object.assign({}, props, { sourceDragRef: dndDragRef }, dndDragProps));
    };
    Component.displayName = `withSourceDrag(${WrappedComponent.displayName || WrappedComponent.name})`;
    return mobx_react_1.observer(Component);
};
exports.withSourceDrag = withSourceDrag;
const withTargetDrag = (spec) => (WrappedComponent) => {
    const Component = props => {
        // TODO fix cast to any
        const [dndDragProps, dndDragRef] = useDndDrag_1.useDndDrag(spec, props);
        return React.createElement(WrappedComponent, Object.assign({}, props, { targetDragRef: dndDragRef }, dndDragProps));
    };
    Component.displayName = `withTargetDrag(${WrappedComponent.displayName || WrappedComponent.name})`;
    return mobx_react_1.observer(Component);
};
exports.withTargetDrag = withTargetDrag;
//# sourceMappingURL=useReconnect.js.map