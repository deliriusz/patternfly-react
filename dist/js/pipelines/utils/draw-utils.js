"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.path = exports.integralShapePath = exports.straightPath = void 0;
const geom_1 = require("../../geom");
const const_1 = require("../const");
const join = (...segments) => segments.filter(seg => !!seg).join(' ');
const leftRight = (p1, p2) => p1.x < p2.x;
const topDown = (p1, p2) => p1.y < p2.y;
const bottomUp = (p1, p2) => p1.y > p2.y;
const point = p => `${p.x},${p.y}`;
const moveTo = p => `M ${point(p)}`;
const lineTo = p => `L ${point(p)}`;
const quadTo = (corner, end) => `Q ${point(corner)} ${point(end)}`;
// TODO: Try to simplify
// x should not be greater than (NODE_SEPARATION_HORIZONTAL / 2)
const CURVE_SIZE = { x: 8, y: 10 };
const curve = (fromPoint, cornerPoint, toPoint) => {
    const topToBottom = topDown(fromPoint, toPoint);
    if (topToBottom) {
        const rightAndDown = leftRight(fromPoint, cornerPoint) && topDown(cornerPoint, toPoint);
        const downAndRight = topDown(fromPoint, cornerPoint) && leftRight(cornerPoint, toPoint);
        if (rightAndDown) {
            return join(lineTo(cornerPoint.clone().translate(-CURVE_SIZE.x, 0)), quadTo(cornerPoint, cornerPoint.clone().translate(0, CURVE_SIZE.y)));
        }
        if (downAndRight) {
            return join(lineTo(cornerPoint.clone().translate(0, -CURVE_SIZE.y)), quadTo(cornerPoint, cornerPoint.clone().translate(CURVE_SIZE.x, 0)));
        }
    }
    else {
        const rightAndUp = leftRight(fromPoint, cornerPoint) && bottomUp(cornerPoint, toPoint);
        const upAndRight = bottomUp(fromPoint, cornerPoint) && leftRight(cornerPoint, toPoint);
        if (rightAndUp) {
            return join(lineTo(cornerPoint.clone().translate(-CURVE_SIZE.x, 0)), quadTo(cornerPoint, cornerPoint.clone().translate(0, -CURVE_SIZE.y)));
        }
        if (upAndRight) {
            return join(lineTo(cornerPoint.clone().translate(0, CURVE_SIZE.y)), quadTo(cornerPoint, cornerPoint.clone().translate(CURVE_SIZE.x, 0)));
        }
    }
    return '';
};
const straightPath = (start, finish) => join(moveTo(start), lineTo(finish));
exports.straightPath = straightPath;
const integralShapePath = (start, finish, startIndentX = 0, nodeSeparation = const_1.NODE_SEPARATION_HORIZONTAL) => {
    // Integral shape: ∫
    let firstCurve = null;
    let secondCurve = null;
    if (start.y !== finish.y) {
        const cornerX = Math.floor(start.x + nodeSeparation / 2);
        const firstCorner = new geom_1.Point(cornerX, start.y);
        const secondCorner = new geom_1.Point(cornerX, finish.y);
        firstCurve = curve(start, firstCorner, secondCorner);
        secondCurve = curve(firstCorner, secondCorner, finish);
    }
    const indentedStart = new geom_1.Point(start.x - startIndentX, start.y);
    return join(moveTo(indentedStart), firstCurve, secondCurve, lineTo(finish));
};
exports.integralShapePath = integralShapePath;
const path = (start, finish, drawDesign) => {
    switch (drawDesign) {
        case const_1.DrawDesign.INTEGRAL_SHAPE:
            return exports.integralShapePath(start, finish);
        case const_1.DrawDesign.STRAIGHT:
        default:
            return exports.straightPath(start, finish);
    }
};
exports.path = path;
//# sourceMappingURL=draw-utils.js.map