"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getDefaultShapeDecoratorCenter = exports.getShapeComponent = exports.getPathForSides = exports.getHullPath = exports.getPointsForSides = exports.DEFAULT_DECORATOR_PADDING = exports.DEFAULT_DECORATOR_RADIUS = exports.UPPER_RIGHT_RADIANS = exports.UPPER_LEFT_RADIANS = exports.LOWER_RIGHT_RADIANS = exports.LOWER_LEFT_RADIANS = exports.TRAPEZOID_CORNER_RADIUS = exports.RHOMBUS_CORNER_RADIUS = exports.OCTAGON_CORNER_RADIUS = exports.HEXAGON_CORNER_RADIUS = void 0;
const types_1 = require("../../../types");
const d3_polygon_1 = require("d3-polygon");
const utils_1 = require("../../../utils");
const index_1 = require("./index");
const TWO_PI = Math.PI * 2;
exports.HEXAGON_CORNER_RADIUS = 6;
exports.OCTAGON_CORNER_RADIUS = 4;
exports.RHOMBUS_CORNER_RADIUS = 10;
exports.TRAPEZOID_CORNER_RADIUS = 10;
exports.LOWER_LEFT_RADIANS = (3 * Math.PI) / 4;
exports.LOWER_RIGHT_RADIANS = Math.PI / 4;
exports.UPPER_LEFT_RADIANS = (5 * Math.PI) / 4;
exports.UPPER_RIGHT_RADIANS = (7 * Math.PI) / 4;
exports.DEFAULT_DECORATOR_RADIUS = 12;
exports.DEFAULT_DECORATOR_PADDING = 4;
const quadrantRadians = (quadrant) => {
    switch (quadrant) {
        case types_1.TopologyQuadrant.upperRight:
            return exports.UPPER_RIGHT_RADIANS;
        case types_1.TopologyQuadrant.lowerRight:
            return exports.LOWER_RIGHT_RADIANS;
        case types_1.TopologyQuadrant.upperLeft:
            return exports.UPPER_LEFT_RADIANS;
        case types_1.TopologyQuadrant.lowerLeft:
            return exports.LOWER_LEFT_RADIANS;
    }
    return exports.UPPER_RIGHT_RADIANS;
};
const getPointsForSides = (numSides, size, padding = 0) => {
    const points = [];
    const angle = TWO_PI / numSides;
    const radius = size / 2;
    for (let point = 0; point < numSides; point++) {
        points.push([
            radius + (radius - padding) * Math.cos(angle * point),
            radius + (radius - padding) * Math.sin(angle * point)
        ]);
    }
    return points;
};
exports.getPointsForSides = getPointsForSides;
const getHullPath = (points, padding) => {
    const hullPoints = d3_polygon_1.polygonHull(points);
    return utils_1.hullPath(hullPoints, padding);
};
exports.getHullPath = getHullPath;
const getPathForSides = (numSides, size, padding = 0) => {
    const points = exports.getPointsForSides(numSides, size, padding);
    if (!padding) {
        return utils_1.pointTuplesToPath(points);
    }
    return exports.getHullPath(points, padding);
};
exports.getPathForSides = getPathForSides;
const getShapeComponent = (node) => {
    switch (node.getNodeShape()) {
        case types_1.NodeShape.circle:
        case types_1.NodeShape.ellipse:
            return index_1.Ellipse;
        case types_1.NodeShape.stadium:
            return index_1.Stadium;
        case types_1.NodeShape.rhombus:
            return index_1.Rhombus;
        case types_1.NodeShape.trapezoid:
            return index_1.Trapezoid;
        case types_1.NodeShape.rect:
            return index_1.Rectangle;
        case types_1.NodeShape.hexagon:
            return index_1.Hexagon;
        case types_1.NodeShape.octagon:
            return index_1.Octagon;
        default:
            return index_1.Ellipse;
    }
};
exports.getShapeComponent = getShapeComponent;
const getDefaultShapeDecoratorCenter = (quadrant, node) => {
    const { width, height } = node.getDimensions();
    const shape = node.getNodeShape();
    const nodeCenterX = width / 2;
    const nodeCenterY = height / 2;
    let deltaX = width / 2;
    let deltaY = height / 2;
    switch (shape) {
        case types_1.NodeShape.circle:
        case types_1.NodeShape.ellipse:
            return {
                x: nodeCenterX + Math.cos(quadrantRadians(quadrant)) * deltaX,
                y: nodeCenterY + Math.sin(quadrantRadians(quadrant)) * deltaY
            };
        case types_1.NodeShape.rect:
            break;
        case types_1.NodeShape.rhombus:
            deltaX = width / 3;
            deltaY = height / 3;
            break;
        case types_1.NodeShape.trapezoid:
            if (quadrant === types_1.TopologyQuadrant.upperRight || quadrant === types_1.TopologyQuadrant.upperLeft) {
                deltaX = deltaX * 0.875 - exports.TRAPEZOID_CORNER_RADIUS;
            }
            break;
        case types_1.NodeShape.hexagon:
            deltaX = deltaX * 0.75 - exports.HEXAGON_CORNER_RADIUS;
            deltaY = deltaY * 0.75;
            break;
        case types_1.NodeShape.octagon:
            deltaX = deltaX - exports.OCTAGON_CORNER_RADIUS;
            deltaY = deltaY - height / 5;
            break;
        default:
            break;
    }
    switch (quadrant) {
        case types_1.TopologyQuadrant.upperRight:
            return {
                x: nodeCenterX + deltaX,
                y: nodeCenterY - deltaY
            };
        case types_1.TopologyQuadrant.lowerRight:
            return {
                x: nodeCenterX + deltaX,
                y: nodeCenterY + deltaY
            };
        case types_1.TopologyQuadrant.upperLeft:
            return {
                x: nodeCenterX - deltaX,
                y: nodeCenterY - deltaY
            };
        case types_1.TopologyQuadrant.lowerLeft:
            return {
                x: nodeCenterX - deltaX,
                y: nodeCenterY + deltaY
            };
        default:
            return {
                x: nodeCenterX,
                y: nodeCenterY
            };
    }
};
exports.getDefaultShapeDecoratorCenter = getDefaultShapeDecoratorCenter;
//# sourceMappingURL=shapeUtils.js.map