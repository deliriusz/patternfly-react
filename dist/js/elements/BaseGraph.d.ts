import Rect from '../geom/Rect';
import Point from '../geom/Point';
import Dimensions from '../geom/Dimensions';
import { Edge, Graph, GraphModel, ModelKind, Node, NodeModel, ScaleExtent, ScaleDetailsLevel, ScaleDetailsThresholds } from '../types';
import BaseElement from './BaseElement';
export default class BaseGraph<E extends GraphModel = GraphModel, D = any> extends BaseElement<E, D> implements Graph<E, D> {
    private layers;
    private scale;
    private layoutType?;
    private dimensions;
    private position;
    private currentLayout?;
    private scaleExtent;
    private get detailsLevel();
    private get edges();
    private get nodes();
    private scaleDetailsThresholds;
    getKind(): ModelKind;
    getLayers(): string[];
    setLayers(layers: string[]): void;
    getScaleExtent(): ScaleExtent;
    setScaleExtent(scaleExtent: ScaleExtent): void;
    getDetailsLevelThresholds(): ScaleDetailsThresholds | undefined;
    setDetailsLevelThresholds(settings: ScaleDetailsThresholds | undefined): void;
    getDetailsLevel(): ScaleDetailsLevel;
    getBounds(): Rect;
    setBounds(bounds: Rect): void;
    getPosition(): Point;
    setPosition(point: Point): void;
    getDimensions(): Dimensions;
    setDimensions(dimensions: Dimensions): void;
    getNodes(): Node[];
    getEdges(): Edge[];
    getLayout(): string | undefined;
    setLayout(layout: string | undefined): void;
    layout(): void;
    getScale(): number;
    setScale(scale: number): void;
    reset(): void;
    scaleBy(scale: number, location?: Point): void;
    fit(padding?: number): void;
    panIntoView: (nodeElement: Node, { offset, minimumVisible }?: {
        offset?: number;
        minimumVisible?: number;
    }) => void;
    isNodeInView(element: Node<NodeModel, any>, { padding }: {
        padding?: number;
    }): boolean;
    setModel(model: E): void;
    toModel(): GraphModel;
    translateToAbsolute(): void;
    translateFromAbsolute(): void;
    destroy(): void;
}
//# sourceMappingURL=BaseGraph.d.ts.map