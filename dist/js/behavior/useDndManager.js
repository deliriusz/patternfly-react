"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.useDndManager = exports.DndManagerImpl = exports.matchesType = void 0;
const tslib_1 = require("tslib");
const mobx_1 = require("mobx");
const useVisualizationController_1 = tslib_1.__importDefault(require("../hooks/useVisualizationController"));
let nextUniqueId = 0;
const getNextUniqueId = () => nextUniqueId++;
const matchesType = (targetType, draggedItemType) => {
    if (draggedItemType === null) {
        return targetType === null;
    }
    return Array.isArray(targetType) ? targetType.some(t => t === draggedItemType) : targetType === draggedItemType;
};
exports.matchesType = matchesType;
class DndManagerImpl {
    constructor(state) {
        this.ending = false;
        // TODO are these really required to be observable?
        this.sources = {};
        this.targets = {};
        this.state = state;
    }
    get dropHints() {
        return this.state.targetIds
            ? this.state.targetIds
                .map(id => {
                const target = this.getTarget(id);
                return target ? target.dropHint(this) : [];
            })
                .filter(x => x)
            : [];
    }
    registerSource(source) {
        const key = `S${getNextUniqueId()}`;
        this.sources[key] = source;
        return [
            key,
            () => {
                delete this.sources[key];
            }
        ];
    }
    registerTarget(target) {
        const key = `T${getNextUniqueId()}`;
        this.targets[key] = target;
        return [
            key,
            () => {
                delete this.targets[key];
            }
        ];
    }
    getDropHints() {
        return this.dropHints;
    }
    canDragSource(sourceId) {
        const source = this.getSource(sourceId);
        if (!source || this.isDragging()) {
            return false;
        }
        return source && source.canDrag(this);
    }
    canDropOnTarget(targetId) {
        const target = this.getTarget(targetId);
        if (!target || !this.isDragging() || this.didDrop()) {
            return false;
        }
        const draggedItemType = this.getItemType();
        return exports.matchesType(target.type, draggedItemType) && target.canDrop(this);
    }
    isDragging() {
        return !!this.state.isDragging;
    }
    isDraggingSource(sourceId) {
        return this.state.sourceId != null && this.state.sourceId === sourceId;
    }
    isOverTarget(targetId, options = { shallow: false }) {
        if (!targetId) {
            return false;
        }
        const { shallow } = options;
        if (!this.isDragging()) {
            return false;
        }
        const target = this.targets[targetId];
        const draggedItemType = this.getItemType();
        if (draggedItemType && !exports.matchesType(target.type, draggedItemType)) {
            return false;
        }
        const targetIds = this.getTargetIds();
        if (!targetIds.length) {
            return false;
        }
        const index = targetIds.indexOf(targetId);
        if (shallow) {
            return index === targetIds.length - 1;
        }
        return index > -1;
    }
    getItemType() {
        return this.state.itemType;
    }
    getItem() {
        return this.state.item;
    }
    getSourceId() {
        return this.state.sourceId;
    }
    getTargetIds() {
        return this.state.targetIds || [];
    }
    hasDropTarget() {
        return !!this.getTargetIds().find(id => this.canDropOnTarget(id));
    }
    getDropResult() {
        return this.state.dropResult;
    }
    didDrop() {
        return !!this.state.didDrop;
    }
    getDragEvent() {
        return this.state.event;
    }
    getOperation() {
        return this.state.operation;
    }
    isCancelled() {
        return !!this.state.cancelled;
    }
    beginDrag(sourceIds, operation, x, y, pageX, pageY) {
        const ids = Array.isArray(sourceIds) ? sourceIds : [sourceIds];
        if (ids.length) {
            let sourceId = null;
            for (let i = ids.length - 1; i >= 0; i--) {
                if (this.canDragSource(ids[i])) {
                    sourceId = ids[i];
                    break;
                }
            }
            if (sourceId) {
                const source = this.getSource(sourceId);
                if (source) {
                    this.state.sourceId = sourceId;
                    this.state.itemType = source.type;
                    this.state.event = {
                        initialPageX: pageX,
                        initialPageY: pageY,
                        pageX,
                        pageY,
                        initialX: x,
                        initialY: y,
                        x,
                        y,
                        dx: 0,
                        dy: 0
                    };
                    this.state.operation = operation;
                    this.state.isDragging = true;
                    this.state.item = source.beginDrag(this);
                }
            }
        }
        this.performHitTests();
    }
    hover(targetIds) {
        const ids = targetIds.filter(id => this.getTarget(id));
        this.state.targetIds = ids;
        ids.forEach(id => {
            const target = this.getTarget(id);
            if (target) {
                target.hover(this);
            }
        });
    }
    endDrag() {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            if (this.ending) {
                return;
            }
            this.ending = true;
            const source = this.getSource(this.getSourceId());
            try {
                if (source) {
                    yield mobx_1.runInAction(() => source.endDrag(this));
                }
            }
            finally {
                this.ending = false;
                mobx_1.runInAction(() => {
                    // clear state
                    delete this.state.didDrop;
                    delete this.state.dropResult;
                    delete this.state.event;
                    delete this.state.isDragging;
                    delete this.state.item;
                    delete this.state.sourceId;
                    delete this.state.targetIds;
                    delete this.state.operation;
                    delete this.state.cancelled;
                });
            }
        });
    }
    drop() {
        this.getTargetIds()
            .filter(id => this.canDropOnTarget(id))
            .reverse()
            .forEach((id, idx) => {
            const target = this.getTarget(id);
            if (target) {
                let result = target.drop(this);
                if (typeof result === 'undefined') {
                    result = idx === 0 ? {} : this.state.dropResult;
                }
                this.state.dropResult = result;
                this.state.didDrop = true;
            }
        });
    }
    drag(x, y, pageX, pageY) {
        if (!this.state.event) {
            throw new Error('Drag event not initialized');
        }
        this.state.event.dx = x - this.state.event.x;
        this.state.event.dy = y - this.state.event.y;
        this.state.event.x = x;
        this.state.event.y = y;
        this.state.event.pageX = pageX;
        this.state.event.pageY = pageY;
        const source = this.getSource(this.getSourceId());
        if (source) {
            source.drag(this);
        }
        this.performHitTests();
    }
    cancel() {
        if (!this.state.event) {
            throw new Error('Drag event not initialized');
        }
        if (this.state.cancelled) {
            return true;
        }
        const source = this.getSource(this.getSourceId());
        if (source && source.canCancel(this)) {
            this.state.cancelled = true;
            this.drag(this.state.event.initialX, this.state.event.initialY, this.state.event.pageX, this.state.event.pageY);
            return true;
        }
        return false;
    }
    performHitTests() {
        const draggedItemType = this.getItemType();
        const event = this.getDragEvent();
        if (event && draggedItemType) {
            const targetIds = [];
            Object.keys(this.targets).forEach(targetId => {
                const target = this.getTarget(targetId);
                if (target && exports.matchesType(target.type, draggedItemType) && target.hitTest(event.x, event.y)) {
                    targetIds.push(targetId);
                }
            });
            this.hover(targetIds);
        }
    }
    getSource(sourceId) {
        return sourceId ? this.sources[sourceId] : undefined;
    }
    getTarget(targetId) {
        return targetId ? this.targets[targetId] : undefined;
    }
}
tslib_1.__decorate([
    mobx_1.observable.shallow
], DndManagerImpl.prototype, "sources", void 0);
tslib_1.__decorate([
    mobx_1.observable.shallow
], DndManagerImpl.prototype, "targets", void 0);
tslib_1.__decorate([
    mobx_1.computed
], DndManagerImpl.prototype, "dropHints", null);
tslib_1.__decorate([
    mobx_1.action
], DndManagerImpl.prototype, "registerSource", null);
tslib_1.__decorate([
    mobx_1.action
], DndManagerImpl.prototype, "registerTarget", null);
tslib_1.__decorate([
    mobx_1.action
], DndManagerImpl.prototype, "beginDrag", null);
tslib_1.__decorate([
    mobx_1.action
], DndManagerImpl.prototype, "hover", null);
tslib_1.__decorate([
    mobx_1.action
], DndManagerImpl.prototype, "drop", null);
tslib_1.__decorate([
    mobx_1.action
], DndManagerImpl.prototype, "drag", null);
tslib_1.__decorate([
    mobx_1.action
], DndManagerImpl.prototype, "cancel", null);
exports.DndManagerImpl = DndManagerImpl;
const useDndManager = () => {
    const controller = useVisualizationController_1.default();
    const store = controller.getStore();
    let { dndManager } = store;
    if (!dndManager) {
        const state = controller.getState();
        let { dragDrop } = state;
        if (!dragDrop) {
            dragDrop = mobx_1.observable.object({});
            state.dragDrop = dragDrop;
        }
        dndManager = new DndManagerImpl(dragDrop);
        store.dndManager = dndManager;
    }
    return dndManager;
};
exports.useDndManager = useDndManager;
//# sourceMappingURL=useDndManager.js.map