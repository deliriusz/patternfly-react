"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const geom_1 = require("../../../geom");
const anchors_1 = require("../../../anchors");
class TaskNodeSourceAnchor extends anchors_1.AbstractAnchor {
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
        return new geom_1.Point(bounds.x + this.pillWidth + this.whenOffset, bounds.y + bounds.height / 2);
    }
}
exports.default = TaskNodeSourceAnchor;
//# sourceMappingURL=TaskNodeSourceAnchorSave.js.map