import { Point } from '../../geom';
import { DrawDesign, NODE_SEPARATION_HORIZONTAL } from '../const';
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
export const straightPath = (start, finish) => join(moveTo(start), lineTo(finish));
export const integralShapePath = (start, finish, startIndentX = 0, nodeSeparation = NODE_SEPARATION_HORIZONTAL) => {
    // Integral shape: ∫
    let firstCurve = null;
    let secondCurve = null;
    if (start.y !== finish.y) {
        const cornerX = Math.floor(start.x + nodeSeparation / 2);
        const firstCorner = new Point(cornerX, start.y);
        const secondCorner = new Point(cornerX, finish.y);
        firstCurve = curve(start, firstCorner, secondCorner);
        secondCurve = curve(firstCorner, secondCorner, finish);
    }
    const indentedStart = new Point(start.x - startIndentX, start.y);
    return join(moveTo(indentedStart), firstCurve, secondCurve, lineTo(finish));
};
export const path = (start, finish, drawDesign) => {
    switch (drawDesign) {
        case DrawDesign.INTEGRAL_SHAPE:
            return integralShapePath(start, finish);
        case DrawDesign.STRAIGHT:
        default:
            return straightPath(start, finish);
    }
};
//# sourceMappingURL=draw-utils.js.map