"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class AbstractAnchor {
    constructor(owner, offset = 0) {
        this.owner = owner;
        this.offset = offset;
    }
    getReferencePoint() {
        return this.owner
            .getBounds()
            .getCenter()
            .translate(this.offset, this.offset);
    }
}
exports.default = AbstractAnchor;
//# sourceMappingURL=AbstractAnchor.js.map