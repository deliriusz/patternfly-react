import { Edge, Graph, Layout, Node, ElementChildEventListener, ElementVisibilityChangeEventListener } from '../types';
import { DragEvent, DragOperationWithType } from '../behavior';
import { ForceSimulation } from './ForceSimulation';
import { LayoutNode } from './LayoutNode';
import { LayoutGroup } from './LayoutGroup';
import { LayoutLink } from './LayoutLink';
import { LayoutOptions } from './LayoutOptions';
export declare const LAYOUT_DEFAULTS: LayoutOptions;
export declare class BaseLayout implements Layout {
    protected readonly graph: Graph;
    protected forceSimulation: ForceSimulation;
    protected options: LayoutOptions;
    protected scheduleHandle?: number;
    private scheduleRestart;
    protected nodes: LayoutNode[];
    protected edges: LayoutLink[];
    protected groups: LayoutGroup[];
    protected nodesMap: {
        [id: string]: LayoutNode;
    };
    constructor(graph: Graph, options?: Partial<LayoutOptions>);
    protected onSimulationEnd: () => void;
    destroy(): void;
    protected initDrag(element: Node, event: DragEvent, operation: DragOperationWithType): void;
    protected endDrag(element: Node, event: DragEvent, operation: DragOperationWithType): void;
    handleDragStart: (element: Node, event: DragEvent, operation: DragOperationWithType) => void;
    handleDragEnd: (element: Node, event: DragEvent, operation: DragOperationWithType) => void;
    layout: () => void;
    private startListening;
    stop(): void;
    private stopListening;
    protected handleChildAdded: ElementChildEventListener;
    protected handleChildRemoved: ElementChildEventListener;
    protected handleElementVisibilityChange: ElementVisibilityChangeEventListener;
    private handleNodeCollapse;
    private scheduleLayout;
    protected getFixedNodeDistance: (link: any) => number;
    protected getLayoutNode(nodes: LayoutNode[], node: Node | null): LayoutNode | undefined;
    protected getFauxEdges(groups: LayoutGroup[], nodes: LayoutNode[]): LayoutLink[];
    protected createLayoutNode(node: Node, nodeDistance: number, index: number): LayoutNode;
    protected createLayoutLink(edge: Edge, source: LayoutNode, target: LayoutNode, isFalse?: boolean): LayoutLink;
    protected createLayoutGroup(node: Node, padding: number, index: number): LayoutGroup;
    protected getNodes(leafNodes: Node[], nodeDistance: number): LayoutNode[];
    protected initializeEdgeBendpoints: (edge: Edge) => void;
    protected getLeafNodes: () => Node[];
    protected getGroupNodes: () => Node[];
    protected getLinks(edges: Edge[]): LayoutLink[];
    protected hasVisibleChildren: (group: Node) => boolean;
    protected getNodesFromGroups(groups: Node[], nodeDistance: number, nodeCount: number): LayoutNode[];
    protected getGroups(groups: Node[], nodes: LayoutNode[], padding: number): LayoutGroup[];
    protected initializeNodePositions(nodes: LayoutNode[], graph: Graph, force: boolean): void;
    protected setupLayout(graph: Graph, // eslint-disable-line @typescript-eslint/no-unused-vars
    nodes: LayoutNode[], // eslint-disable-line @typescript-eslint/no-unused-vars
    edges: LayoutLink[], // eslint-disable-line @typescript-eslint/no-unused-vars
    groups: LayoutGroup[]): void;
    protected stopSimulation(): void;
    protected startLayout(graph: Graph, initialRun: boolean, addingNodes: boolean, onEnd?: () => void): void;
    doStartLayout(graph: Graph, initialRun: boolean, addingNodes: boolean, onEnd?: () => void): void;
    protected updateLayout(): void;
    private runLayout;
}
//# sourceMappingURL=BaseLayout.d.ts.map