import Point from '../geom/Point';
import AbstractAnchor from './AbstractAnchor';
import { Rect } from '../geom';
import { PointTuple } from '../types';
export default class PolygonAnchor extends AbstractAnchor {
    private points?;
    setPoints(points: PointTuple[]): void;
    getLocation(reference: Point): Point;
    getBoundingBox(): Rect;
    getReferencePoint(): Point;
}
//# sourceMappingURL=PolygonAnchor.d.ts.map