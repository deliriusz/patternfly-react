"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ColaLink = exports.ColaGroup = exports.ColaNode = exports.ColaLayout = void 0;
const tslib_1 = require("tslib");
const webcola = tslib_1.__importStar(require("webcola"));
const d3 = tslib_1.__importStar(require("d3"));
const mobx_1 = require("mobx");
const BaseLayout_1 = require("./BaseLayout");
const ColaNode_1 = require("./ColaNode");
Object.defineProperty(exports, "ColaNode", { enumerable: true, get: function () { return ColaNode_1.ColaNode; } });
const ColaGroup_1 = require("./ColaGroup");
Object.defineProperty(exports, "ColaGroup", { enumerable: true, get: function () { return ColaGroup_1.ColaGroup; } });
const ColaLink_1 = require("./ColaLink");
Object.defineProperty(exports, "ColaLink", { enumerable: true, get: function () { return ColaLink_1.ColaLink; } });
const COLA_LAYOUT_DEFAULTS = {
    maxTicks: 1000,
    initialUnconstrainedIterations: 200,
    initialUserConstraintIterations: 50,
    initialAllConstraintsIterations: 150,
    gridSnapIterations: 10
};
class ColaLayout extends BaseLayout_1.BaseLayout {
    constructor(graph, options) {
        super(graph, options);
        this.tickCount = 0;
        this.destroyed = false;
        this.simulationRunning = false;
        this.simulationStopped = false;
        this.restartOnEnd = undefined;
        this.addingNodes = false;
        this.onSimulationEnd = () => {
            if (this.addingNodes) {
                if (!this.options.layoutOnDrag) {
                    this.forceSimulation.stopSimulation();
                }
                this.addingNodes = false;
            }
        };
        this.colaOptions = Object.assign(Object.assign({}, COLA_LAYOUT_DEFAULTS), options);
        this.initializeLayout();
    }
    initializeLayout() {
        this.d3Cola = webcola.d3adaptor(d3);
        this.d3Cola.handleDisconnected(true);
        this.d3Cola.avoidOverlaps(true);
        this.d3Cola.on('tick', () => {
            this.tickCount++;
            if (this.tickCount >= 1 || this.tickCount % this.options.simulationSpeed === 0) {
                mobx_1.action(() => this.nodes.forEach(d => d.update()))();
            }
            if (this.colaOptions.maxTicks >= 0 && this.tickCount > this.colaOptions.maxTicks) {
                this.d3Cola.stop();
            }
        });
        this.d3Cola.on('end', () => {
            this.tickCount = 0;
            this.simulationRunning = false;
            mobx_1.action(() => {
                if (this.destroyed) {
                    this.onEnd && this.onEnd();
                    return;
                }
                this.nodes.forEach(d => {
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
    destroy() {
        super.destroy();
        this.destroyed = true;
        if (this.d3Cola) {
            this.d3Cola.stop();
        }
    }
    initDrag() {
        // Set the alpha to 0 to halt any ticks that may be occurring
        if (this.d3Cola) {
            this.d3Cola.alpha(0);
        }
    }
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    getConstraints(nodes, groups, edges) {
        return [];
    }
    stopSimulation() {
        if (this.simulationRunning) {
            this.simulationStopped = true;
            if (this.d3Cola) {
                this.d3Cola.stop();
            }
        }
        super.stopSimulation();
    }
    createLayoutNode(node, nodeDistance, index) {
        return new ColaNode_1.ColaNode(node, nodeDistance, index);
    }
    createLayoutLink(edge, source, target) {
        return new ColaLink_1.ColaLink(edge, source, target);
    }
    createLayoutGroup(node, padding, index) {
        return new ColaGroup_1.ColaGroup(node, padding, index);
    }
    getFauxEdges() {
        return [];
    }
    setupLayout(graph, nodes, edges, groups) {
        const { width, height } = graph.getBounds();
        this.d3Cola.size([width, height]);
        // Get any custom constraints
        this.d3Cola.constraints(this.getConstraints(nodes, groups, edges));
        this.d3Cola.nodes(nodes);
        this.d3Cola.links(edges);
        this.d3Cola.groups(groups);
    }
    startColaLayout(initialRun, addingNodes) {
        this.simulationRunning = true;
        this.d3Cola.alpha(0.2);
        this.tickCount = 0;
        this.addingNodes = addingNodes;
        this.d3Cola.start(addingNodes ? 0 : this.colaOptions.initialUnconstrainedIterations, addingNodes ? 0 : this.colaOptions.initialUserConstraintIterations, addingNodes ? 0 : this.colaOptions.initialAllConstraintsIterations, addingNodes ? 0 : this.colaOptions.gridSnapIterations, false, !addingNodes);
    }
    startLayout(graph, initialRun, addingNodes, onEnd) {
        this.onEnd = onEnd;
        if (!this.simulationStopped) {
            this.startColaLayout(initialRun, addingNodes);
        }
        else {
            this.restartOnEnd = addingNodes;
        }
    }
}
exports.ColaLayout = ColaLayout;
//# sourceMappingURL=ColaLayout.js.map