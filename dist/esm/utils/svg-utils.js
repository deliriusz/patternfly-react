/**
 * @param id
 */
export function createSvgIdUrl(id) {
    return `url(${`${window.location.pathname}${window.location.search}`}#${id})`;
}
// Returns the vector 'v' scaled by 'scale'.
/**
 * @param scale
 * @param v
 */
export function vecScale(scale, v) {
    return [scale * v[0], scale * v[1]];
}
// Returns the sum of two vectors, or a combination of a point and a vector.
/**
 * @param pv1
 * @param pv2
 */
export function vecSum(pv1, pv2) {
    return [pv1[0] + pv2[0], pv1[1] + pv2[1]];
}
// Returns the unit normal to the line segment from p0 to p1.
/**
 * @param p0
 * @param p1
 */
export function unitNormal(p0, p1) {
    const n = [p0[1] - p1[1], p1[0] - p0[0]];
    const nLength = Math.sqrt(n[0] * n[0] + n[1] * n[1]);
    return nLength > 0 ? [n[0] / nLength, n[1] / nLength] : [0, 0];
}
// Returns the path for a rounded hull around a single point (a circle).
/**
 * @param polyPoints
 * @param hp
 */
function roundedHull1(polyPoints, hp) {
    const padding = hp(polyPoints[0]);
    const p1 = [polyPoints[0][0], polyPoints[0][1] - padding];
    const p2 = [polyPoints[0][0], polyPoints[0][1] + padding];
    return `M ${p1} A ${padding},${padding},0,0,0,${p2} A ${padding},${padding},0,0,0,${p1}`;
}
// Returns the path for a rounded hull around two points (a "capsule" shape).
/**
 * @param startPoint
 * @param endPoint
 * @param padding
 */
export function boundingBoxForLine(startPoint, endPoint, padding = 0) {
    const hp = typeof padding === 'number' ? () => padding : padding;
    const offsetVector1 = vecScale(hp(startPoint), unitNormal(startPoint, endPoint));
    const invOffsetVector1 = vecScale(-1, offsetVector1);
    const offsetVector2 = vecScale(hp(endPoint), unitNormal(startPoint, endPoint));
    const invOffsetVector2 = vecScale(-1, offsetVector2);
    const p0 = vecSum(startPoint, offsetVector1);
    const p1 = vecSum(endPoint, offsetVector2);
    const p2 = vecSum(endPoint, invOffsetVector2);
    const p3 = vecSum(startPoint, invOffsetVector1);
    return [p0, p1, p2, p3];
}
// Returns the path for a rounded hull around two points (a "capsule" shape).
/**
 * @param polyPoints
 * @param hp
 */
function roundedHull2(polyPoints, hp) {
    const points = boundingBoxForLine(polyPoints[0], polyPoints[1], hp);
    return `M ${points[0]} L ${points[1]} A ${hp(polyPoints[1])},${hp(polyPoints[1])},0,0,0,${points[2]} ${' '}
   L ${points[3]} A ${hp(polyPoints[0])},${hp(polyPoints[0])},0,0,0,${points[0]}`;
}
export const pointTuplesToPath = (segments) => {
    const pathSegments = segments.map((segment, index) => `${index === 0 ? 'M' : 'L'} ${segments[index][0]}  ${segments[index][1]}`);
    pathSegments.push(`L ${segments[0][0]}  ${segments[0][1]}`);
    return pathSegments.join(' ');
};
// Returns the SVG path data string representing the polygon, expanded and rounded.
/**
 * @param polyPoints
 * @param hullPadding
 */
export function hullPath(polyPoints, hullPadding = 0) {
    const hp = typeof hullPadding === 'number' ? () => hullPadding : hullPadding;
    // Handle special cases
    if (!polyPoints || polyPoints.length < 1) {
        return '';
    }
    if (polyPoints.length === 1) {
        return roundedHull1(polyPoints, hp);
    }
    if (polyPoints.length === 2) {
        return roundedHull2(polyPoints, hp);
    }
    const segments = new Array(polyPoints.length);
    // Calculate each offset (outwards) segment of the convex hull.
    for (let segmentIndex = 0; segmentIndex < segments.length; ++segmentIndex) {
        const p0 = segmentIndex === 0 ? polyPoints[polyPoints.length - 1] : polyPoints[segmentIndex - 1];
        const p1 = polyPoints[segmentIndex];
        // Compute the offset vector for the line segment, with length = hullPadding.
        // const offset = vecScale(hullPadding, unitNormal(p0, p1));
        segments[segmentIndex] = [
            vecSum(p0, vecScale(hp(p0), unitNormal(p0, p1))),
            vecSum(p1, vecScale(hp(p1), unitNormal(p0, p1)))
        ];
    }
    return segments
        .map((segment, index) => {
        const p0 = index === 0 ? polyPoints[polyPoints.length - 1] : polyPoints[index - 1];
        return `${index === 0 ? `M ${segments[segments.length - 1][1]} ` : ''}A ${hp(p0)},${hp(p0)},0,0,0,${segment[0]} L ${segment[1]}`;
    })
        .join(' ');
}
//# sourceMappingURL=svg-utils.js.map