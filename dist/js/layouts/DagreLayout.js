"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DagreLayout = void 0;
const tslib_1 = require("tslib");
const dagre = tslib_1.__importStar(require("dagre"));
const _ = tslib_1.__importStar(require("lodash"));
const BaseLayout_1 = require("./BaseLayout");
const DagreNode_1 = require("./DagreNode");
const DagreGroup_1 = require("./DagreGroup");
const DagreLink_1 = require("./DagreLink");
class DagreLayout extends BaseLayout_1.BaseLayout {
    constructor(graph, options) {
        super(graph, options);
        this.dagreOptions = Object.assign(Object.assign(Object.assign({}, this.options), { layoutOnDrag: false, marginx: 0, marginy: 0, nodesep: this.options.nodeDistance, edgesep: this.options.linkDistance, ranker: 'tight-tree', rankdir: 'TB' }), options);
    }
    createLayoutNode(node, nodeDistance, index) {
        return new DagreNode_1.DagreNode(node, nodeDistance, index);
    }
    createLayoutLink(edge, source, target, isFalse) {
        return new DagreLink_1.DagreLink(edge, source, target, isFalse);
    }
    createLayoutGroup(node, padding, index) {
        return new DagreGroup_1.DagreGroup(node, padding, index);
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
            dagreGraph.setGraph(_.omit(this.dagreOptions, Object.keys(BaseLayout_1.LAYOUT_DEFAULTS)));
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
exports.DagreLayout = DagreLayout;
//# sourceMappingURL=DagreLayout.js.map