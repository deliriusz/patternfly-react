import { ComponentType } from 'react';
import { Controller, Graph, Edge, Node, ComponentFactory, GraphElement, ElementFactory, Model, EventListener, ModelKind, LayoutFactory, Layout, ViewPaddingSettings } from './types';
import Stateful from './utils/Stateful';
export declare class Visualization extends Stateful implements Controller {
    elements: {
        [id: string]: GraphElement;
    };
    private graph?;
    private viewConstraintsEnabled;
    private viewPaddingSettings;
    private get viewPadding();
    private layoutFactories;
    private componentFactories;
    private elementFactories;
    private eventListeners;
    private fitToScreenListener;
    private readonly store;
    getStore<S = {}>(): S;
    fromModel(model: Model, merge?: boolean): void;
    hasGraph(): boolean;
    getGraph(): Graph;
    setGraph(graph: Graph): void;
    getElements(): GraphElement[];
    toModel(): Model;
    addElement(element: GraphElement): void;
    removeElement(element: GraphElement): void;
    getElementById(id: string): GraphElement | undefined;
    getNodeById(id: string): Node | undefined;
    getEdgeById(id: string): Edge | undefined;
    getComponent(kind: ModelKind, type: string): ComponentType<{
        element: GraphElement;
    }>;
    registerLayoutFactory(factory: LayoutFactory): void;
    getLayout(type: string): Layout | undefined;
    setRenderConstraint(constrained: boolean, viewPadding?: ViewPaddingSettings): void;
    setFitToScreenOnLayout(fitToScreen: boolean, padding?: number): void;
    shouldRenderNode(node: Node): boolean;
    registerComponentFactory(factory: ComponentFactory): void;
    registerElementFactory(factory: ElementFactory): void;
    addEventListener<L extends EventListener = EventListener>(type: string, listener: L): Controller;
    removeEventListener(type: string, listener: EventListener): Controller;
    fireEvent(type: string, ...args: any): void;
    private createElement;
    private initElement;
    private parentOrphansToGraph;
}
//# sourceMappingURL=Visualization.d.ts.map