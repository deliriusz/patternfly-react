import { Point } from '../../../geom';
import { AbstractAnchor } from '../../../anchors';
import { Node } from '../../../types';
export default class TaskNodeTargetAnchor<E extends Node = Node> extends AbstractAnchor {
    private whenOffset;
    constructor(owner: E, whenOffset: number);
    getLocation(): Point;
    getReferencePoint(): Point;
}
//# sourceMappingURL=TaskNodeTargetAnchor.d.ts.map