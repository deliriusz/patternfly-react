import { Point } from '../../../geom';
import { AbstractAnchor } from '../../../anchors';
import { ScaleDetailsLevel } from '../../../types';
export default class TaskNodeSourceAnchor extends AbstractAnchor {
    constructor(owner, detailsLevel, lowDetailsStatusIconWidth) {
        super(owner);
        this.lowDetailsStatusIconWidth = 0;
        this.detailsLevel = detailsLevel;
        this.lowDetailsStatusIconWidth = lowDetailsStatusIconWidth;
    }
    getLocation() {
        return this.getReferencePoint();
    }
    getReferencePoint() {
        const bounds = this.owner.getBounds();
        if (this.detailsLevel !== ScaleDetailsLevel.high) {
            const scale = this.owner.getGraph().getScale();
            return new Point(bounds.x + this.lowDetailsStatusIconWidth * (1 / scale), bounds.y + bounds.height / 2);
        }
        return new Point(bounds.right(), bounds.y + bounds.height / 2);
    }
}
//# sourceMappingURL=TaskNodeSourceAnchor.js.map