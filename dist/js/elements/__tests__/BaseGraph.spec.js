"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const Rect_1 = tslib_1.__importDefault(require("../../geom/Rect"));
const Point_1 = tslib_1.__importDefault(require("../../geom/Point"));
const types_1 = require("../../types");
const BaseGraph_1 = tslib_1.__importDefault(require("../BaseGraph"));
const BaseEdge_1 = tslib_1.__importDefault(require("../BaseEdge"));
const BaseNode_1 = tslib_1.__importDefault(require("../BaseNode"));
const Visualization_1 = require("../../Visualization");
class TestLayout {
    constructor() {
        this.layout = jest.fn();
        this.stop = jest.fn();
        this.destroy = jest.fn();
    }
}
describe('BaseGraph', () => {
    let graph;
    beforeEach(() => {
        graph = new BaseGraph_1.default();
    });
    it('should have a graph kind', () => {
        expect(graph.getKind()).toBe(types_1.ModelKind.graph);
    });
    it('should update bounds', () => {
        expect(graph.getBounds()).toEqual({ x: 0, y: 0, width: 0, height: 0 });
        const r = new Rect_1.default(10, 20, 30, 40);
        graph.setBounds(r);
        expect(graph.getBounds()).toEqual({ x: 10, y: 20, width: 30, height: 40 });
    });
    it('should update scale', () => {
        expect(graph.getScale()).toBe(1);
        graph.setScale(3.5);
        expect(graph.getScale()).toBe(3.5);
    });
    it('should reset position and scale', () => {
        graph.setBounds(new Rect_1.default(10, 20, 30, 40));
        graph.setScale(2);
        graph.reset();
        expect(graph.getScale()).toBe(1);
        expect(graph.getBounds()).toEqual({ x: 0, y: 0, width: 30, height: 40 });
    });
    it('should scaleBy the given multiple around the specified location', () => {
        graph.setBounds(new Rect_1.default(0, 0, 100, 100));
        graph.scaleBy(0.5);
        expect(graph.getScale()).toBe(0.5);
        expect(graph.getBounds()).toEqual({ x: 25, y: 25, width: 100, height: 100 });
        graph.scaleBy(2);
        expect(graph.getBounds()).toEqual({ x: 0, y: 0, width: 100, height: 100 });
        graph.scaleBy(0.5, new Point_1.default(100, 100));
        expect(graph.getBounds()).toEqual({ x: 50, y: 50, width: 100, height: 100 });
    });
    it('should get child nodes and edges', () => {
        const e1 = new BaseEdge_1.default();
        const n1 = new BaseNode_1.default();
        const n2 = new BaseNode_1.default();
        graph.appendChild(e1);
        graph.appendChild(n1);
        graph.appendChild(n2);
        expect(graph.getNodes()).toEqual([n1, n2]);
        expect(graph.getEdges()).toEqual([e1]);
        // FIXME #getChildren() returns a mobx array and we need to slice it before we can assert
        expect(graph.getChildren().slice()).toEqual([e1, n1, n2]);
    });
    it('should get and set layouts', () => {
        const LAYOUT1_TYPE = 'layout1';
        const LAYOUT2_TYPE = 'layout2';
        const layout1 = new TestLayout();
        const layout2 = new TestLayout();
        const controller = new Visualization_1.Visualization();
        controller.setGraph(graph);
        controller.registerLayoutFactory(type => {
            switch (type) {
                case LAYOUT1_TYPE:
                    return layout1;
                case LAYOUT2_TYPE:
                    return layout2;
                default:
                    return undefined;
            }
        });
        expect(graph.getLayout()).toBe(undefined);
        // set initial layout
        graph.setLayout(LAYOUT1_TYPE);
        expect(graph.getLayout()).toBe(LAYOUT1_TYPE);
        // run layout
        expect(layout1.layout).not.toHaveBeenCalled();
        graph.layout();
        expect(layout1.layout).toHaveBeenCalledTimes(1);
        // change layout
        expect(layout2.destroy).not.toHaveBeenCalled();
        graph.setLayout(LAYOUT2_TYPE);
        expect(graph.getLayout()).toBe(LAYOUT2_TYPE);
        expect(layout1.destroy).toHaveBeenCalledTimes(1);
        // set the same layout, ensure not destroyed
        graph.setLayout(LAYOUT2_TYPE);
        expect(layout2.destroy).not.toHaveBeenCalled();
        // unset layout
        graph.setLayout(undefined);
        expect(layout2.destroy).toHaveBeenCalledTimes(1);
        // this should be a noop
        graph.layout();
    });
    it('should adjust bounds to fit nodes', () => {
        graph.setBounds(new Rect_1.default(0, 0, 100, 100));
        graph.setScaleExtent([0.1, 100]);
        // no change if no nodes
        graph.fit();
        expect(graph.getScale()).toBe(1);
        expect(graph.getBounds()).toEqual({ x: 0, y: 0, width: 100, height: 100 });
        // add 1 node
        const n1 = new BaseNode_1.default();
        n1.setBounds(new Rect_1.default(10, 10, 10, 10));
        graph.appendChild(n1);
        // centers the node in the view
        graph.fit();
        expect(graph.getScale()).toBe(1);
        expect(graph.getBounds()).toEqual({ x: 35, y: 35, width: 100, height: 100 });
        // increases scale back to 1 if nodes fit
        graph.setScale(0.25);
        graph.fit();
        expect(graph.getScale()).toBe(1);
        expect(graph.getBounds()).toEqual({ x: 35, y: 35, width: 100, height: 100 });
        // keeps scale above 1 if nodes fit
        graph.setScale(2);
        graph.fit();
        expect(graph.getScale()).toBe(2);
        expect(graph.getBounds()).toEqual({ x: 20, y: 20, width: 100, height: 100 });
        // decreases scale so that nodes fit
        graph.setScale(100);
        graph.fit();
        expect(graph.getScale()).toBe(10);
        expect(graph.getBounds()).toEqual({ x: -100, y: -100, width: 100, height: 100 });
        // add another node out of bounds
        const n2 = new BaseNode_1.default();
        n2.setBounds(new Rect_1.default(200, 200, 10, 10));
        graph.appendChild(n2);
        // adjusts scale as needed to ensure all nodes fit
        graph.fit();
        expect(graph.getScale()).toBe(0.5);
        expect(graph.getBounds()).toEqual({ x: -5, y: -5, width: 100, height: 100 });
        // add some padding
        graph.fit(20);
        expect(graph.getScale()).toBe(0.4);
        expect(graph.getBounds()).toEqual({ x: 6, y: 6, width: 100, height: 100 });
    });
    it('should pan node into view', () => {
        const n1 = new BaseNode_1.default();
        graph.appendChild(n1);
        // pan from left
        graph.setBounds(new Rect_1.default(0, 0, 100, 100));
        n1.setBounds(new Rect_1.default(-20, 0, 10, 10));
        graph.panIntoView(n1);
        expect(graph.getBounds()).toEqual({ x: 20, y: 0, width: 100, height: 100 });
        // with offset
        graph.setBounds(new Rect_1.default(0, 0, 100, 100));
        n1.setBounds(new Rect_1.default(-20, 0, 10, 10));
        graph.panIntoView(n1, { offset: 10 });
        expect(graph.getBounds()).toEqual({ x: 30, y: 0, width: 100, height: 100 });
        // pan from top
        graph.setBounds(new Rect_1.default(0, 0, 100, 100));
        n1.setBounds(new Rect_1.default(0, -20, 10, 10));
        graph.panIntoView(n1);
        expect(graph.getBounds()).toEqual({ x: 0, y: 20, width: 100, height: 100 });
        // with offset
        graph.setBounds(new Rect_1.default(0, 0, 100, 100));
        n1.setBounds(new Rect_1.default(0, -20, 10, 10));
        graph.panIntoView(n1, { offset: 10 });
        expect(graph.getBounds()).toEqual({ x: 0, y: 30, width: 100, height: 100 });
        // pan from right
        graph.setBounds(new Rect_1.default(0, 0, 100, 100));
        n1.setBounds(new Rect_1.default(110, 0, 10, 10));
        graph.panIntoView(n1);
        expect(graph.getBounds()).toEqual({ x: -20, y: 0, width: 100, height: 100 });
        // with offset
        graph.setBounds(new Rect_1.default(0, 0, 100, 100));
        n1.setBounds(new Rect_1.default(110, 0, 10, 10));
        graph.panIntoView(n1, { offset: 10 });
        expect(graph.getBounds()).toEqual({ x: -30, y: 0, width: 100, height: 100 });
        // pan from top
        graph.setBounds(new Rect_1.default(0, 0, 100, 100));
        n1.setBounds(new Rect_1.default(0, 110, 10, 10));
        graph.panIntoView(n1);
        expect(graph.getBounds()).toEqual({ x: 0, y: -20, width: 100, height: 100 });
        // with offset
        graph.setBounds(new Rect_1.default(0, 0, 100, 100));
        n1.setBounds(new Rect_1.default(0, 110, 10, 10));
        graph.panIntoView(n1, { offset: 10 });
        expect(graph.getBounds()).toEqual({ x: 0, y: -30, width: 100, height: 100 });
    });
    it('should pan node into view taking into account minimum visibile ', () => {
        const n1 = new BaseNode_1.default();
        graph.appendChild(n1);
        // pan from left / top
        graph.setBounds(new Rect_1.default(0, 0, 100, 100));
        n1.setBounds(new Rect_1.default(-7, -7, 10, 10));
        graph.panIntoView(n1, { minimumVisible: 3 });
        expect(graph.getBounds()).toEqual({ x: 0, y: 0, width: 100, height: 100 });
        n1.setBounds(new Rect_1.default(-8, -8, 10, 10));
        graph.panIntoView(n1, { minimumVisible: 3 });
        expect(graph.getBounds()).toEqual({ x: 8, y: 8, width: 100, height: 100 });
        // pan from right / bottom
        graph.setBounds(new Rect_1.default(0, 0, 100, 100));
        n1.setBounds(new Rect_1.default(97, 97, 10, 10));
        graph.panIntoView(n1, { minimumVisible: 3 });
        expect(graph.getBounds()).toEqual({ x: 0, y: 0, width: 100, height: 100 });
        n1.setBounds(new Rect_1.default(98, 98, 10, 10));
        graph.panIntoView(n1, { minimumVisible: 3 });
        expect(graph.getBounds()).toEqual({ x: -8, y: -8, width: 100, height: 100 });
    });
    it('should set model layout', () => {
        const layoutType = 'test';
        const controller = new Visualization_1.Visualization();
        controller.setGraph(graph);
        controller.registerLayoutFactory(type => {
            return type === layoutType ? new TestLayout() : undefined;
        });
        const model = {
            id: 'g',
            type: types_1.ModelKind.graph,
            layout: layoutType
        };
        graph.setModel(model);
        expect(graph.getLayout()).toBe(model.layout);
    });
    it('should set model scale', () => {
        const model = {
            id: 'g',
            type: types_1.ModelKind.graph,
            scale: 4
        };
        graph.setModel(model);
        expect(graph.getScale()).toBe(model.scale);
    });
    it('should set model x, y', () => {
        const model1 = {
            id: 'g',
            type: types_1.ModelKind.graph,
            x: 10
        };
        graph.setModel(model1);
        expect(graph.getBounds().x).toBe(model1.x);
        const model2 = {
            id: 'g',
            type: types_1.ModelKind.graph,
            y: 20
        };
        graph.setModel(model2);
        expect(graph.getBounds().x).toBe(model1.x);
        expect(graph.getBounds().y).toBe(model2.y);
        const model3 = {
            id: 'g',
            type: types_1.ModelKind.graph,
            x: 2,
            y: 3
        };
        graph.setModel(model3);
        expect(graph.getBounds().x).toBe(model3.x);
        expect(graph.getBounds().y).toBe(model3.y);
    });
    it('should not support translate', () => {
        graph.setBounds(new Rect_1.default(10, 20, 30, 40));
        const p = new Point_1.default(5, 6);
        graph.translateFromAbsolute(p);
        expect(p).toEqual({ x: 5, y: 6 });
        graph.translateToParent(p);
        expect(p).toEqual({ x: 5, y: 6 });
    });
    it('should set scale extents based on model', () => {
        graph.setModel({
            id: 'test-graph-id',
            type: 'graph',
            scaleExtent: [0.2, 3.0],
            scale: 5.5
        });
        expect(graph.getScale()).toBe(5.5);
        const scaleExtent = graph.getScaleExtent();
        expect(scaleExtent[0]).toBe(0.2);
        expect(scaleExtent[1]).toBe(3.0);
        // Scale extents do NOT prevent setting scale out of range
        graph.setScale(10);
        expect(graph.getScale()).toBe(10);
        graph.setScale(0.1);
        expect(graph.getScale()).toBe(0.1);
    });
});
//# sourceMappingURL=BaseGraph.spec.js.map