"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const mobx_1 = require("mobx");
const Point_1 = tslib_1.__importDefault(require("../geom/Point"));
const anchor_utils_1 = require("../utils/anchor-utils");
const AbstractAnchor_1 = tslib_1.__importDefault(require("./AbstractAnchor"));
const geom_1 = require("../geom");
class PolygonAnchor extends AbstractAnchor_1.default {
    setPoints(points) {
        this.points = points === null || points === void 0 ? void 0 : points.map(p => new Point_1.default(p[0], p[1]));
    }
    getLocation(reference) {
        let bestPoint = new Point_1.default(0, 0);
        if (this.points) {
            const translatedRef = reference.clone();
            this.owner.translateFromParent(translatedRef);
            let bestDistance = Infinity;
            const bbox = this.getBoundingBox();
            for (let i = 0; i < this.points.length; i++) {
                const intersectPoint = anchor_utils_1.getLinesIntersection([this.points[i], this.points[i === this.points.length - 1 ? 0 : i + 1]], [bbox.getCenter(), translatedRef]);
                if (intersectPoint) {
                    const intersectDistance = anchor_utils_1.distanceToPoint(intersectPoint, translatedRef);
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
            const bbox = new geom_1.Rect(this.points[0].x, this.points[0].y);
            for (let i = 1; i < this.points.length; i++) {
                bbox.union(new geom_1.Rect(this.points[i].x, this.points[i].y));
            }
            return bbox;
        }
        return new geom_1.Rect(0, 0);
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
tslib_1.__decorate([
    mobx_1.observable.ref
], PolygonAnchor.prototype, "points", void 0);
exports.default = PolygonAnchor;
//# sourceMappingURL=PolygonAnchor.js.map