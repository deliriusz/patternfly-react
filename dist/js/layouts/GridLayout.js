"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GridLayout = void 0;
const BaseLayout_1 = require("./BaseLayout");
const GridNode_1 = require("./GridNode");
const GridLink_1 = require("./GridLink");
const GridGroup_1 = require("./GridGroup");
class GridLayout extends BaseLayout_1.BaseLayout {
    constructor(graph, options) {
        super(graph, options);
        this.gridOptions = Object.assign(Object.assign({}, this.options), options);
    }
    createLayoutNode(node, nodeDistance, index) {
        return new GridNode_1.GridNode(node, nodeDistance, index);
    }
    createLayoutLink(edge, source, target, isFalse) {
        return new GridLink_1.GridLink(edge, source, target, isFalse);
    }
    createLayoutGroup(node, padding, index) {
        return new GridGroup_1.GridGroup(node, padding, index);
    }
    startLayout(graph, initialRun, addingNodes) {
        if (initialRun || addingNodes) {
            this.nodes.sort((a, b) => a.id.localeCompare(b.id));
            const totalNodes = this.nodes.length;
            const maxPerRow = Math.round(Math.sqrt(totalNodes));
            let x = 0;
            let y = 0;
            let rowI = 0;
            let padX = 0;
            let padY = 0;
            for (let i = 0; i < totalNodes; i++) {
                const node = this.nodes[i];
                if (padX < node.width) {
                    padX = node.width;
                }
                if (padY < node.height) {
                    padY = node.height;
                }
            }
            for (let i = 0; i < totalNodes; i++) {
                const node = this.nodes[i];
                node.x = x;
                node.y = y;
                node.update();
                if (rowI < maxPerRow) {
                    x += padX;
                    rowI++;
                }
                else {
                    rowI = 0;
                    x = 0;
                    y += padY;
                }
            }
        }
    }
}
exports.GridLayout = GridLayout;
//# sourceMappingURL=GridLayout.js.map