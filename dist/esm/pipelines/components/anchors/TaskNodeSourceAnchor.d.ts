import { Point } from '../../../geom';
import { AbstractAnchor } from '../../../anchors';
import { Node, ScaleDetailsLevel } from '../../../types';
export default class TaskNodeSourceAnchor<E extends Node = Node> extends AbstractAnchor {
    private detailsLevel;
    private lowDetailsStatusIconWidth;
    constructor(owner: E, detailsLevel: ScaleDetailsLevel, lowDetailsStatusIconWidth: number);
    getLocation(): Point;
    getReferencePoint(): Point;
}
//# sourceMappingURL=TaskNodeSourceAnchor.d.ts.map