import { __decorate } from "tslib";
import { observable } from 'mobx';
import Point from '../geom/Point';
import { distanceToPoint, getLinesIntersection } from '../utils/anchor-utils';
import AbstractAnchor from './AbstractAnchor';
import { Rect } from '../geom';
export default class PolygonAnchor extends AbstractAnchor {
    setPoints(points) {
        this.points = points === null || points === void 0 ? void 0 : points.map(p => new Point(p[0], p[1]));
    }
    getLocation(reference) {
        let bestPoint = new Point(0, 0);
        if (this.points) {
            const translatedRef = reference.clone();
            this.owner.translateFromParent(translatedRef);
            let bestDistance = Infinity;
            const bbox = this.getBoundingBox();
            for (let i = 0; i < this.points.length; i++) {
                const intersectPoint = getLinesIntersection([this.points[i], this.points[i === this.points.length - 1 ? 0 : i + 1]], [bbox.getCenter(), translatedRef]);
                if (intersectPoint) {
                    const intersectDistance = distanceToPoint(intersectPoint, translatedRef);
                    if (intersectDistance < bestDistance) {
                        bestPoint = intersectPoint;
                        bestDistance = intersectDistance;
                    }
                }
            }
        }
        this.owner.translateToParent(bestPoint);
        return bestPoint;
    }
    getBoundingBox() {
        var _a;
        if ((_a = this.points) === null || _a === void 0 ? void 0 : _a.length) {
            const bbox = new Rect(this.points[0].x, this.points[0].y);
            for (let i = 1; i < this.points.length; i++) {
                bbox.union(new Rect(this.points[i].x, this.points[i].y));
            }
            return bbox;
        }
        return new Rect(0, 0);
    }
    getReferencePoint() {
        var _a;
        if ((_a = this.points) === null || _a === void 0 ? void 0 : _a.length) {
            const bbox = this.getBoundingBox();
            const ref = bbox.getCenter();
            this.owner.translateToParent(ref);
            // touch the bounds to force a re-render in case this anchor is for a group
            this.owner.getBounds();
            return ref;
        }
        return super.getReferencePoint();
    }
}
__decorate([
    observable.ref
], PolygonAnchor.prototype, "points", void 0);
//# sourceMappingURL=PolygonAnchor.js.map