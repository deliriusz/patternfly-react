import { Point } from '../geom';
export class LayoutNode {
    constructor(node, distance, index = -1) {
        // isFixed is used locally for Force simulation during drag events
        this.isFixed = false;
        this.node = node;
        this.distance = distance;
        this.index = index;
        // Currently we support only fixed node sizes, this will need to change if/when dynamic node sizes are supported
        const bounds = this.nodeBounds;
        this.nodeWidth = bounds.width + this.distance * 2;
        this.nodeHeight = bounds.height + this.distance * 2;
        this.nodeRadius = Math.max(bounds.width, bounds.height) / 2;
    }
    get element() {
        return this.node;
    }
    get id() {
        return this.node.getId();
    }
    get x() {
        return this.xx || this.node.getBounds().getCenter().x;
    }
    set x(x) {
        if (!Number.isNaN(x)) {
            this.xx = x;
        }
    }
    get y() {
        return this.yy || this.node.getBounds().getCenter().y;
    }
    set y(y) {
        if (!Number.isNaN(y)) {
            this.yy = y;
        }
    }
    get fx() {
        return this.isFixed ? this.node.getBounds().getCenter().x : undefined;
    }
    get fy() {
        return this.isFixed ? this.node.getBounds().getCenter().y : undefined;
    }
    setPosition(x, y) {
        const bounds = this.node.getBounds();
        this.node.setPosition(new Point(x - bounds.width / 2, y - bounds.height / 2));
    }
    setFixed(fixed) {
        this.isFixed = fixed;
    }
    get nodeBounds() {
        const { padding } = this.node.getStyle();
        // Currently non-group nodes do not include their padding in the bounds
        if (!this.node.isGroup() && padding) {
            return this.node
                .getBounds()
                .clone()
                .padding(padding);
        }
        return this.node.getBounds();
    }
    get width() {
        return this.nodeWidth;
    }
    get height() {
        return this.nodeHeight;
    }
    update() {
        if (!this.isFixed && this.xx != null && this.yy != null) {
            this.setPosition(this.xx, this.yy);
        }
        this.xx = undefined;
        this.yy = undefined;
    }
    get radius() {
        return this.nodeRadius;
    }
    get collisionRadius() {
        return this.radius + this.distance;
    }
}
//# sourceMappingURL=LayoutNode.js.map