"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const React = tslib_1.__importStar(require("react"));
const mobx_react_1 = require("mobx-react");
const ElementContext_1 = tslib_1.__importDefault(require("../../utils/ElementContext"));
const types_1 = require("../../types");
const const_1 = require("../../const");
const LayerContainer = ({ children }, ref) => {
    // accumulate parent positions
    const element = React.useContext(ElementContext_1.default);
    let p = element;
    let x = 0;
    let y = 0;
    while (types_1.isNode(p)) {
        if (!p.isGroup() || p.isCollapsed()) {
            const { x: px, y: py } = p.getPosition();
            x += px;
            y += py;
        }
        p = p.getParent();
    }
    const commonAttrs = {
        [const_1.ATTR_DATA_ID]: element.getId(),
        [const_1.ATTR_DATA_KIND]: element.getKind(),
        [const_1.ATTR_DATA_TYPE]: element.getType()
    };
    return (React.createElement("g", Object.assign({ ref: ref, transform: `translate(${x}, ${y})` }, commonAttrs), children));
};
exports.default = mobx_react_1.observer(React.forwardRef(LayerContainer));
//# sourceMappingURL=LayerContainer.js.map