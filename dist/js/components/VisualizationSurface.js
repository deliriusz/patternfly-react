"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const React = tslib_1.__importStar(require("react"));
const _ = tslib_1.__importStar(require("lodash"));
const mobx_1 = require("mobx");
// https://github.com/mobxjs/mobx-react#observer-batching
require("mobx-react/batchingForReactDom");
const mobx_react_1 = require("mobx-react");
const react_measure_1 = tslib_1.__importDefault(require("react-measure"));
const react_styles_1 = require("@patternfly/react-styles");
const topology_components_1 = tslib_1.__importDefault(require("@patternfly/react-styles/css/components/Topology/topology-components"));
const SVGDefsProvider_1 = tslib_1.__importDefault(require("./defs/SVGDefsProvider"));
const ElementWrapper_1 = tslib_1.__importDefault(require("./ElementWrapper"));
const Dimensions_1 = tslib_1.__importDefault(require("../geom/Dimensions"));
const useVisualizationController_1 = tslib_1.__importDefault(require("../hooks/useVisualizationController"));
require("@patternfly/react-styles/css/components/Topology/topology-components.css");
const stopEvent = (e) => {
    e.preventDefault();
    e.stopPropagation();
};
const VisualizationSurface = ({ state }) => {
    const controller = useVisualizationController_1.default();
    React.useEffect(() => {
        state && controller.setState(state);
    }, [controller, state]);
    const onMeasure = React.useMemo(() => _.debounce(mobx_1.action((contentRect) => {
        controller.getGraph().setDimensions(new Dimensions_1.default(contentRect.client.width, contentRect.client.height));
    }), 100, { leading: true, trailing: true }), [controller]);
    // dispose of onMeasure
    React.useEffect(() => () => onMeasure.cancel(), [onMeasure]);
    if (!controller.hasGraph()) {
        return null;
    }
    const graph = controller.getGraph();
    return (React.createElement(react_measure_1.default, { client: true, onResize: onMeasure }, ({ measureRef }) => (
    // render an outer div because react-measure doesn't seem to fire events properly on svg resize
    React.createElement("div", { "data-test-id": "topology", className: react_styles_1.css(topology_components_1.default.topologyVisualizationSurface), ref: measureRef },
        React.createElement("svg", { className: react_styles_1.css(topology_components_1.default.topologyVisualizationSurfaceSvg), onContextMenu: stopEvent },
            React.createElement(SVGDefsProvider_1.default, null,
                React.createElement(ElementWrapper_1.default, { element: graph })))))));
};
exports.default = mobx_react_1.observer(VisualizationSurface);
//# sourceMappingURL=VisualizationSurface.js.map