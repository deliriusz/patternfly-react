import { Edge, Graph, Layout, Node } from '../types';
import { BaseLayout } from './BaseLayout';
import { LayoutOptions } from './LayoutOptions';
import { LayoutNode } from './LayoutNode';
import { LayoutLink } from './LayoutLink';
import { GridNode } from './GridNode';
import { GridGroup } from './GridGroup';
export declare type GridLayoutOptions = LayoutOptions;
export declare class GridLayout extends BaseLayout implements Layout {
    private gridOptions;
    constructor(graph: Graph, options?: Partial<GridLayoutOptions>);
    protected createLayoutNode(node: Node, nodeDistance: number, index: number): GridNode;
    protected createLayoutLink(edge: Edge, source: LayoutNode, target: LayoutNode, isFalse: boolean): LayoutLink;
    protected createLayoutGroup(node: Node, padding: number, index: number): GridGroup;
    protected startLayout(graph: Graph, initialRun: boolean, addingNodes: boolean): void;
}
//# sourceMappingURL=GridLayout.d.ts.map