import { __decorate } from "tslib";
import { computed, observable } from 'mobx';
import Point from '../geom/Point';
import { AnchorEnd, EdgeAnimationSpeed, EdgeStyle, ModelKind } from '../types';
import { getTopCollapsedParent } from '../utils';
import BaseElement from './BaseElement';
export default class BaseEdge extends BaseElement {
    get sourceAnchor() {
        return this.getSourceAnchorNode().getAnchor(AnchorEnd.source, this.getType());
    }
    get targetAnchor() {
        return this.getTargetAnchorNode().getAnchor(AnchorEnd.target, this.getType());
    }
    getKind() {
        return ModelKind.edge;
    }
    getSource() {
        if (!this.source) {
            throw new Error(`Edge with ID '${this.getId()}' has no source.`);
        }
        return this.source;
    }
    setSource(source) {
        this.source = source;
    }
    getTarget() {
        if (!this.target) {
            throw new Error(`Edge with ID '${this.getId()}' has no target.`);
        }
        return this.target;
    }
    setTarget(target) {
        this.target = target;
    }
    getEdgeStyle() {
        return this.edgeStyle || EdgeStyle.default;
    }
    setEdgeStyle(edgeStyle) {
        this.edgeStyle = edgeStyle;
    }
    getEdgeAnimationSpeed() {
        return this.animationSpeed || EdgeAnimationSpeed.none;
    }
    setEdgeAnimationSpeed(animationSpeed) {
        this.animationSpeed = animationSpeed || EdgeAnimationSpeed.none;
    }
    getSourceAnchorNode() {
        if (!this.source) {
            throw new Error(`Edge with ID '${this.getId()}' has no source.`);
        }
        return getTopCollapsedParent(this.source);
    }
    getTargetAnchorNode() {
        if (!this.target) {
            throw new Error(`Edge with ID '${this.getId()}' has no target.`);
        }
        return getTopCollapsedParent(this.target);
    }
    getBendpoints() {
        return this.bendpoints || [];
    }
    setBendpoints(points) {
        this.bendpoints = points;
    }
    removeBendpoint(point) {
        if (this.bendpoints) {
            if (typeof point === 'number') {
                this.bendpoints.splice(point, 1);
            }
            else {
                const idx = this.bendpoints.indexOf(point);
                if (idx !== -1) {
                    this.bendpoints.splice(idx, 1);
                }
            }
        }
    }
    getStartPoint() {
        if (this.startPoint) {
            return this.startPoint;
        }
        const bendpoints = this.getBendpoints();
        let referencePoint;
        if (bendpoints && bendpoints.length > 0) {
            [referencePoint] = bendpoints;
        }
        else if (this.endPoint) {
            referencePoint = this.endPoint;
        }
        else {
            referencePoint = this.targetAnchor.getReferencePoint();
        }
        return this.sourceAnchor.getLocation(referencePoint);
    }
    setStartPoint(x, y) {
        if (x == null || y == null) {
            this.startPoint = undefined;
        }
        else {
            this.startPoint = new Point(x, y);
        }
    }
    getEndPoint() {
        if (this.endPoint) {
            return this.endPoint;
        }
        const bendpoints = this.getBendpoints();
        let referencePoint;
        if (bendpoints && bendpoints.length > 0) {
            referencePoint = bendpoints[bendpoints.length - 1];
        }
        else if (this.startPoint) {
            referencePoint = this.startPoint;
        }
        else {
            referencePoint = this.sourceAnchor.getReferencePoint();
        }
        return this.targetAnchor.getLocation(referencePoint);
    }
    setEndPoint(x, y) {
        if (x == null || y == null) {
            this.endPoint = undefined;
        }
        else {
            this.endPoint = new Point(x, y);
        }
    }
    setModel(model) {
        super.setModel(model);
        if (model.source) {
            const node = this.getController().getNodeById(model.source);
            if (!node) {
                throw new Error(`No source node found with ID '${model.source}'.`);
            }
            this.source = node;
        }
        if (model.target) {
            const node = this.getController().getNodeById(model.target);
            if (!node) {
                throw new Error(`No target node found with ID '${model.target}'.`);
            }
            this.target = node;
        }
        if ('edgeStyle' in model) {
            this.edgeStyle = model.edgeStyle;
        }
        if ('animationSpeed' in model) {
            this.animationSpeed = model.animationSpeed;
        }
        if ('bendpoints' in model) {
            this.bendpoints = model.bendpoints ? model.bendpoints.map(b => new Point(b[0], b[1])) : [];
        }
    }
    toModel() {
        return Object.assign(Object.assign({}, super.toModel()), { source: this.getSource() ? this.getSource().getId() : undefined, target: this.getTarget() ? this.getTarget().getId() : undefined, edgeStyle: this.edgeStyle, animationSpeed: this.animationSpeed, bendpoints: this.getBendpoints().map(bp => [bp.x, bp.y]) });
    }
}
__decorate([
    observable.ref
], BaseEdge.prototype, "source", void 0);
__decorate([
    observable.ref
], BaseEdge.prototype, "target", void 0);
__decorate([
    observable.ref
], BaseEdge.prototype, "edgeStyle", void 0);
__decorate([
    observable.ref
], BaseEdge.prototype, "animationSpeed", void 0);
__decorate([
    observable.shallow
], BaseEdge.prototype, "bendpoints", void 0);
__decorate([
    observable.ref
], BaseEdge.prototype, "startPoint", void 0);
__decorate([
    observable.ref
], BaseEdge.prototype, "endPoint", void 0);
__decorate([
    computed
], BaseEdge.prototype, "sourceAnchor", null);
__decorate([
    computed
], BaseEdge.prototype, "targetAnchor", null);
//# sourceMappingURL=BaseEdge.js.map