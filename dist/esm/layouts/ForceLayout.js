import { getGroupPadding } from '../utils/element-utils';
import { BaseLayout } from '.';
import { LayoutLink } from './LayoutLink';
export class ForceLayout extends BaseLayout {
    constructor(graph, options) {
        super(graph, Object.assign(Object.assign({}, options), { layoutOnDrag: true, onSimulationEnd: () => {
                this.nodes.forEach(n => n.setFixed(false));
            } }));
        this.getLinkDistance = (e) => {
            let distance = this.options.linkDistance + e.source.radius + e.target.radius;
            const isFalse = e instanceof LayoutLink && e.isFalse;
            if (!isFalse && e.source.element.getParent() !== e.target.element.getParent()) {
                // find the group padding
                distance += getGroupPadding(e.source.element.getParent());
                distance += getGroupPadding(e.target.element.getParent());
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
//# sourceMappingURL=ForceLayout.js.map