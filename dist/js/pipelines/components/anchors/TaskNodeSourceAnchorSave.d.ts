import { Point } from '../../../geom';
import { AbstractAnchor } from '../../../anchors';
import { Node } from '../../../types';
export default class TaskNodeSourceAnchor<E extends Node = Node> extends AbstractAnchor {
    private pillWidth;
    private whenOffset;
    constructor(owner: E, whenOffset: number, pillWidth: number);
    getLocation(): Point;
    getReferencePoint(): Point;
}
//# sourceMappingURL=TaskNodeSourceAnchorSave.d.ts.map