import { PipelineNodeModel, RunStatus, WhenStatus } from '../types';
import { EdgeModel } from '../../types';
export declare const nonShadowModifiers: string[];
export declare const getRunStatusModifier: (status: RunStatus) => string;
export declare const getWhenStatusModifier: (status: WhenStatus) => string;
export declare const getSpacerNodes: (nodes: PipelineNodeModel[], spacerNodeType?: string, finallyNodeTypes?: string[]) => PipelineNodeModel[];
export declare const getEdgesFromNodes: (nodes: PipelineNodeModel[], spacerNodeType?: string, edgeType?: string, spacerEdgeType?: string, finallyNodeTypes?: string[], finallyEdgeType?: string) => EdgeModel[];
//# sourceMappingURL=utils.d.ts.map