import { Edge, Graph, Layout, Node } from '../types';
import { BaseLayout } from './BaseLayout';
import { LayoutOptions } from './LayoutOptions';
import { LayoutNode } from './LayoutNode';
import { LayoutLink } from './LayoutLink';
import { BreadthFirstNode } from './BreadthFirstNode';
import { BreadthFirstGroup } from './BreadthFirstGroup';
export declare type BreadthFirstLayoutOptions = LayoutOptions;
export declare class BreadthFirstLayout extends BaseLayout implements Layout {
    private gridOptions;
    constructor(graph: Graph, options?: Partial<BreadthFirstLayoutOptions>);
    protected createLayoutNode(node: Node, nodeDistance: number, index: number): BreadthFirstNode;
    protected createLayoutLink(edge: Edge, source: LayoutNode, target: LayoutNode, isFalse: boolean): LayoutLink;
    protected createLayoutGroup(node: Node, padding: number, index: number): BreadthFirstGroup;
    protected startLayout(graph: Graph, initialRun: boolean, addingNodes: boolean): void;
}
//# sourceMappingURL=BreadthFirstLayout.d.ts.map