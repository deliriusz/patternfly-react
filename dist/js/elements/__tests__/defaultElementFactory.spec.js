"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const defaultElementFactory_1 = tslib_1.__importDefault(require("../defaultElementFactory"));
const types_1 = require("../../types");
const BaseGraph_1 = tslib_1.__importDefault(require("../BaseGraph"));
const BaseNode_1 = tslib_1.__importDefault(require("../BaseNode"));
const BaseEdge_1 = tslib_1.__importDefault(require("../BaseEdge"));
describe('defaultElementFactory', () => {
    it('should create base elements', () => {
        expect(defaultElementFactory_1.default(types_1.ModelKind.graph, '') instanceof BaseGraph_1.default).toBe(true);
        expect(defaultElementFactory_1.default(types_1.ModelKind.node, '') instanceof BaseNode_1.default).toBe(true);
        expect(defaultElementFactory_1.default(types_1.ModelKind.edge, '') instanceof BaseEdge_1.default).toBe(true);
    });
});
//# sourceMappingURL=defaultElementFactory.spec.js.map