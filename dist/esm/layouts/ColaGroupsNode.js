import { isNode } from '../types';
import { LayoutNode } from './LayoutNode';
import { Point } from '../geom';
export class ColaGroupsNode extends LayoutNode {
    constructor(node, distance, index = -1) {
        super(node, distance, index);
        // fixed is used by Cola during node additions: 1 for fixed
        this.fixed = 0;
        // TODO: Investigate why the issue with rectangular nodes causing the layout to become vertical
        // may need to do more here like what is done in ColaNode
    }
    setFixed(fixed) {
        super.setFixed(fixed);
        this.fixed = fixed ? 1 : 0;
    }
    update() {
        if (!this.isFixed && this.xx != null && this.yy != null) {
            if (this.node.isGroup()) {
                const prevLocation = this.node.getBounds().getCenter();
                const xOffset = this.xx - prevLocation.x;
                const yOffset = this.yy - prevLocation.y;
                this.node.getChildren().forEach(child => {
                    if (isNode(child)) {
                        const node = child;
                        const position = node.getPosition();
                        node.setPosition(new Point(position.x + xOffset, position.y + yOffset));
                    }
                });
            }
            else {
                this.setPosition(this.xx, this.yy);
            }
        }
        this.xx = undefined;
        this.yy = undefined;
    }
    get width() {
        return this.nodeBounds.width + this.distance * 2;
    }
    get height() {
        return this.nodeBounds.height + this.distance * 2;
    }
    get radius() {
        const bounds = this.nodeBounds;
        return Math.max(bounds.width, bounds.height) / 2;
    }
    get collisionRadius() {
        return this.radius + this.distance;
    }
}
//# sourceMappingURL=ColaGroupsNode.js.map