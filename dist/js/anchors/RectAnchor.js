"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const anchor_utils_1 = require("../utils/anchor-utils");
const AbstractAnchor_1 = tslib_1.__importDefault(require("./AbstractAnchor"));
class RectAnchor extends AbstractAnchor_1.default {
    getLocation(reference) {
        const r = this.owner.getBounds();
        const center = r.getCenter();
        if (r.isEmpty()) {
            return center;
        }
        const offset2x = this.offset * 2;
        return anchor_utils_1.getRectAnchorPoint(center, r.width + offset2x, r.height + offset2x, reference);
    }
}
exports.default = RectAnchor;
//# sourceMappingURL=RectAnchor.js.map