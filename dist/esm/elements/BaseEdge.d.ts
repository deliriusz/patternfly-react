import Point from '../geom/Point';
import { Edge, EdgeAnimationSpeed, EdgeModel, EdgeStyle, ModelKind, Node } from '../types';
import BaseElement from './BaseElement';
export default class BaseEdge<E extends EdgeModel = EdgeModel, D = any> extends BaseElement<E, D> implements Edge<E, D> {
    private source?;
    private target?;
    private edgeStyle?;
    private animationSpeed?;
    private bendpoints?;
    private startPoint?;
    private endPoint?;
    private get sourceAnchor();
    private get targetAnchor();
    getKind(): ModelKind;
    getSource(): Node;
    setSource(source: Node): void;
    getTarget(): Node;
    setTarget(target: Node): void;
    getEdgeStyle(): EdgeStyle;
    setEdgeStyle(edgeStyle: EdgeStyle): void;
    getEdgeAnimationSpeed(): EdgeAnimationSpeed;
    setEdgeAnimationSpeed(animationSpeed?: EdgeAnimationSpeed): void;
    getSourceAnchorNode(): Node;
    getTargetAnchorNode(): Node;
    getBendpoints(): Point[];
    setBendpoints(points: Point[]): void;
    removeBendpoint(point: Point | number): void;
    getStartPoint(): Point;
    setStartPoint(x?: number, y?: number): void;
    getEndPoint(): Point;
    setEndPoint(x?: number, y?: number): void;
    setModel(model: E): void;
    toModel(): EdgeModel;
}
//# sourceMappingURL=BaseEdge.d.ts.map