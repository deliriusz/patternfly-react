import * as webcola from 'webcola';
import * as d3 from 'd3';
import { action } from 'mobx';
import { ColaGroupsNode } from './ColaGroupsNode';
import { ColaGroup } from './ColaGroup';
import { ColaLink } from './ColaLink';
import { ColaLayout } from './ColaLayout';
class ColaGroupsLayout extends ColaLayout {
    initializeLayout() { }
    initializeColaGroupLayout(graph) {
        this.d3Cola = webcola.d3adaptor(d3);
        this.d3Cola.handleDisconnected(true);
        this.d3Cola.avoidOverlaps(true);
        this.d3Cola.jaccardLinkLengths(40, 0.7);
        this.d3Cola.on('tick', () => {
            this.tickCount++;
            if (this.tickCount >= 1 || this.tickCount % this.options.simulationSpeed === 0) {
                action(() => this.nodes.forEach(d => d.update()))();
            }
            if (this.colaOptions.maxTicks >= 0 && this.tickCount > this.colaOptions.maxTicks) {
                this.d3Cola.stop();
            }
        });
        this.d3Cola.on('end', () => {
            this.tickCount = 0;
            this.simulationRunning = false;
            action(() => {
                if (this.destroyed) {
                    this.onEnd && this.onEnd();
                    return;
                }
                this.layoutNodes.forEach(d => {
                    if (!this.simulationStopped) {
                        d.update();
                    }
                    d.setFixed(false);
                });
                if (this.options.layoutOnDrag) {
                    this.forceSimulation.useForceSimulation(this.nodes, this.edges, this.getFixedNodeDistance);
                }
                if (this.simulationStopped) {
                    this.simulationStopped = false;
                    if (this.restartOnEnd !== undefined) {
                        this.startColaLayout(false, this.restartOnEnd);
                        this.startLayout(graph, false, this.restartOnEnd, this.onEnd);
                        delete this.restartOnEnd;
                    }
                }
                else if (this.addingNodes) {
                    // One round of simulation to adjust for new nodes
                    this.forceSimulation.useForceSimulation(this.nodes, this.edges, this.getFixedNodeDistance);
                    this.forceSimulation.restart();
                }
                this.onEnd && this.onEnd();
            })();
        });
    }
    createLayoutNode(node, nodeDistance, index) {
        return new ColaGroupsNode(node, nodeDistance, index);
    }
    getAllLeaves(group) {
        var _a;
        const leaves = [...group.leaves];
        (_a = group.groups) === null || _a === void 0 ? void 0 : _a.forEach(subGroup => leaves.push(...this.getAllLeaves(subGroup)));
        return leaves;
    }
    getAllSubGroups(group) {
        var _a;
        const groups = [...group.groups];
        (_a = group.groups) === null || _a === void 0 ? void 0 : _a.forEach(subGroup => groups.push(...this.getAllSubGroups(subGroup)));
        return groups;
    }
    isNodeInGroups(node, groups) {
        return !!groups.find(group => group.leaves.includes(node) || this.isNodeInGroups(node, group.groups));
    }
    isNodeInChildGroups(node, groups) {
        return !!groups.find(group => group.nodes.includes(node) || this.isNodeInGroups(node, group.groups));
    }
    isSubGroup(group, childGroups) {
        return !!childGroups.find(cg => cg.groups.includes(group.group));
    }
    getNodeGroup(node, childGroups) {
        return childGroups.find(group => group.nodes.includes(node) || this.isNodeInGroups(node, group.groups));
    }
    getGroupLayout(graph, group, nodes, edges, groups) {
        const layout = new ColaGroupsLayout(graph, this.options);
        layout.setupLayout(graph, nodes, edges, groups);
        return layout;
    }
    setupLayout(graph, nodes, edges, groups) {
        const constraints = this.getConstraints(nodes, groups, edges);
        let childGroups = groups.reduce((acc, group) => {
            if (!groups.find(g => { var _a; return ((_a = group.element.getParent()) === null || _a === void 0 ? void 0 : _a.getId()) === g.element.getId(); }) &&
                (group.groups.length || group.leaves.length)) {
                const allLeaves = this.getAllLeaves(group);
                const groupEdges = edges.filter(edge => allLeaves.includes(edge.sourceNode) && allLeaves.includes(edge.target));
                const groupGroups = this.getAllSubGroups(group);
                allLeaves.forEach((l, i) => {
                    l.index = i;
                    if (l.parent && !groupGroups.includes(l.parent)) {
                        l.parent = undefined;
                    }
                });
                groupGroups.forEach((g, i) => {
                    g.index = 2 * allLeaves.length + i;
                    g.parent = undefined;
                });
                acc.push({
                    group,
                    nodes: allLeaves,
                    edges: groupEdges,
                    groups: groupGroups
                });
            }
            return acc;
        }, []);
        const constrainedGroups = groups.filter(g => constraints.find(c => c.group === g.element.getId()));
        this.layerGroups = childGroups.filter(cg => constrainedGroups.includes(cg.group)).map(cg => cg.group);
        childGroups = childGroups.filter(cg => !this.layerGroups.includes(cg.group));
        this.layerNodes = nodes.filter(node => !this.isNodeInChildGroups(node, childGroups));
        this.layerGroupNodes = childGroups.filter(cg => !this.isSubGroup(cg, childGroups));
        this.layerEdges = edges.reduce((acc, edge) => {
            const source = this.getNodeGroup(edge.sourceNode, childGroups);
            const target = this.getNodeGroup(edge.targetNode, childGroups);
            if (!source || !target || source !== target) {
                acc.push(edge);
            }
            return acc;
        }, []);
        this.childLayouts = childGroups.map(childGroup => this.getGroupLayout(graph, childGroup.group, childGroup.nodes, childGroup.edges, childGroup.groups));
    }
    startChildLayout(graph, childLayout, initialRun, addingNodes) {
        return new Promise(resolve => {
            childLayout.doStartLayout(graph, initialRun, addingNodes, () => {
                resolve();
            });
        });
    }
    startColaLayout(initialRun, addingNodes) {
        var _a;
        this.simulationRunning = true;
        this.tickCount = 0;
        this.addingNodes = addingNodes;
        const doStart = () => {
            this.initializeColaGroupLayout(this.graph);
            const { width, height } = this.graph.getBounds();
            this.d3Cola.size([width, height]);
            this.layoutNodes = [...this.layerNodes];
            this.layerGroupNodes.forEach(cg => {
                const layoutNode = this.createLayoutNode(cg.group.element, this.options.nodeDistance, cg.group.index);
                this.layoutNodes.push(layoutNode);
                this.layerEdges.forEach(edge => {
                    if (cg.nodes.find(n => n.id === edge.sourceNode.id) || this.isNodeInGroups(edge.sourceNode, cg.groups)) {
                        edge.sourceNode = layoutNode;
                    }
                    if (cg.nodes.find(n => n.id === edge.targetNode.id) || this.isNodeInGroups(edge.targetNode, cg.groups)) {
                        edge.targetNode = layoutNode;
                    }
                });
            });
            // Get any custom constraints
            const constraints = this.getConstraints(this.layoutNodes, this.layerGroups, this.layerEdges);
            this.d3Cola.constraints(constraints);
            this.d3Cola.nodes(this.layoutNodes);
            this.d3Cola.groups(this.layerGroups);
            this.d3Cola.links(this.layerEdges);
            this.d3Cola.alpha(0.2);
            this.d3Cola.start(addingNodes ? 0 : this.colaOptions.initialUnconstrainedIterations, addingNodes ? 0 : this.colaOptions.initialUserConstraintIterations, addingNodes ? 0 : this.colaOptions.initialAllConstraintsIterations, addingNodes ? 0 : this.colaOptions.gridSnapIterations, false, !addingNodes);
        };
        if ((_a = this.childLayouts) === null || _a === void 0 ? void 0 : _a.length) {
            const runLayouts = (childLayouts) => Promise.all(childLayouts.map(childLayout => this.startChildLayout(this.graph, childLayout, initialRun, addingNodes)));
            runLayouts(this.childLayouts)
                .then(() => {
                doStart();
            })
                .catch(() => { });
            return;
        }
        doStart();
    }
}
export { ColaGroupsLayout, ColaGroupsNode, ColaGroup, ColaLink };
//# sourceMappingURL=ColaGroupsLayout.js.map