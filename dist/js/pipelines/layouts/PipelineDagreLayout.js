"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PipelineDagreLayout = void 0;
const const_1 = require("../const");
const DagreLayout_1 = require("../../layouts/DagreLayout");
class PipelineDagreLayout extends DagreLayout_1.DagreLayout {
    constructor(graph, options) {
        super(graph, Object.assign({ linkDistance: 0, nodeDistance: 0, groupDistance: 0, collideDistance: 0, simulationSpeed: 0, chargeStrength: 0, allowDrag: false, layoutOnDrag: false, nodesep: const_1.NODE_SEPARATION_VERTICAL, ranksep: const_1.NODE_SEPARATION_HORIZONTAL, edgesep: 50, ranker: 'longest-path', rankdir: 'LR', marginx: 20, marginy: 20 }, options));
    }
    set nodesep(nodesep) {
        super.dagreOptions.nodesep = nodesep;
    }
    set ranksep(ranksep) {
        super.dagreOptions.ranksep = ranksep;
    }
}
exports.PipelineDagreLayout = PipelineDagreLayout;
//# sourceMappingURL=PipelineDagreLayout.js.map