import { Point } from '../../../geom';
import { AbstractAnchor } from '../../../anchors';
export default class TaskNodeTargetAnchor extends AbstractAnchor {
    constructor(owner, whenOffset) {
        super(owner);
        this.whenOffset = 0;
        this.whenOffset = whenOffset;
    }
    getLocation() {
        return this.getReferencePoint();
    }
    getReferencePoint() {
        const bounds = this.owner.getBounds();
        return new Point(bounds.x + this.whenOffset, bounds.y + bounds.height / 2);
    }
}
//# sourceMappingURL=TaskNodeTargetAnchor.js.map