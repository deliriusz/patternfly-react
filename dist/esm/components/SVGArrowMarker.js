import * as React from 'react';
import SVGDefs from './defs/SVGDefs';
// workaround to pass docs building
if (!global.SVGElement) {
    global.SVGElement = global.Element;
}
const SVGArrowMarker = ({ id, nodeSize, markerSize, className }) => (React.createElement(SVGDefs, { id: id },
    React.createElement("marker", { id: id, markerWidth: markerSize, markerHeight: markerSize, refX: nodeSize / 2 + markerSize - 1, refY: markerSize / 2, orient: "auto", markerUnits: "userSpaceOnUse" },
        React.createElement("path", { d: `M0,0 L0,${markerSize} L${markerSize},${markerSize / 2} z`, className: className }))));
export default SVGArrowMarker;
//# sourceMappingURL=SVGArrowMarker.js.map