"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const anchors_1 = require("../../anchors");
const geom_1 = require("../../geom");
const utils_1 = require("../../utils");
class CollapsedGroupAnchor extends anchors_1.AbstractAnchor {
    constructor(owner, width, height, offset = 0) {
        super(owner, offset);
        this.width = width;
        this.height = height;
    }
    getLocation(reference) {
        const center = new geom_1.Point(this.owner.getPosition().x + this.width / 2, this.owner.getPosition().y + this.height / 2);
        const offset2x = this.offset * 2;
        return utils_1.getRectAnchorPoint(center, this.width + offset2x, this.height + offset2x, reference);
    }
}
exports.default = CollapsedGroupAnchor;
//# sourceMappingURL=CollapsedGroupAnchor.js.map