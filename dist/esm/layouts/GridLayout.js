import { BaseLayout } from './BaseLayout';
import { GridNode } from './GridNode';
import { GridLink } from './GridLink';
import { GridGroup } from './GridGroup';
export class GridLayout extends BaseLayout {
    constructor(graph, options) {
        super(graph, options);
        this.gridOptions = Object.assign(Object.assign({}, this.options), options);
    }
    createLayoutNode(node, nodeDistance, index) {
        return new GridNode(node, nodeDistance, index);
    }
    createLayoutLink(edge, source, target, isFalse) {
        return new GridLink(edge, source, target, isFalse);
    }
    createLayoutGroup(node, padding, index) {
        return new GridGroup(node, padding, index);
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
//# sourceMappingURL=GridLayout.js.map