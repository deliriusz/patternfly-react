"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const mobx_1 = require("mobx");
const Point_1 = tslib_1.__importDefault(require("../geom/Point"));
const anchor_utils_1 = require("../utils/anchor-utils");
const AbstractAnchor_1 = tslib_1.__importDefault(require("./AbstractAnchor"));
class SVGAnchor extends AbstractAnchor_1.default {
    setSVGElement(svgElement) {
        this.svgElement = svgElement;
    }
    getCircleLocation(circle, reference) {
        const center = new Point_1.default(circle.cx.baseVal.value, circle.cy.baseVal.value);
        this.owner.translateToParent(center);
        const diameter = circle.r.baseVal.value * 2 + this.offset * 2;
        return anchor_utils_1.getEllipseAnchorPoint(center, diameter, diameter, reference);
    }
    getEllipseLocation(ellipse, reference) {
        const center = new Point_1.default(ellipse.cx.baseVal.value, ellipse.cy.baseVal.value);
        this.owner.translateToParent(center);
        const offset2x = this.offset * 2;
        const width = ellipse.rx.baseVal.value * 2 + offset2x;
        const height = ellipse.ry.baseVal.value * 2 + offset2x;
        return anchor_utils_1.getEllipseAnchorPoint(center, width, height, reference);
    }
    getRectLocation(rect, reference) {
        const width = rect.width.baseVal.value;
        const height = rect.height.baseVal.value;
        const center = new Point_1.default(rect.x.baseVal.value + width / 2, rect.y.baseVal.value + height / 2);
        this.owner.translateToParent(center);
        const offset2x = this.offset * 2;
        return anchor_utils_1.getRectAnchorPoint(center, width + offset2x, height + offset2x, reference);
    }
    getPathLocation(path, reference) {
        const translatedRef = reference.clone();
        this.owner.translateFromParent(translatedRef);
        const anchorPoint = anchor_utils_1.getPathAnchorPoint(path, translatedRef);
        this.owner.translateToParent(anchorPoint);
        return anchorPoint;
    }
    getPolygonLocation(polygon, reference) {
        const translatedRef = reference.clone();
        this.owner.translateFromParent(translatedRef);
        const anchorPoint = anchor_utils_1.getPolygonAnchorPoint(polygon, translatedRef);
        this.owner.translateToParent(anchorPoint);
        return anchorPoint;
    }
    getLocation(reference) {
        if (this.svgElement && this.svgElement.viewportElement) {
            if (this.svgElement instanceof SVGCircleElement) {
                return this.getCircleLocation(this.svgElement, reference);
            }
            if (this.svgElement instanceof SVGEllipseElement) {
                return this.getEllipseLocation(this.svgElement, reference);
            }
            if (this.svgElement instanceof SVGRectElement) {
                return this.getRectLocation(this.svgElement, reference);
            }
            if (this.svgElement instanceof SVGPathElement) {
                return this.getPathLocation(this.svgElement, reference);
            }
            if (this.svgElement instanceof SVGPolygonElement) {
                return this.getPolygonLocation(this.svgElement, reference);
            }
        }
        return this.owner.getBounds().getCenter();
    }
    getReferencePoint() {
        if (this.svgElement &&
            this.svgElement.viewportElement &&
            (this.svgElement instanceof SVGCircleElement ||
                this.svgElement instanceof SVGEllipseElement ||
                this.svgElement instanceof SVGRectElement ||
                this.svgElement instanceof SVGPathElement ||
                this.svgElement instanceof SVGPolygonElement)) {
            const bbox = this.svgElement.getBBox();
            const ref = new Point_1.default(bbox.x + bbox.width / 2, bbox.y + bbox.height / 2);
            // this touches the bounds for non-groups
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
], SVGAnchor.prototype, "svgElement", void 0);
exports.default = SVGAnchor;
//# sourceMappingURL=SVGAnchor.js.map