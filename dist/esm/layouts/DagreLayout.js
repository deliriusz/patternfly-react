import * as dagre from 'dagre';
import * as _ from 'lodash';
import { BaseLayout, LAYOUT_DEFAULTS } from './BaseLayout';
import { DagreNode } from './DagreNode';
import { DagreGroup } from './DagreGroup';
import { DagreLink } from './DagreLink';
export class DagreLayout extends BaseLayout {
    constructor(graph, options) {
        super(graph, options);
        this.dagreOptions = Object.assign(Object.assign(Object.assign({}, this.options), { layoutOnDrag: false, marginx: 0, marginy: 0, nodesep: this.options.nodeDistance, edgesep: this.options.linkDistance, ranker: 'tight-tree', rankdir: 'TB' }), options);
    }
    createLayoutNode(node, nodeDistance, index) {
        return new DagreNode(node, nodeDistance, index);
    }
    createLayoutLink(edge, source, target, isFalse) {
        return new DagreLink(edge, source, target, isFalse);
    }
    createLayoutGroup(node, padding, index) {
        return new DagreGroup(node, padding, index);
    }
    updateEdgeBendpoints(edges) {
        _.forEach(edges, edge => {
            const link = edge;
            link.updateBendpoints();
        });
    }
    getFauxEdges() {
        return [];
    }
    startLayout(graph, initialRun, addingNodes) {
        if (initialRun || addingNodes) {
            const dagreGraph = new dagre.graphlib.Graph({ compound: true });
            dagreGraph.setGraph(_.omit(this.dagreOptions, Object.keys(LAYOUT_DEFAULTS)));
            if (!this.dagreOptions.ignoreGroups) {
                _.forEach(this.groups, group => {
                    dagreGraph.setNode(group.id, group);
                    dagreGraph.setParent(group.id, group.element.getParent().getId());
                });
            }
            const updatedNodes = [];
            _.forEach(this.nodes, node => {
                const updateNode = node.getUpdatableNode();
                updatedNodes.push(updateNode);
                dagreGraph.setNode(node.id, updateNode);
                if (!this.dagreOptions.ignoreGroups) {
                    dagreGraph.setParent(node.id, node.element.getParent().getId());
                }
            });
            _.forEach(this.edges, dagreEdge => {
                dagreGraph.setEdge(dagreEdge.source.id, dagreEdge.target.id, dagreEdge);
            });
            dagre.layout(dagreGraph);
            this.nodes.forEach(node => {
                node.updateToNode(dagreGraph.node(node.id));
            });
            this.updateEdgeBendpoints(this.edges);
        }
        if (this.dagreOptions.layoutOnDrag) {
            this.forceSimulation.useForceSimulation(this.nodes, this.edges, this.getFixedNodeDistance);
        }
    }
}
//# sourceMappingURL=DagreLayout.js.map