import { __decorate } from "tslib";
import { computed, observable } from 'mobx';
import Rect from '../geom/Rect';
import Point from '../geom/Point';
import Dimensions from '../geom/Dimensions';
import { DEFAULT_LAYERS } from '../const';
import { GRAPH_POSITION_CHANGE_EVENT, isEdge, isNode, ModelKind, ScaleDetailsLevel } from '../types';
import BaseElement from './BaseElement';
export default class BaseGraph extends BaseElement {
    constructor() {
        super(...arguments);
        this.layers = DEFAULT_LAYERS;
        this.scale = 1;
        this.dimensions = new Dimensions();
        this.position = new Point();
        this.scaleExtent = [0.25, 4];
        this.scaleDetailsThresholds = {
            low: 0.3,
            medium: 0.5
        };
        this.panIntoView = (nodeElement, { offset = 0, minimumVisible = 0 } = {}) => {
            if (!nodeElement) {
                return;
            }
            const { x: viewX, y: viewY, width: viewWidth, height: viewHeight } = this.getBounds();
            const boundingBox = nodeElement
                .getBounds()
                .clone()
                .scale(this.scale)
                .translate(viewX, viewY);
            const { x, y, width, height } = boundingBox;
            let move = false;
            const panOffset = offset * this.scale;
            const minVisibleSize = minimumVisible * this.scale;
            const newLocation = {
                x: viewX,
                y: viewY
            };
            if (x + width - minVisibleSize < 0) {
                newLocation.x -= x - panOffset;
                move = true;
            }
            if (x + minVisibleSize > viewWidth) {
                newLocation.x -= x + width - viewWidth + panOffset;
                move = true;
            }
            if (y + height - minVisibleSize < 0) {
                newLocation.y -= y - panOffset;
                move = true;
            }
            if (y + minVisibleSize > viewHeight) {
                newLocation.y -= y + height - viewHeight + panOffset;
                move = true;
            }
            if (move) {
                this.setBounds(new Rect(newLocation.x, newLocation.y, viewWidth, viewHeight));
            }
        };
    }
    get detailsLevel() {
        if (!this.scaleDetailsThresholds) {
            return ScaleDetailsLevel.high;
        }
        if (this.scale <= this.scaleDetailsThresholds.low) {
            return ScaleDetailsLevel.low;
        }
        else if (this.scale <= this.scaleDetailsThresholds.medium) {
            return ScaleDetailsLevel.medium;
        }
        return ScaleDetailsLevel.high;
    }
    get edges() {
        return this.getChildren().filter(isEdge);
    }
    get nodes() {
        return this.getChildren().filter(isNode);
    }
    getKind() {
        return ModelKind.graph;
    }
    getLayers() {
        return this.layers;
    }
    setLayers(layers) {
        this.layers = layers;
    }
    getScaleExtent() {
        return this.scaleExtent;
    }
    setScaleExtent(scaleExtent) {
        try {
            this.getController().fireEvent(GRAPH_POSITION_CHANGE_EVENT, { graph: this });
            // eslint-disable-next-line no-empty
        }
        catch (e) { }
        this.scaleExtent = scaleExtent;
    }
    getDetailsLevelThresholds() {
        return this.scaleDetailsThresholds;
    }
    setDetailsLevelThresholds(settings) {
        this.scaleDetailsThresholds = settings;
    }
    getDetailsLevel() {
        return this.detailsLevel;
    }
    getBounds() {
        const { position: { x, y }, dimensions: { width, height } } = this;
        return new Rect(x, y, width, height);
    }
    setBounds(bounds) {
        const { width, height } = this.dimensions;
        if (bounds.width !== width || bounds.height !== height) {
            this.dimensions = new Dimensions(bounds.width, bounds.height);
        }
        const { x, y } = this.position;
        if (bounds.x !== x || bounds.y !== y) {
            this.setPosition(new Point(bounds.x, bounds.y));
        }
    }
    getPosition() {
        return this.position;
    }
    setPosition(point) {
        try {
            this.getController().fireEvent(GRAPH_POSITION_CHANGE_EVENT, { graph: this });
            // eslint-disable-next-line no-empty
        }
        catch (e) { }
        this.position = point;
    }
    getDimensions() {
        return this.dimensions;
    }
    setDimensions(dimensions) {
        this.dimensions = dimensions;
    }
    getNodes() {
        return this.nodes;
    }
    getEdges() {
        return this.edges;
    }
    getLayout() {
        return this.layoutType;
    }
    setLayout(layout) {
        if (layout === this.layoutType) {
            return;
        }
        if (this.currentLayout) {
            this.currentLayout.destroy();
        }
        this.layoutType = layout;
        this.currentLayout = layout ? this.getController().getLayout(layout) : undefined;
    }
    layout() {
        if (this.currentLayout) {
            this.currentLayout.layout();
        }
    }
    getScale() {
        return this.scale;
    }
    setScale(scale) {
        try {
            this.getController().fireEvent(GRAPH_POSITION_CHANGE_EVENT, { graph: this });
            // eslint-disable-next-line no-empty
        }
        catch (e) { }
        this.scale = scale;
    }
    reset() {
        if (this.currentLayout) {
            this.currentLayout.stop();
        }
        this.setScale(1);
        this.setPosition(new Point(0, 0));
    }
    scaleBy(scale, location) {
        const b = this.getBounds();
        let { x, y } = b;
        const c = location || b.getCenter().translate(-x, -y);
        x = (c.x - x) / this.scale;
        y = (c.y - y) / this.scale;
        const newScale = Math.max(Math.min(this.scale * scale, this.scaleExtent[1]), this.scaleExtent[0]);
        this.setScale(newScale);
        x = c.x - x * this.scale;
        y = c.y - y * this.scale;
        this.setPosition(new Point(x, y));
    }
    fit(padding = 0) {
        let rect;
        this.getNodes().forEach(c => {
            const b = c.getBounds();
            if (!rect) {
                rect = b.clone();
            }
            else {
                rect.union(b);
            }
        });
        if (!rect) {
            return;
        }
        const { width, height } = rect;
        if (width === 0 || height === 0) {
            return;
        }
        const { width: fullWidth, height: fullHeight } = this.getDimensions();
        const midX = rect.x + width / 2;
        const midY = rect.y + height / 2;
        // set the max scale to be the current zoom level or 1
        const maxScale = Math.max(this.getScale(), 1);
        // compute the scale
        const scale = Math.min(1 / Math.max(width / Math.max(1, fullWidth - padding), height / Math.max(1, fullHeight - padding)), maxScale);
        // translate to center
        const tx = fullWidth / 2 - midX * scale;
        const ty = fullHeight / 2 - midY * scale;
        // TODO should scale and bound be kept in a single geom Transform object instead of separately?
        this.setScale(scale);
        this.setPosition(new Point(tx, ty));
    }
    isNodeInView(element, { padding = 0 }) {
        const graph = element.getGraph();
        const { x: viewX, y: viewY, width: viewWidth, height: viewHeight } = graph.getBounds();
        const { x, y, width, height } = element
            .getBounds()
            .clone()
            .scale(this.scale)
            .translate(viewX, viewY);
        return x + width > -padding && x < viewWidth + padding && y + height > -padding && y < viewHeight + padding;
    }
    setModel(model) {
        super.setModel(model);
        if ('layers' in model && model.layers) {
            this.setLayers(model.layers);
        }
        if ('layout' in model) {
            this.setLayout(model.layout);
        }
        if (model.scaleExtent && model.scaleExtent.length === 2) {
            this.setScaleExtent(model.scaleExtent);
        }
        if ('scale' in model && typeof model.scale === 'number') {
            this.setScale(+model.scale);
        }
        let p;
        if ('x' in model && model.x != null) {
            if (!p) {
                p = this.position.clone();
            }
            p.x = model.x;
        }
        if ('y' in model && model.y != null) {
            if (!p) {
                p = this.position.clone();
            }
            p.y = model.y;
        }
        if (p) {
            this.setPosition(p);
        }
    }
    toModel() {
        return Object.assign(Object.assign({}, super.toModel()), { layout: this.getLayout(), x: this.getPosition().x, y: this.getPosition().y, scale: this.getScale(), scaleExtent: this.getScaleExtent(), layers: this.getLayers() });
    }
    translateToAbsolute() {
        // do nothing
    }
    translateFromAbsolute() {
        // do nothing
    }
    destroy() {
        if (this.currentLayout) {
            this.currentLayout.destroy();
        }
    }
}
__decorate([
    observable.ref
], BaseGraph.prototype, "layers", void 0);
__decorate([
    observable
], BaseGraph.prototype, "scale", void 0);
__decorate([
    observable
], BaseGraph.prototype, "layoutType", void 0);
__decorate([
    observable.ref
], BaseGraph.prototype, "dimensions", void 0);
__decorate([
    observable.ref
], BaseGraph.prototype, "position", void 0);
__decorate([
    observable.ref
], BaseGraph.prototype, "scaleExtent", void 0);
__decorate([
    computed
], BaseGraph.prototype, "detailsLevel", null);
__decorate([
    computed
], BaseGraph.prototype, "edges", null);
__decorate([
    computed
], BaseGraph.prototype, "nodes", null);
__decorate([
    observable.ref
], BaseGraph.prototype, "scaleDetailsThresholds", void 0);
//# sourceMappingURL=BaseGraph.js.map