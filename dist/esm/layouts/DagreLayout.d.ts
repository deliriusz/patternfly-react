import * as dagre from 'dagre';
import { Edge, Graph, Layout, Node } from '../types';
import { BaseLayout } from './BaseLayout';
import { LayoutOptions } from './LayoutOptions';
import { LayoutLink } from './LayoutLink';
import { LayoutNode } from './LayoutNode';
import { DagreNode } from './DagreNode';
import { DagreGroup } from './DagreGroup';
import { DagreLink } from './DagreLink';
export declare type DagreLayoutOptions = LayoutOptions & dagre.GraphLabel & {
    ignoreGroups?: boolean;
};
export declare class DagreLayout extends BaseLayout implements Layout {
    protected dagreOptions: DagreLayoutOptions;
    constructor(graph: Graph, options?: Partial<DagreLayoutOptions>);
    protected createLayoutNode(node: Node, nodeDistance: number, index: number): DagreNode;
    protected createLayoutLink(edge: Edge, source: LayoutNode, target: LayoutNode, isFalse: boolean): LayoutLink;
    protected createLayoutGroup(node: Node, padding: number, index: number): DagreGroup;
    protected updateEdgeBendpoints(edges: DagreLink[]): void;
    protected getFauxEdges(): LayoutLink[];
    protected startLayout(graph: Graph, initialRun: boolean, addingNodes: boolean): void;
}
//# sourceMappingURL=DagreLayout.d.ts.map