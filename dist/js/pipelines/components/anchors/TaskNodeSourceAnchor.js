"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const geom_1 = require("../../../geom");
const anchors_1 = require("../../../anchors");
const types_1 = require("../../../types");
class TaskNodeSourceAnchor extends anchors_1.AbstractAnchor {
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
        if (this.detailsLevel !== types_1.ScaleDetailsLevel.high) {
            const scale = this.owner.getGraph().getScale();
            return new geom_1.Point(bounds.x + this.lowDetailsStatusIconWidth * (1 / scale), bounds.y + bounds.height / 2);
        }
        return new geom_1.Point(bounds.right(), bounds.y + bounds.height / 2);
    }
}
exports.default = TaskNodeSourceAnchor;
//# sourceMappingURL=TaskNodeSourceAnchor.js.map