import { Edge, Graph, Layout, Node } from '../types';
import { BaseLayout } from './BaseLayout';
import { LayoutOptions } from './LayoutOptions';
import { LayoutLink } from './LayoutLink';
import { LayoutGroup } from './LayoutGroup';
import { LayoutNode } from './LayoutNode';
import { ColaNode } from './ColaNode';
import { ColaGroup } from './ColaGroup';
import { ColaLink } from './ColaLink';
export interface ColaLayoutOptions {
    maxTicks: number;
    initialUnconstrainedIterations: number;
    initialUserConstraintIterations: number;
    initialAllConstraintsIterations: number;
    gridSnapIterations: number;
}
declare class ColaLayout extends BaseLayout implements Layout {
    protected d3Cola: any;
    protected colaOptions: ColaLayoutOptions;
    protected tickCount: number;
    protected destroyed: boolean;
    protected simulationRunning: boolean;
    protected simulationStopped: boolean;
    protected restartOnEnd: boolean;
    protected addingNodes: boolean;
    protected onEnd: () => void;
    constructor(graph: Graph, options?: Partial<ColaLayoutOptions & LayoutOptions>);
    protected initializeLayout(): void;
    protected onSimulationEnd: () => void;
    destroy(): void;
    initDrag(): void;
    protected getConstraints(nodes: ColaNode[], groups: ColaGroup[], edges: ColaLink[]): any[];
    protected stopSimulation(): void;
    protected createLayoutNode(node: Node, nodeDistance: number, index: number): ColaNode;
    protected createLayoutLink(edge: Edge, source: LayoutNode, target: LayoutNode): LayoutLink;
    protected createLayoutGroup(node: Node, padding: number, index: number): ColaGroup;
    protected getFauxEdges(): LayoutLink[];
    protected setupLayout(graph: Graph, nodes: LayoutNode[], edges: LayoutLink[], groups: LayoutGroup[]): void;
    protected startColaLayout(initialRun: boolean, addingNodes: boolean): void;
    protected startLayout(graph: Graph, initialRun: boolean, addingNodes: boolean, onEnd?: () => void): void;
}
export { ColaLayout, ColaNode, ColaGroup, ColaLink };
//# sourceMappingURL=ColaLayout.d.ts.map