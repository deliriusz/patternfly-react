"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const React = tslib_1.__importStar(require("react"));
const mobx_react_1 = require("mobx-react");
const mobx_1 = require("mobx");
const ElementContext_1 = tslib_1.__importDefault(require("../utils/ElementContext"));
const types_1 = require("../types");
const const_1 = require("../const");
const ComputeElementDimensions_1 = tslib_1.__importDefault(require("./ComputeElementDimensions"));
const useDndManager_1 = require("../behavior/useDndManager");
const NodeElementComponent = mobx_react_1.observer(({ element }) => {
    const dndManager = useDndManager_1.useDndManager();
    const isDragging = dndManager.isDragging();
    const dragItem = dndManager.getItem();
    const controller = element.getController();
    const isVisible = React.useMemo(() => mobx_1.computed(() => controller.shouldRenderNode(element)), [element, controller]);
    if (isVisible.get() || (isDragging && dragItem === element)) {
        return React.createElement(ElementComponent, { element: element });
    }
    return null;
});
// in a separate component so that changes to behaviors do not re-render children
const ElementComponent = mobx_react_1.observer(({ element }) => {
    const kind = element.getKind();
    const type = element.getType();
    const controller = element.getController();
    const Component = React.useMemo(() => controller.getComponent(kind, type), [controller, kind, type]);
    return (React.createElement(ElementContext_1.default.Provider, { value: element },
        React.createElement(Component, Object.assign({}, element.getState(), { element: element }))));
});
const ElementChildren = mobx_react_1.observer(({ element }) => (React.createElement(React.Fragment, null,
    element
        .getChildren()
        .filter(types_1.isEdge)
        .map(e => (React.createElement(ElementWrapper, { key: e.getId(), element: e }))),
    element
        .getChildren()
        .filter(types_1.isNode)
        .map(e => (React.createElement(ElementWrapper, { key: e.getId(), element: e }))))));
const ElementWrapper = mobx_react_1.observer(({ element }) => {
    if (!element.isVisible()) {
        if (!types_1.isNode(element) || element.isDimensionsInitialized()) {
            return null;
        }
    }
    if (types_1.isEdge(element)) {
        const source = element.getSourceAnchorNode();
        const target = element.getTargetAnchorNode();
        if ((source && !source.isVisible()) || (target && !target.isVisible())) {
            return null;
        }
    }
    const commonAttrs = {
        [const_1.ATTR_DATA_ID]: element.getId(),
        [const_1.ATTR_DATA_KIND]: element.getKind(),
        [const_1.ATTR_DATA_TYPE]: element.getType()
    };
    if (types_1.isGraph(element)) {
        return (React.createElement("g", Object.assign({}, commonAttrs),
            React.createElement(ElementComponent, { element: element })));
    }
    if (types_1.isNode(element)) {
        if (!element.isDimensionsInitialized()) {
            return (React.createElement(ComputeElementDimensions_1.default, { element: element },
                React.createElement(ElementComponent, { element: element }),
                React.createElement(ElementChildren, { element: element })));
        }
        if (!element.isGroup() || element.isCollapsed()) {
            const { x, y } = element.getPosition();
            return (React.createElement("g", Object.assign({}, commonAttrs, { transform: `translate(${x}, ${y})` }),
                React.createElement(NodeElementComponent, { element: element }),
                React.createElement(ElementChildren, { element: element })));
        }
        return (React.createElement("g", Object.assign({}, commonAttrs),
            React.createElement(NodeElementComponent, { element: element }),
            React.createElement(ElementChildren, { element: element })));
    }
    return (React.createElement("g", Object.assign({}, commonAttrs),
        React.createElement(ElementComponent, { element: element }),
        React.createElement(ElementChildren, { element: element })));
});
exports.default = ElementWrapper;
//# sourceMappingURL=ElementWrapper.js.map