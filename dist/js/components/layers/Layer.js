"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const React = tslib_1.__importStar(require("react"));
const mobx_react_1 = require("mobx-react");
const react_dom_1 = require("react-dom");
const ElementContext_1 = tslib_1.__importDefault(require("../../utils/ElementContext"));
const LayersContext_1 = tslib_1.__importDefault(require("./LayersContext"));
const LayerContainer_1 = tslib_1.__importDefault(require("./LayerContainer"));
const ORDER_KEY = '__order__';
const compare = (a, b) => {
    if (a === b) {
        return 0;
    }
    const ao = a[ORDER_KEY];
    const bo = b[ORDER_KEY];
    if (ao == null || bo == null) {
        return 0;
    }
    for (let i = 0; i < ao.length; i++) {
        if (ao[i] !== bo[i]) {
            return ao[i] - bo[i];
        }
    }
    return ao.length === bo.length ? 0 : ao.length - bo.length;
};
const LayerDelegate = mobx_react_1.observer(({ id, children, orderKey }) => {
    const getLayerNode = React.useContext(LayersContext_1.default);
    const layerNode = getLayerNode(id);
    const element = React.useContext(ElementContext_1.default);
    const nodeRef = React.useRef(null);
    let order;
    if (id && orderKey == null) {
        order = element.getOrderKey();
    }
    else if (id) {
        order = orderKey;
    }
    React.useEffect(() => {
        // TODO use bisection search
        if (nodeRef.current && layerNode != null) {
            nodeRef.current[ORDER_KEY] = order;
            const { childNodes } = layerNode;
            // childNodes is not an array, disable false positive
            // eslint-disable-next-line @typescript-eslint/prefer-for-of
            for (let i = 0; i < childNodes.length; i++) {
                const result = compare(nodeRef.current, childNodes[i]);
                if (result < 0) {
                    if (i > 0 && childNodes[i - 1] !== nodeRef.current) {
                        layerNode.insertBefore(nodeRef.current, childNodes[i]);
                    }
                    return;
                }
            }
            if (childNodes[childNodes.length - 1] !== nodeRef.current) {
                layerNode.appendChild(nodeRef.current);
            }
        }
    }, [order, layerNode]);
    return react_dom_1.createPortal(React.createElement(LayerContainer_1.default, { ref: nodeRef }, children), layerNode);
});
const Layer = ({ id, children, orderKey }) => id ? (React.createElement(LayerDelegate, { id: id, orderKey: orderKey }, children)) : (React.createElement(React.Fragment, null, children));
exports.default = Layer;
//# sourceMappingURL=Layer.js.map