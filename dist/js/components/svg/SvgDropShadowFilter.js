"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const React = tslib_1.__importStar(require("react"));
// eslint-disable-next-line patternfly-react/import-tokens-icons
const global_palette_black_1000_1 = require("@patternfly/react-tokens/dist/js/global_palette_black_1000");
const defs_1 = require("../defs");
const SvgDropShadowFilter = ({ id, dx = 0, dy = 1, stdDeviation = 2, floodColor = global_palette_black_1000_1.global_palette_black_1000.value, floodOpacity = 0.2 }) => {
    if (window.navigator.userAgent.includes('Edge')) {
        // feDropShadow is not supported by Edge
        return (React.createElement(defs_1.SVGDefs, { id: id },
            React.createElement("filter", { id: id, x: `-${stdDeviation * 12.5}%`, y: `-${stdDeviation * 12.5}%`, width: `${100 + stdDeviation * 25}%`, height: `${100 + stdDeviation * 25}%` },
                React.createElement("feGaussianBlur", { in: "SourceAlpha", stdDeviation: stdDeviation }),
                React.createElement("feOffset", { dx: dx, dy: dy, result: "offsetblur" }),
                React.createElement("feFlood", { floodColor: floodColor, floodOpacity: floodOpacity }),
                React.createElement("feComposite", { in2: "offsetblur", operator: "in" }),
                React.createElement("feMerge", null,
                    React.createElement("feMergeNode", null),
                    React.createElement("feMergeNode", { in: "SourceGraphic" })))));
    }
    return (React.createElement(defs_1.SVGDefs, { id: id },
        React.createElement("filter", { id: id, x: `-${stdDeviation * 12.5}%`, y: `-${stdDeviation * 12.5}%`, width: `${100 + stdDeviation * 25}%`, height: `${100 + stdDeviation * 25}%` },
            React.createElement("feDropShadow", { dx: dx, dy: dy, stdDeviation: stdDeviation, floodColor: floodColor, floodOpacity: floodOpacity }))));
};
exports.default = SvgDropShadowFilter;
//# sourceMappingURL=SvgDropShadowFilter.js.map