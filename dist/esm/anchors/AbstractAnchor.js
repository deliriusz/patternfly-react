export default class AbstractAnchor {
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
//# sourceMappingURL=AbstractAnchor.js.map