"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const mobx_1 = require("mobx");
const types_1 = require("../types");
const CenterAnchor_1 = tslib_1.__importDefault(require("../anchors/CenterAnchor"));
const Rect_1 = tslib_1.__importDefault(require("../geom/Rect"));
const BaseElement_1 = tslib_1.__importDefault(require("./BaseElement"));
const Dimensions_1 = tslib_1.__importDefault(require("../geom/Dimensions"));
const Point_1 = tslib_1.__importDefault(require("../geom/Point"));
const createAnchorKey = (end = types_1.AnchorEnd.both, type = '') => `${end}:${type}`;
class BaseNode extends BaseElement_1.default {
    constructor() {
        super(...arguments);
        this.anchors = {
            [createAnchorKey()]: new CenterAnchor_1.default(this)
        };
        this.dimensions = new Dimensions_1.default();
        this.dimensionsInitialized = false;
        this.positioned = false;
        this.uncollapsedCenter = null;
        this.position = new Point_1.default();
        this.group = false;
        this.collapsed = false;
        this.labelPosition = types_1.LabelPosition.bottom;
    }
    get nodes() {
        if (this.isCollapsed()) {
            return [];
        }
        return this.getChildren().filter(types_1.isNode);
    }
    get groupBounds() {
        const children = this.getChildren()
            .filter(types_1.isNode)
            .filter(n => n.isVisible());
        if (!children.length) {
            return this.getInternalBounds();
        }
        let rect;
        children.forEach(c => {
            if (types_1.isNode(c)) {
                const { padding } = c.getStyle();
                const b = c.getBounds();
                // Currently non-group nodes do not include their padding in the bounds
                if (!c.isGroup() && padding) {
                    b.padding(c.getStyle().padding);
                }
                if (!rect) {
                    rect = b.clone();
                }
                else {
                    rect.union(b);
                }
            }
        });
        if (!rect) {
            rect = new Rect_1.default();
        }
        const { padding } = this.getStyle();
        return rect.padding(padding);
    }
    get sourceEdges() {
        return this.getGraph()
            .getEdges()
            .filter(e => e.getSource() === this);
    }
    get targetEdges() {
        return this.getGraph()
            .getEdges()
            .filter(e => e.getTarget() === this);
    }
    getChildren() {
        if (this.isCollapsed()) {
            return super.getChildren().filter(types_1.isEdge);
        }
        return super.getChildren();
    }
    // Return all child leaf nodes regardless of collapse status or child groups' collapsed status
    getAllNodeChildren() {
        return super.getChildren().reduce((total, nexChild) => {
            if (types_1.isNode(nexChild)) {
                total.push(nexChild.isGroup() ? nexChild.getAllNodeChildren() : nexChild);
            }
            return total;
        }, []);
    }
    getKind() {
        return types_1.ModelKind.node;
    }
    getInternalBounds() {
        const { position, dimensions } = this;
        return new Rect_1.default(position.x, position.y, dimensions.width, dimensions.height);
    }
    getBounds() {
        return this.group && !this.collapsed ? this.groupBounds : this.getInternalBounds();
    }
    setBounds(bounds) {
        const { width, height } = this.dimensions;
        if (bounds.width !== width || bounds.height !== height) {
            this.dimensions = new Dimensions_1.default(bounds.width, bounds.height);
        }
        const { x, y } = this.position;
        if (bounds.x !== x || bounds.y !== y) {
            this.setPosition(new Point_1.default(bounds.x, bounds.y));
        }
    }
    getPosition() {
        if (this.isGroup() && this.getChildren().length && !this.collapsed) {
            return this.getBounds().getCenter();
        }
        return this.position;
    }
    updateChildrenPositions(point, prevLocation) {
        const xOffset = point.x - prevLocation.x;
        const yOffset = point.y - prevLocation.y;
        this.getChildren().forEach(child => {
            if (types_1.isNode(child)) {
                const node = child;
                const position = node.getPosition();
                const newPosition = new Point_1.default(position.x + xOffset, position.y + yOffset);
                node.setPosition(newPosition);
            }
        });
    }
    setPosition(point) {
        if (this.isGroup() && this.getChildren().length && !this.collapsed) {
            const prevLocation = this.getBounds().getCenter();
            this.updateChildrenPositions(point, prevLocation);
            return;
        }
        this.position = point;
        this.positioned = true;
        try {
            this.getController().fireEvent(types_1.NODE_POSITIONED_EVENT, { node: this });
            // eslint-disable-next-line no-empty
        }
        catch (e) { }
    }
    isPositioned() {
        return this.positioned;
    }
    getDimensions() {
        return this.dimensions;
    }
    setDimensions(dimensions) {
        this.dimensions = dimensions;
        this.dimensionsInitialized = true;
    }
    isDimensionsInitialized() {
        if (!this.dimensionsInitialized && this.isGroup()) {
            const nodes = this.getChildren().filter(types_1.isNode);
            if (nodes.length === 0) {
                return this.dimensionsInitialized;
            }
            const result = nodes.every(c => c.isDimensionsInitialized());
            if (result) {
                this.dimensionsInitialized = true;
            }
        }
        return this.dimensionsInitialized;
    }
    getAnchor(end, type) {
        let anchor = this.anchors[createAnchorKey(end, type)];
        if (!anchor && type) {
            anchor = this.anchors[createAnchorKey(end)];
        }
        if (!anchor && (end === types_1.AnchorEnd.source || end === types_1.AnchorEnd.target)) {
            anchor = this.anchors[createAnchorKey(types_1.AnchorEnd.both, type)];
            if (!anchor && type) {
                anchor = this.anchors[createAnchorKey(types_1.AnchorEnd.both)];
            }
        }
        return anchor;
    }
    setAnchor(anchor, end, type) {
        const key = createAnchorKey(end, type);
        if (anchor) {
            this.anchors[key] = anchor;
        }
        else {
            delete this.anchors[key];
        }
    }
    getNodes() {
        return this.nodes;
    }
    isGroup() {
        return this.group;
    }
    setGroup(group) {
        this.group = group;
    }
    isCollapsed() {
        return this.collapsed;
    }
    setCollapsed(collapsed) {
        if (collapsed !== this.collapsed) {
            // Get the location prior to the collapse change and apply it after the collapse.
            // This updates the new node(s) location(s) to be what the node was originally, basically
            // keeping the nodes ln place so the layout doesn't start fresh (putting the new nodes at 0,0
            // TODO: Update to better position the nodes at a point location rather than relying on the setCenter updating the nodes.
            const prevCenter = this.getBounds().getCenter();
            if (!collapsed && this.uncollapsedCenter) {
                this.updateChildrenPositions(prevCenter, this.uncollapsedCenter);
                this.uncollapsedCenter = null;
                this.collapsed = collapsed;
            }
            else {
                this.uncollapsedCenter = collapsed ? prevCenter : null;
                this.collapsed = collapsed;
                this.setBounds(this.getBounds().setCenter(prevCenter.x, prevCenter.y));
            }
            this.getController().fireEvent(types_1.NODE_COLLAPSE_CHANGE_EVENT, { node: this });
        }
    }
    getLabelPosition() {
        return this.labelPosition;
    }
    setLabelPosition(position) {
        this.labelPosition = position;
    }
    getNodeShape() {
        return this.shape || (this.group ? types_1.NodeShape.rect : types_1.NodeShape.ellipse);
    }
    setNodeShape(shape) {
        this.shape = shape;
    }
    getNodeStatus() {
        return this.status || types_1.NodeStatus.default;
    }
    setNodeStatus(status) {
        this.status = status;
    }
    getSourceEdges() {
        return this.sourceEdges;
    }
    getTargetEdges() {
        return this.targetEdges;
    }
    isVisible() {
        return super.isVisible() && this.isDimensionsInitialized();
    }
    setModel(model) {
        super.setModel(model);
        let d;
        let p;
        if ('width' in model && model.width != null && model.width !== this.dimensions.width) {
            if (!d) {
                d = this.dimensions.clone();
            }
            d.width = model.width;
        }
        if ('height' in model && model.height != null && model.height !== this.dimensions.height) {
            if (!d) {
                d = this.dimensions.clone();
            }
            d.height = model.height;
        }
        if (d) {
            this.setDimensions(d);
        }
        if ('x' in model && model.x != null && model.x !== this.position.x) {
            if (!p) {
                p = this.position.clone();
            }
            p.x = model.x;
        }
        if ('y' in model && model.y != null && model.y !== this.position.y) {
            if (!p) {
                p = this.position.clone();
            }
            p.y = model.y;
        }
        if (p) {
            this.setPosition(p);
        }
        if ('group' in model) {
            this.setGroup(!!model.group);
        }
        if ('labelPosition' in model) {
            this.labelPosition = model.labelPosition;
        }
        if ('shape' in model) {
            this.shape = model.shape;
        }
        if ('status' in model) {
            this.status = model.status;
        }
        if ('collapsed' in model) {
            this.setCollapsed(!!model.collapsed);
        }
    }
    toModel() {
        return Object.assign(Object.assign({}, super.toModel()), { x: this.isPositioned() ? this.getPosition().x : undefined, y: this.isPositioned() ? this.getPosition().y : undefined, width: this.isDimensionsInitialized() ? this.getDimensions().width : undefined, height: this.isDimensionsInitialized() ? this.getDimensions().height : undefined, collapsed: this.isCollapsed(), group: this.isGroup(), labelPosition: this.labelPosition, shape: this.shape, status: this.status });
    }
    translateToParent(t) {
        if (!this.group || this.isCollapsed()) {
            const { x, y } = this.getPosition();
            t.translate(x, y);
        }
    }
    translateFromParent(t) {
        if (!this.group || this.isCollapsed()) {
            const { x, y } = this.getPosition();
            t.translate(-x, -y);
        }
    }
}
tslib_1.__decorate([
    mobx_1.observable.shallow
], BaseNode.prototype, "anchors", void 0);
tslib_1.__decorate([
    mobx_1.observable.ref
], BaseNode.prototype, "dimensions", void 0);
tslib_1.__decorate([
    mobx_1.observable
], BaseNode.prototype, "dimensionsInitialized", void 0);
tslib_1.__decorate([
    mobx_1.observable.ref
], BaseNode.prototype, "position", void 0);
tslib_1.__decorate([
    mobx_1.computed
], BaseNode.prototype, "nodes", null);
tslib_1.__decorate([
    mobx_1.observable
], BaseNode.prototype, "group", void 0);
tslib_1.__decorate([
    mobx_1.observable
], BaseNode.prototype, "collapsed", void 0);
tslib_1.__decorate([
    mobx_1.observable
], BaseNode.prototype, "labelPosition", void 0);
tslib_1.__decorate([
    mobx_1.observable
], BaseNode.prototype, "shape", void 0);
tslib_1.__decorate([
    mobx_1.observable
], BaseNode.prototype, "status", void 0);
tslib_1.__decorate([
    mobx_1.computed
], BaseNode.prototype, "groupBounds", null);
tslib_1.__decorate([
    mobx_1.computed
], BaseNode.prototype, "sourceEdges", null);
tslib_1.__decorate([
    mobx_1.computed
], BaseNode.prototype, "targetEdges", null);
exports.default = BaseNode;
//# sourceMappingURL=BaseNode.js.map