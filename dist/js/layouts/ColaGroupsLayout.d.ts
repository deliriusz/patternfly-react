import { Graph, Layout, Node } from '../types';
import { BaseLayout } from './BaseLayout';
import { LayoutLink } from './LayoutLink';
import { LayoutGroup } from './LayoutGroup';
import { LayoutNode } from './LayoutNode';
import { ColaGroupsNode } from './ColaGroupsNode';
import { ColaGroup } from './ColaGroup';
import { ColaLink } from './ColaLink';
import { ColaLayout } from './ColaLayout';
export interface ChildGroup {
    group: LayoutGroup;
    nodes: LayoutNode[];
    edges: LayoutLink[];
    groups: LayoutGroup[];
}
declare class ColaGroupsLayout extends ColaLayout implements Layout {
    private layerNodes;
    private layerGroupNodes;
    private layerGroups;
    private layerEdges;
    private layoutNodes;
    private childLayouts;
    protected initializeLayout(): void;
    protected initializeColaGroupLayout(graph: Graph): void;
    protected createLayoutNode(node: Node, nodeDistance: number, index: number): ColaGroupsNode;
    protected getAllLeaves(group: LayoutGroup): LayoutNode[];
    protected getAllSubGroups(group: LayoutGroup): LayoutGroup[];
    protected isNodeInGroups(node: LayoutNode, groups: LayoutGroup[]): boolean;
    protected isNodeInChildGroups(node: LayoutNode, groups: ChildGroup[]): boolean;
    protected isSubGroup(group: ChildGroup, childGroups: ChildGroup[]): boolean;
    protected getNodeGroup(node: LayoutNode, childGroups: ChildGroup[]): ChildGroup | undefined;
    protected getGroupLayout(graph: Graph, group: LayoutGroup, nodes: LayoutNode[], edges: LayoutLink[], groups: LayoutGroup[]): BaseLayout;
    protected setupLayout(graph: Graph, nodes: LayoutNode[], edges: LayoutLink[], groups: LayoutGroup[]): void;
    private startChildLayout;
    protected startColaLayout(initialRun: boolean, addingNodes: boolean): void;
}
export { ColaGroupsLayout, ColaGroupsNode, ColaGroup, ColaLink };
//# sourceMappingURL=ColaGroupsLayout.d.ts.map