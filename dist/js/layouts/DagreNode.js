"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DagreNode = void 0;
const LayoutNode_1 = require("./LayoutNode");
class DagreNode extends LayoutNode_1.LayoutNode {
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
exports.DagreNode = DagreNode;
//# sourceMappingURL=DagreNode.js.map