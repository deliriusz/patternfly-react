import * as React from 'react';
import { observer } from 'mobx-react';
import { computed } from 'mobx';
import ElementContext from '../utils/ElementContext';
import { isGraph, isEdge, isNode } from '../types';
import { ATTR_DATA_ID, ATTR_DATA_KIND, ATTR_DATA_TYPE } from '../const';
import ComputeElementDimensions from './ComputeElementDimensions';
import { useDndManager } from '../behavior/useDndManager';
const NodeElementComponent = observer(({ element }) => {
    const dndManager = useDndManager();
    const isDragging = dndManager.isDragging();
    const dragItem = dndManager.getItem();
    const controller = element.getController();
    const isVisible = React.useMemo(() => computed(() => controller.shouldRenderNode(element)), [element, controller]);
    if (isVisible.get() || (isDragging && dragItem === element)) {
        return React.createElement(ElementComponent, { element: element });
    }
    return null;
});
// in a separate component so that changes to behaviors do not re-render children
const ElementComponent = observer(({ element }) => {
    const kind = element.getKind();
    const type = element.getType();
    const controller = element.getController();
    const Component = React.useMemo(() => controller.getComponent(kind, type), [controller, kind, type]);
    return (React.createElement(ElementContext.Provider, { value: element },
        React.createElement(Component, Object.assign({}, element.getState(), { element: element }))));
});
const ElementChildren = observer(({ element }) => (React.createElement(React.Fragment, null,
    element
        .getChildren()
        .filter(isEdge)
        .map(e => (React.createElement(ElementWrapper, { key: e.getId(), element: e }))),
    element
        .getChildren()
        .filter(isNode)
        .map(e => (React.createElement(ElementWrapper, { key: e.getId(), element: e }))))));
const ElementWrapper = observer(({ element }) => {
    if (!element.isVisible()) {
        if (!isNode(element) || element.isDimensionsInitialized()) {
            return null;
        }
    }
    if (isEdge(element)) {
        const source = element.getSourceAnchorNode();
        const target = element.getTargetAnchorNode();
        if ((source && !source.isVisible()) || (target && !target.isVisible())) {
            return null;
        }
    }
    const commonAttrs = {
        [ATTR_DATA_ID]: element.getId(),
        [ATTR_DATA_KIND]: element.getKind(),
        [ATTR_DATA_TYPE]: element.getType()
    };
    if (isGraph(element)) {
        return (React.createElement("g", Object.assign({}, commonAttrs),
            React.createElement(ElementComponent, { element: element })));
    }
    if (isNode(element)) {
        if (!element.isDimensionsInitialized()) {
            return (React.createElement(ComputeElementDimensions, { element: element },
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
export default ElementWrapper;
//# sourceMappingURL=ElementWrapper.js.map