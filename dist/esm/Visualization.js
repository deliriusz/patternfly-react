import { __decorate } from "tslib";
import { action, computed, observable } from 'mobx';
import * as _ from 'lodash';
import { isEdge, isNode, ModelKind, GRAPH_LAYOUT_END_EVENT } from './types';
import defaultElementFactory from './elements/defaultElementFactory';
import Stateful from './utils/Stateful';
export class Visualization extends Stateful {
    constructor() {
        super(...arguments);
        this.elements = {};
        this.viewConstraintsEnabled = true;
        this.viewPaddingSettings = {
            paddingPercentage: 50
        };
        this.layoutFactories = [];
        this.componentFactories = [];
        this.elementFactories = [defaultElementFactory];
        this.eventListeners = {};
        this.store = {};
    }
    get viewPadding() {
        const { padding, paddingPercentage } = this.viewPaddingSettings;
        if (paddingPercentage) {
            const graph = this.graph;
            if (!graph) {
                return 0;
            }
            const { width: viewWidth, height: viewHeight } = graph.getBounds();
            return Math.max(viewWidth, viewHeight) * graph.getScale() * (paddingPercentage / 100);
        }
        return padding;
    }
    getStore() {
        return this.store;
    }
    fromModel(model, merge = true) {
        const oldGraph = this.graph;
        // If not merging, clear out the old elements
        if (!merge) {
            _.forIn(this.elements, element => this.removeElement(element));
        }
        // Create the graph if given in the model
        if (model.graph) {
            this.graph = this.createElement(ModelKind.graph, model.graph);
            if (!merge && oldGraph) {
                this.graph.setDimensions(oldGraph.getDimensions());
            }
        }
        // Create elements
        const validIds = [];
        const idToElement = {};
        model.nodes &&
            model.nodes.forEach(n => {
                idToElement[n.id] = n;
                this.createElement(ModelKind.node, n);
                validIds.push(n.id);
            });
        model.edges &&
            model.edges.forEach(e => {
                idToElement[e.id] = e;
                this.createElement(ModelKind.edge, e);
                validIds.push(e.id);
            });
        // merge data
        if (model.graph && this.graph) {
            this.graph.setModel(model.graph);
        }
        validIds.push(this.graph.getId());
        const processed = {};
        // process bottom up
        const processElement = (element) => {
            if (element.children) {
                element.children.forEach(id => processElement(idToElement[id]));
            }
            if (!processed[element.id]) {
                processed[element.id] = true;
                this.elements[element.id].setModel(element);
            }
        };
        model.nodes && model.nodes.forEach(processElement);
        model.edges && model.edges.forEach(processElement);
        // remove all stale elements
        if (merge) {
            _.forIn(this.elements, element => {
                if (!validIds.includes(element.getId())) {
                    this.removeElement(element);
                }
            });
            if (oldGraph && oldGraph !== this.graph) {
                this.removeElement(oldGraph);
            }
        }
        if (this.graph) {
            this.parentOrphansToGraph(this.graph, validIds);
        }
    }
    hasGraph() {
        return !!this.graph;
    }
    getGraph() {
        if (!this.graph) {
            throw new Error('Graph has not been set.');
        }
        return this.graph;
    }
    setGraph(graph) {
        if (this.graph !== graph) {
            if (this.graph) {
                this.graph.setController(undefined);
            }
            this.graph = graph;
            graph.setController(this);
            // TODO clean up and populate registries
        }
    }
    getElements() {
        return _.values(this.elements);
    }
    toModel() {
        const graph = this.getGraph();
        const nodes = this.getElements().filter(n => isNode(n));
        const edges = this.getElements().filter(e => isEdge(e));
        return {
            graph: graph.toModel(),
            nodes: nodes.map(n => n.toModel()),
            edges: edges.map(e => e.toModel())
        };
    }
    addElement(element) {
        if (this.elements[element.getId()]) {
            throw new Error(`Duplicate element for ID '${element.getId()}`);
        }
        element.setController(this);
        this.elements[element.getId()] = element;
    }
    removeElement(element) {
        if (this.elements[element.getId()]) {
            element.remove();
            // unparent all of the element's children such that they can be reparented
            element
                .getChildren()
                .slice()
                .forEach(child => child.remove());
            element.destroy();
            element.setController(undefined);
            delete this.elements[element.getId()];
        }
    }
    getElementById(id) {
        return this.elements[id];
    }
    getNodeById(id) {
        const node = this.elements[id];
        if (node && isNode(node)) {
            return node;
        }
        return undefined;
    }
    getEdgeById(id) {
        const edge = this.elements[id];
        if (edge && isEdge(edge)) {
            return edge;
        }
        return undefined;
    }
    getComponent(kind, type) {
        for (const factory of this.componentFactories) {
            const component = factory(kind, type);
            if (component) {
                return component;
            }
        }
        throw new Error(`Could not find component for: Kind '${kind}', Type '${type}'`);
    }
    registerLayoutFactory(factory) {
        this.layoutFactories.unshift(factory);
    }
    getLayout(type) {
        for (const factory of this.layoutFactories) {
            const layout = factory(type, this.getGraph());
            if (layout) {
                return layout;
            }
        }
        throw new Error(`Could not find layout for type: ${type}`);
    }
    setRenderConstraint(constrained, viewPadding) {
        this.viewConstraintsEnabled = constrained;
        // only update the view padding if given, this makes for ease of turning on/off w/o losing settings
        if (viewPadding !== undefined) {
            this.viewPaddingSettings = viewPadding;
        }
    }
    setFitToScreenOnLayout(fitToScreen, padding = 80) {
        if (this.fitToScreenListener) {
            this.removeEventListener(GRAPH_LAYOUT_END_EVENT, this.fitToScreenListener);
        }
        if (fitToScreen) {
            this.fitToScreenListener = ({ graph }) => {
                graph.fit(padding);
            };
            this.addEventListener(GRAPH_LAYOUT_END_EVENT, this.fitToScreenListener);
            return;
        }
    }
    shouldRenderNode(node) {
        if (!this.viewConstraintsEnabled) {
            return true;
        }
        return this.graph.isNodeInView(node, { padding: this.viewPadding });
    }
    registerComponentFactory(factory) {
        this.componentFactories.unshift(factory);
    }
    registerElementFactory(factory) {
        this.elementFactories.unshift(factory);
    }
    addEventListener(type, listener) {
        if (!this.eventListeners[type]) {
            this.eventListeners[type] = [listener];
        }
        else {
            this.eventListeners[type].push(listener);
        }
        return this;
    }
    removeEventListener(type, listener) {
        if (!this.eventListeners[type]) {
            return this;
        }
        const listeners = this.eventListeners[type];
        const l = [];
        for (let i = 0, { length } = listeners; i < length; i++) {
            if (listeners[i] !== listener) {
                l.push(listeners[i]);
            }
        }
        if (l.length) {
            this.eventListeners[type] = l;
        }
        else {
            delete this.eventListeners[type];
        }
        return this;
    }
    fireEvent(type, ...args) {
        const listeners = this.eventListeners[type];
        if (listeners) {
            for (let i = 0, { length } = listeners; i < length; i++) {
                listeners[i](...args);
            }
        }
    }
    createElement(kind, elementModel) {
        const existingElement = this.elements[elementModel.id];
        if (existingElement) {
            return existingElement;
        }
        for (const factory of this.elementFactories) {
            const element = factory(kind, elementModel.type);
            if (element) {
                this.initElement(element, elementModel);
                // cast to return type
                return element;
            }
        }
        throw new Error(`Could not create element for: ${JSON.stringify(elementModel)}`);
    }
    initElement(element, model) {
        // set require fields
        element.setId(model.id);
        element.setType(model.type);
        element.setController(this);
        this.addElement(element);
    }
    parentOrphansToGraph(graph, validIds) {
        this.getElements().forEach((element) => {
            if (element !== this.graph && (!element.hasParent() || !validIds.includes(element.getParent().getId()))) {
                graph.appendChild(element);
            }
        });
    }
}
__decorate([
    observable.shallow
], Visualization.prototype, "elements", void 0);
__decorate([
    observable.ref
], Visualization.prototype, "graph", void 0);
__decorate([
    observable
], Visualization.prototype, "viewConstraintsEnabled", void 0);
__decorate([
    observable.ref
], Visualization.prototype, "viewPaddingSettings", void 0);
__decorate([
    computed
], Visualization.prototype, "viewPadding", null);
__decorate([
    observable.shallow
], Visualization.prototype, "store", void 0);
__decorate([
    action
], Visualization.prototype, "fromModel", null);
__decorate([
    action
], Visualization.prototype, "setGraph", null);
//# sourceMappingURL=Visualization.js.map