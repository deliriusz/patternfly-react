"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const React = tslib_1.__importStar(require("react"));
const react_styles_1 = require("@patternfly/react-styles");
const topology_components_1 = tslib_1.__importDefault(require("@patternfly/react-styles/css/components/Topology/topology-components"));
const SvgDropShadowFilter_1 = tslib_1.__importDefault(require("../svg/SvgDropShadowFilter"));
const utils_1 = require("../../utils");
const nodes_1 = require("../nodes");
const HOVER_FILTER_ID = 'DecoratorDropShadowHoverFilterId';
const Decorator = ({ className, x, y, showBackground, radius, padding = nodes_1.DEFAULT_DECORATOR_PADDING, children, icon, onClick, ariaLabel, circleRef }) => {
    const [hover, hoverRef] = utils_1.useHover();
    const iconRadius = radius - padding;
    return (React.createElement("g", Object.assign({ ref: hoverRef, className: react_styles_1.css(topology_components_1.default.topologyNodeDecorator, className) }, (onClick
        ? {
            onClick: e => {
                e.stopPropagation();
                onClick(e);
            },
            role: 'button',
            'aria-label': ariaLabel
        }
        : null)),
        React.createElement(SvgDropShadowFilter_1.default, { id: HOVER_FILTER_ID, dy: 3, stdDeviation: 5, floodOpacity: 0.5 }),
        showBackground && (React.createElement("circle", { key: hover ? 'circle-hover' : 'circle', ref: circleRef, className: react_styles_1.css(topology_components_1.default.topologyNodeDecoratorBg), cx: x, cy: y, r: radius, filter: hover ? utils_1.createSvgIdUrl(HOVER_FILTER_ID) : undefined })),
        React.createElement("g", { transform: `translate(${x}, ${y})` },
            icon ? (React.createElement("g", { className: react_styles_1.css(topology_components_1.default.topologyNodeDecoratorIcon), style: { fontSize: `${iconRadius * 2}px` }, transform: `translate(-${iconRadius}, -${iconRadius})` }, icon)) : null,
            children)));
};
exports.default = Decorator;
//# sourceMappingURL=Decorator.js.map