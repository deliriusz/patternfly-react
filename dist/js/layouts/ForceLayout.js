"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ForceLayout = void 0;
const element_utils_1 = require("../utils/element-utils");
const _1 = require(".");
const LayoutLink_1 = require("./LayoutLink");
class ForceLayout extends _1.BaseLayout {
    constructor(graph, options) {
        super(graph, Object.assign(Object.assign({}, options), { layoutOnDrag: true, onSimulationEnd: () => {
                this.nodes.forEach(n => n.setFixed(false));
            } }));
        this.getLinkDistance = (e) => {
            let distance = this.options.linkDistance + e.source.radius + e.target.radius;
            const isFalse = e instanceof LayoutLink_1.LayoutLink && e.isFalse;
            if (!isFalse && e.source.element.getParent() !== e.target.element.getParent()) {
                // find the group padding
                distance += element_utils_1.getGroupPadding(e.source.element.getParent());
                distance += element_utils_1.getGroupPadding(e.target.element.getParent());
            }
            return distance;
        };
    }
    startLayout(graph) {
        const { width, height } = graph.getBounds();
        const cx = width / 2;
        const cy = height / 2;
        this.forceSimulation.forceCenter(cx, cy);
        this.forceSimulation.alpha(1);
        this.forceSimulation.useForceSimulation(this.nodes, this.edges, this.getLinkDistance);
        this.forceSimulation.restart();
    }
    updateLayout() {
        this.forceSimulation.useForceSimulation(this.nodes, this.edges, this.getFixedNodeDistance);
        this.forceSimulation.alpha(0.2);
        this.forceSimulation.restart();
    }
}
exports.ForceLayout = ForceLayout;
//# sourceMappingURL=ForceLayout.js.map