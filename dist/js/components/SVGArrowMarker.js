"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const React = tslib_1.__importStar(require("react"));
const SVGDefs_1 = tslib_1.__importDefault(require("./defs/SVGDefs"));
// workaround to pass docs building
if (!global.SVGElement) {
    global.SVGElement = global.Element;
}
const SVGArrowMarker = ({ id, nodeSize, markerSize, className }) => (React.createElement(SVGDefs_1.default, { id: id },
    React.createElement("marker", { id: id, markerWidth: markerSize, markerHeight: markerSize, refX: nodeSize / 2 + markerSize - 1, refY: markerSize / 2, orient: "auto", markerUnits: "userSpaceOnUse" },
        React.createElement("path", { d: `M0,0 L0,${markerSize} L${markerSize},${markerSize / 2} z`, className: className }))));
exports.default = SVGArrowMarker;
//# sourceMappingURL=SVGArrowMarker.js.map