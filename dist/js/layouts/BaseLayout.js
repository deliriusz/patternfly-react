"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BaseLayout = exports.LAYOUT_DEFAULTS = void 0;
const tslib_1 = require("tslib");
const _ = tslib_1.__importStar(require("lodash"));
const mobx_1 = require("mobx");
const types_1 = require("../types");
const utils_1 = require("../utils");
const behavior_1 = require("../behavior");
const elements_1 = require("../elements");
const ForceSimulation_1 = require("./ForceSimulation");
const LayoutNode_1 = require("./LayoutNode");
const LayoutGroup_1 = require("./LayoutGroup");
const LayoutLink_1 = require("./LayoutLink");
exports.LAYOUT_DEFAULTS = {
    linkDistance: 60,
    nodeDistance: 35,
    groupDistance: 35,
    collideDistance: 0,
    simulationSpeed: 10,
    chargeStrength: 0,
    allowDrag: true,
    layoutOnDrag: true
};
class BaseLayout {
    constructor(graph, options) {
        this.scheduleRestart = false;
        this.nodes = [];
        this.edges = [];
        this.groups = [];
        this.nodesMap = {};
        this.onSimulationEnd = () => { };
        this.handleDragStart = (element, event, operation) => {
            this.initDrag(element, event, operation);
            if (!this.options.layoutOnDrag) {
                return;
            }
            if (operation.type !== behavior_1.DRAG_MOVE_OPERATION) {
                this.forceSimulation.stopSimulation();
                return;
            }
            const id = element.getId();
            let found = false;
            const dragNode = this.nodes.find((node) => node.id === id);
            if (dragNode) {
                dragNode.isFixed = true;
                found = true;
            }
            else {
                const dragGroup = this.groups.find((group) => group.id === id);
                if (dragGroup) {
                    const groupNodes = dragGroup.leaves;
                    groupNodes.forEach((node) => {
                        node.isFixed = true;
                    });
                    found = true;
                }
            }
            if (found) {
                this.forceSimulation.alphaTarget(0.1);
                this.forceSimulation.restart();
            }
        };
        this.handleDragEnd = (element, event, operation) => {
            this.endDrag(element, event, operation);
            if (!this.options.layoutOnDrag) {
                return;
            }
            if (operation.type !== behavior_1.DRAG_MOVE_OPERATION) {
                this.forceSimulation.restart();
                return;
            }
            const id = element.getId();
            const dragNode = this.nodes.find((node) => node.id === id);
            if (dragNode) {
                dragNode.isFixed = false;
            }
            else {
                const dragGroup = this.groups.find((group) => group.id === id);
                if (dragGroup) {
                    const groupNodes = dragGroup.leaves;
                    groupNodes.forEach((node) => {
                        node.isFixed = false;
                    });
                }
            }
            this.forceSimulation.alphaTarget(0);
        };
        this.layout = () => {
            this.stopListening();
            this.runLayout(true);
            this.startListening();
        };
        this.handleChildAdded = ({ child }) => {
            if (!this.nodesMap[child.getId()]) {
                this.scheduleRestart = true;
                this.scheduleLayout();
            }
        };
        this.handleChildRemoved = ({ child }) => {
            if (this.nodesMap[child.getId()]) {
                this.scheduleRestart = true;
                this.scheduleLayout();
            }
        };
        this.handleElementVisibilityChange = (event) => {
            if (event.visible === (this.nodesMap[event.target.getId()] === undefined)) {
                this.scheduleRestart = true;
                this.scheduleLayout();
            }
        };
        this.handleNodeCollapse = ({ node }) => {
            if (!node.isCollapsed()) {
                this.scheduleRestart = true;
                this.scheduleLayout();
            }
        };
        this.scheduleLayout = () => {
            if (!this.scheduleHandle) {
                this.scheduleHandle = window.requestAnimationFrame(() => {
                    delete this.scheduleHandle;
                    try {
                        this.runLayout(false, this.scheduleRestart);
                        this.scheduleRestart = false;
                        // eslint-disable-next-line no-empty
                    }
                    catch (e) { }
                });
            }
        };
        this.getFixedNodeDistance = (link) => Math.sqrt(Math.pow((link.sourceNode.x - link.targetNode.x), 2) + Math.pow((link.sourceNode.y - link.targetNode.y), 2));
        // Default is to clear any initial bend points
        this.initializeEdgeBendpoints = (edge) => {
            // remove any bendpoints
            if (edge.getBendpoints().length > 0) {
                edge.setBendpoints([]);
            }
        };
        this.getLeafNodes = () => utils_1.leafNodeElements(this.graph.getNodes()).filter(n => n.isVisible());
        this.getGroupNodes = () => utils_1.groupNodeElements(this.graph.getNodes()).filter(g => g.isVisible());
        this.hasVisibleChildren = (group) => !!group.getNodes().find(c => types_1.isNode(c) && c.isVisible());
        this.graph = graph;
        this.options = Object.assign(Object.assign(Object.assign({}, exports.LAYOUT_DEFAULTS), { onSimulationEnd: this.onSimulationEnd }), options);
        if (this.options.allowDrag) {
            graph
                .getController()
                .addEventListener(behavior_1.DRAG_NODE_START_EVENT, this.handleDragStart)
                .addEventListener(behavior_1.DRAG_NODE_END_EVENT, this.handleDragEnd);
        }
        this.forceSimulation = new ForceSimulation_1.ForceSimulation(this.options);
        this.startListening();
    }
    destroy() {
        if (this.options.allowDrag) {
            this.graph
                .getController()
                .removeEventListener(behavior_1.DRAG_NODE_START_EVENT, this.handleDragStart)
                .removeEventListener(behavior_1.DRAG_NODE_END_EVENT, this.handleDragEnd);
        }
        this.stopListening();
        this.forceSimulation.destroy();
    }
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    initDrag(element, event, operation) { }
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    endDrag(element, event, operation) { }
    startListening() {
        const controller = this.graph.getController();
        if (controller) {
            controller.addEventListener(types_1.ADD_CHILD_EVENT, this.handleChildAdded);
            controller.addEventListener(types_1.REMOVE_CHILD_EVENT, this.handleChildRemoved);
            controller.addEventListener(types_1.ELEMENT_VISIBILITY_CHANGE_EVENT, this.handleElementVisibilityChange);
            controller.addEventListener(types_1.NODE_COLLAPSE_CHANGE_EVENT, this.handleNodeCollapse);
        }
    }
    stop() {
        this.stopSimulation();
    }
    stopListening() {
        const controller = this.graph.getController();
        if (this.scheduleHandle) {
            window.cancelAnimationFrame(this.scheduleHandle);
        }
        if (controller) {
            controller.removeEventListener(types_1.ADD_CHILD_EVENT, this.handleChildAdded);
            controller.removeEventListener(types_1.REMOVE_CHILD_EVENT, this.handleChildRemoved);
            controller.removeEventListener(types_1.ELEMENT_VISIBILITY_CHANGE_EVENT, this.handleElementVisibilityChange);
            controller.removeEventListener(types_1.NODE_COLLAPSE_CHANGE_EVENT, this.handleNodeCollapse);
        }
    }
    getLayoutNode(nodes, node) {
        if (!node) {
            return undefined;
        }
        let layoutNode = _.find(nodes, { id: node.getId() });
        if (!layoutNode && _.size(node.getNodes())) {
            layoutNode = _.find(nodes, { id: node.getChildren()[0].getId() });
        }
        if (!layoutNode) {
            layoutNode = this.getLayoutNode(nodes, utils_1.getClosestVisibleParent(node));
        }
        return layoutNode;
    }
    // Faux Edges are used to layout nodes in a group together, as if they had links between them
    getFauxEdges(groups, nodes) {
        const fauxEdges = [];
        groups.forEach((group) => {
            const groupNodes = group.element.getNodes();
            for (let i = 0; i < groupNodes.length; i++) {
                for (let j = i + 1; j < groupNodes.length; j++) {
                    const fauxEdge = new elements_1.BaseEdge();
                    const source = this.getLayoutNode(nodes, groupNodes[i]);
                    const target = this.getLayoutNode(nodes, groupNodes[j]);
                    if (source && target) {
                        const link = this.createLayoutLink(fauxEdge, source, target, true);
                        fauxEdge.setController(target.element.getController());
                        fauxEdges.push(link);
                    }
                }
            }
        });
        return fauxEdges;
    }
    createLayoutNode(node, nodeDistance, index) {
        return new LayoutNode_1.LayoutNode(node, nodeDistance, index);
    }
    createLayoutLink(edge, source, target, isFalse = false) {
        return new LayoutLink_1.LayoutLink(edge, source, target, isFalse);
    }
    createLayoutGroup(node, padding, index) {
        return new LayoutGroup_1.LayoutGroup(node, padding, index);
    }
    getNodes(leafNodes, nodeDistance) {
        return leafNodes.map((n, index) => this.createLayoutNode(n, nodeDistance, index));
    }
    getLinks(edges) {
        const links = [];
        edges.forEach(e => {
            const source = this.getLayoutNode(this.nodes, e.getSource());
            const target = this.getLayoutNode(this.nodes, e.getTarget());
            if (source && target) {
                this.initializeEdgeBendpoints(e);
                links.push(this.createLayoutLink(e, source, target));
            }
        });
        return links;
    }
    // Turn empty groups into nodes
    getNodesFromGroups(groups, nodeDistance, nodeCount) {
        let count = 0;
        const groupNodes = [];
        groups.forEach((group) => {
            if (!this.hasVisibleChildren(group)) {
                groupNodes.push(this.createLayoutNode(group, nodeDistance, nodeCount + count++));
            }
        });
        return groupNodes;
    }
    getGroups(groups, nodes, padding) {
        let nodeIndex = 2 * nodes.length;
        // Create groups only for those with children
        const layoutGroups = groups
            .filter(g => this.hasVisibleChildren(g))
            .map((group) => this.createLayoutGroup(group, padding, nodeIndex++));
        layoutGroups.forEach((groupNode) => {
            const leaves = [];
            const leafElements = groupNode.element
                .getNodes()
                .filter((node) => !node.isGroup() || !this.hasVisibleChildren(node));
            leafElements.forEach((leaf) => {
                const layoutLeaf = nodes.find(n => n.id === leaf.getId());
                if (layoutLeaf) {
                    leaves.push(layoutLeaf);
                    layoutLeaf.parent = groupNode;
                }
            });
            groupNode.leaves = leaves;
            const childGroups = [];
            const groupElements = groupNode.element
                .getNodes()
                .filter((node) => node.isGroup() && node.isVisible() && !node.isCollapsed());
            groupElements.forEach((group) => {
                const layoutGroup = layoutGroups.find(g => g.id === group.getId());
                if (layoutGroup) {
                    childGroups.push(layoutGroup);
                    layoutGroup.parent = groupNode;
                }
            });
            groupNode.groups = childGroups;
        });
        return layoutGroups;
    }
    initializeNodePositions(nodes, graph, force) {
        const { width, height } = graph.getBounds();
        const cx = width / 2;
        const cy = height / 2;
        nodes.forEach((node) => {
            // only init position for nodes that have not been positioned
            if (force || !node.element.isPositioned()) {
                node.setPosition(cx, cy);
            }
            else {
                node.setFixed(true);
            }
        });
    }
    setupLayout(graph, // eslint-disable-line @typescript-eslint/no-unused-vars
    nodes, // eslint-disable-line @typescript-eslint/no-unused-vars
    edges, // eslint-disable-line @typescript-eslint/no-unused-vars
    groups // eslint-disable-line @typescript-eslint/no-unused-vars
    ) { }
    stopSimulation() {
        this.forceSimulation.haltForceSimulation();
    }
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    startLayout(graph, initialRun, addingNodes, onEnd) { }
    // Interim, remove and update startLayout to public in next breaking change build
    doStartLayout(graph, initialRun, addingNodes, onEnd) {
        return this.startLayout(graph, initialRun, addingNodes, onEnd);
    }
    updateLayout() {
        this.forceSimulation.useForceSimulation(this.nodes, this.edges, this.getFixedNodeDistance);
        this.forceSimulation.alpha(0.2);
    }
    runLayout(initialRun, restart = true) {
        const prevGroups = this.groups;
        // create datum
        const leafNodes = this.getLeafNodes();
        const groups = this.getGroupNodes();
        this.nodes = this.getNodes(leafNodes, this.options.nodeDistance);
        const groupNodes = this.getNodesFromGroups(groups, this.options.nodeDistance, this.nodes.length);
        if (groupNodes) {
            this.nodes.push(...groupNodes);
        }
        this.groups = this.getGroups(groups, this.nodes, this.options.groupDistance);
        const newNodes = initialRun
            ? this.nodes
            : this.nodes.filter(node => !this.nodesMap[node.element.getId()]);
        let addingNodes = restart && newNodes.length > 0;
        if (!initialRun && restart && !addingNodes) {
            this.groups.forEach(group => {
                const prevGroup = prevGroups.find(g => g.element.getId() === group.element.getId());
                if (!prevGroup) {
                    addingNodes = true;
                    newNodes.push(...group.leaves);
                }
                else {
                    group.leaves.forEach(node => {
                        if (!prevGroup.leaves.find(l => l.element.getId() === node.element.getId())) {
                            newNodes.push(node);
                        }
                    });
                }
            });
            addingNodes = newNodes.length > 0;
        }
        this.edges = this.getLinks(this.graph.getEdges());
        // initialize new node positions
        this.initializeNodePositions(this.nodes, this.graph, initialRun);
        // re-create the nodes map
        this.nodesMap = this.nodes.reduce((acc, n) => {
            acc[n.id] = n;
            return acc;
        }, {});
        // Add faux edges to keep grouped items together
        this.edges.push(...this.getFauxEdges(this.groups, this.nodes));
        this.setupLayout(this.graph, this.nodes, this.edges, this.groups);
        if (initialRun || addingNodes) {
            // Reset the force simulation
            this.stopSimulation();
            this.startLayout(this.graph, initialRun, addingNodes);
        }
        else if (restart && this.options.layoutOnDrag) {
            this.updateLayout();
        }
        this.graph.getController().fireEvent(types_1.GRAPH_LAYOUT_END_EVENT, { graph: this.graph });
    }
}
tslib_1.__decorate([
    mobx_1.action
], BaseLayout.prototype, "runLayout", null);
exports.BaseLayout = BaseLayout;
//# sourceMappingURL=BaseLayout.js.map