import { LayoutNode } from './LayoutNode';
export class DagreNode extends LayoutNode {
    getUpdatableNode() {
        return {
            id: this.id,
            width: this.width,
            height: this.height,
            x: this.x,
            y: this.y
        };
    }
    updateToNode(updatedNode) {
        if (updatedNode) {
            this.x = updatedNode.x;
            this.y = updatedNode.y;
            this.update();
        }
    }
}
//# sourceMappingURL=DagreNode.js.map