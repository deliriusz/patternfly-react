import { Point } from '../../../geom';
import { AbstractAnchor } from '../../../anchors';
export default class TaskNodeSourceAnchor extends AbstractAnchor {
    constructor(owner, whenOffset, pillWidth) {
        super(owner);
        this.pillWidth = 0;
        this.whenOffset = 0;
        this.whenOffset = whenOffset;
        this.pillWidth = pillWidth;
    }
    getLocation() {
        return this.getReferencePoint();
    }
    getReferencePoint() {
        const bounds = this.owner.getBounds();
        return new Point(bounds.x + this.pillWidth + this.whenOffset, bounds.y + bounds.height / 2);
    }
}
//# sourceMappingURL=TaskNodeSourceAnchorSave.js.map