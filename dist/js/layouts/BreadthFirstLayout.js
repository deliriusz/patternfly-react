"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BreadthFirstLayout = void 0;
const BaseLayout_1 = require("./BaseLayout");
const BreadthFirstNode_1 = require("./BreadthFirstNode");
const BreadthFirstLink_1 = require("./BreadthFirstLink");
const BreadthFirstGroup_1 = require("./BreadthFirstGroup");
class BreadthFirstLayout extends BaseLayout_1.BaseLayout {
    constructor(graph, options) {
        super(graph, options);
        this.gridOptions = Object.assign(Object.assign({}, this.options), options);
    }
    createLayoutNode(node, nodeDistance, index) {
        return new BreadthFirstNode_1.BreadthFirstNode(node, nodeDistance, index);
    }
    createLayoutLink(edge, source, target, isFalse) {
        return new BreadthFirstLink_1.BreadthFirstLink(edge, source, target, isFalse);
    }
    createLayoutGroup(node, padding, index) {
        return new BreadthFirstGroup_1.BreadthFirstGroup(node, padding, index);
    }
    startLayout(graph, initialRun, addingNodes) {
        if (initialRun || addingNodes) {
            // Breath First algorithm
            // A node is visited in the order of levels
            const visited = {};
            // A node is used as a source/target, helper to detect duplicates/cycles.
            const processed = {};
            // The list of nodes that are roots in the graph
            const roots = {};
            // Helper map with target Ids
            const targetIds = {};
            // Helper map with the list of target Ids per source Id.
            const sourceIds = {};
            let padX = 0;
            let padY = 0;
            // Initial loop to populated the helpers
            for (const edge of this.edges) {
                if (!edge.isFalse) {
                    const sourceId = edge.sourceNode.id;
                    const targetId = edge.targetNode.id;
                    if (!sourceIds[sourceId]) {
                        sourceIds[sourceId] = [];
                    }
                    sourceIds[sourceId].push(targetId);
                    targetIds[targetId] = true;
                }
            }
            for (const node of this.nodes) {
                const id = node.id;
                if (!targetIds[id]) {
                    roots[id] = true;
                }
                if (padX < node.width) {
                    padX = node.width;
                }
                if (padY < node.height) {
                    padY = node.height;
                }
            }
            // Visiting all nodes to have an array of arrays with ids, organized by breath first levels
            const levels = [];
            levels.push(Object.keys(roots));
            let nl = 0;
            while (Object.keys(visited).length < this.nodes.length) {
                const nextLevel = {};
                for (const nodeId of levels[nl]) {
                    if (!visited[nodeId]) {
                        if (sourceIds[nodeId]) {
                            for (const childId of sourceIds[nodeId]) {
                                if (!processed[childId]) {
                                    nextLevel[childId] = true;
                                    processed[childId] = true;
                                }
                            }
                        }
                        visited[nodeId] = true;
                        processed[nodeId] = true;
                    }
                }
                const nextLevelKeys = Object.keys(nextLevel);
                if (nextLevelKeys.length > 0) {
                    levels.push(nextLevelKeys);
                }
                nl++;
            }
            // Updating positions with levels
            let x = 0;
            let y = 0;
            for (const level of levels) {
                const sortedLevel = level.sort((a, b) => a.localeCompare(b));
                for (const nodeId of sortedLevel) {
                    const node = this.nodesMap[nodeId];
                    node.x = x;
                    node.y = y;
                    node.update();
                    x += padX;
                }
                y += padY;
                x = 0;
            }
        }
    }
}
exports.BreadthFirstLayout = BreadthFirstLayout;
//# sourceMappingURL=BreadthFirstLayout.js.map