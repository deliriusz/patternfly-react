"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const geom_1 = require("../../../geom");
const anchors_1 = require("../../../anchors");
class TaskNodeTargetAnchor extends anchors_1.AbstractAnchor {
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
        return new geom_1.Point(bounds.x + this.whenOffset, bounds.y + bounds.height / 2);
    }
}
exports.default = TaskNodeTargetAnchor;
//# sourceMappingURL=TaskNodeTargetAnchor.js.map