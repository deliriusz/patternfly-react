import { NODE_SEPARATION_HORIZONTAL, NODE_SEPARATION_VERTICAL } from '../const';
import { DagreLayout } from '../../layouts/DagreLayout';
export class PipelineDagreLayout extends DagreLayout {
    constructor(graph, options) {
        super(graph, Object.assign({ linkDistance: 0, nodeDistance: 0, groupDistance: 0, collideDistance: 0, simulationSpeed: 0, chargeStrength: 0, allowDrag: false, layoutOnDrag: false, nodesep: NODE_SEPARATION_VERTICAL, ranksep: NODE_SEPARATION_HORIZONTAL, edgesep: 50, ranker: 'longest-path', rankdir: 'LR', marginx: 20, marginy: 20 }, options));
    }
    set nodesep(nodesep) {
        super.dagreOptions.nodesep = nodesep;
    }
    set ranksep(ranksep) {
        super.dagreOptions.ranksep = ranksep;
    }
}
//# sourceMappingURL=PipelineDagreLayout.js.map