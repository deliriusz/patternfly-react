import { Point } from '../../geom';
import { DrawDesign } from '../const';
declare type DoubleDraw = (p1: Point, p2: Point, startIndentX?: number, junctionOffset?: number) => string;
export declare const straightPath: DoubleDraw;
export declare const integralShapePath: DoubleDraw;
export declare const path: (start: Point, finish: Point, drawDesign?: DrawDesign) => string;
export {};
//# sourceMappingURL=draw-utils.d.ts.map