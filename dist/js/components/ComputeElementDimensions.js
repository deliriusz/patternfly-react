"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.InternalComputeElementDimensions = void 0;
const tslib_1 = require("tslib");
const React = tslib_1.__importStar(require("react"));
const mobx_1 = require("mobx");
const mobx_react_1 = require("mobx-react");
const Dimensions_1 = tslib_1.__importDefault(require("../geom/Dimensions"));
const ComputeElementDimensions = ({ element, children }) => {
    const gRef = React.useRef(null);
    React.useEffect(() => {
        if (gRef.current && !element.isDimensionsInitialized()) {
            const { width, height } = gRef.current.getBBox();
            mobx_1.action(() => element.setDimensions(new Dimensions_1.default(width, height)))();
        }
    }, [element]);
    // render an invisible node
    return (React.createElement("g", { ref: gRef, style: { visibility: 'hidden' } }, children));
};
// export for testing
exports.InternalComputeElementDimensions = ComputeElementDimensions;
exports.default = mobx_react_1.observer(ComputeElementDimensions);
//# sourceMappingURL=ComputeElementDimensions.js.map