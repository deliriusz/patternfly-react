"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const AbstractAnchor_1 = tslib_1.__importDefault(require("./AbstractAnchor"));
const anchor_utils_1 = require("../utils/anchor-utils");
class CenterAnchor extends AbstractAnchor_1.default {
    getLocation(reference) {
        const bounds = this.owner.getBounds();
        if (this.offset === 0) {
            return bounds.getCenter();
        }
        const offset2x = this.offset * 2;
        return anchor_utils_1.getEllipseAnchorPoint(bounds.getCenter(), offset2x, offset2x, reference);
    }
}
exports.default = CenterAnchor;
//# sourceMappingURL=CenterAnchor.js.map