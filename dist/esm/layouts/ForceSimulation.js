import * as d3 from 'd3';
import { action } from 'mobx';
class ForceSimulation {
    constructor(options) {
        this.destroyed = false;
        this.options = Object.assign({
            collideDistance: 0,
            simulationSpeed: 10,
            chargeStrength: 0
        }, options);
        // Setup Force Simulation
        this.simulation = d3.forceSimulation();
        this.simulation.force('collide', d3.forceCollide().radius(d => d.collisionRadius + this.options.collideDistance));
        this.simulation.force('charge', d3.forceManyBody().strength(this.options.chargeStrength));
        this.simulation.alpha(0);
        this.forceLink = d3.forceLink().id(e => e.id);
        this.simulation.force('link', this.forceLink);
        this.simulation.on('tick', action(() => {
            // speed up the simulation
            for (let i = 0; i < this.options.simulationSpeed; i++) {
                this.simulation.tick();
            }
            this.simulation.nodes().forEach((d) => !this.destroyed && d.update());
        }));
        if (options.onSimulationEnd) {
            this.simulation.on('end', this.options.onSimulationEnd);
        }
    }
    destroy() {
        this.destroyed = true;
        this.simulation.stop();
    }
    useForceSimulation(nodes, links, distance) {
        this.forceLink.distance(distance);
        // first remove the links so that the layout doesn't error
        this.forceLink.links([]);
        this.simulation.nodes([...nodes]);
        this.forceLink.links([...links]);
    }
    haltForceSimulation() {
        this.simulation.alpha(0);
        this.simulation.nodes([]);
        this.forceLink.links([]);
    }
    forceCenter(cx, cy) {
        this.simulation.force('center', d3.forceCenter(cx, cy));
    }
    stopSimulation() {
        this.simulation.stop();
    }
    restart() {
        this.simulation.restart();
    }
    alpha(value) {
        this.simulation.alpha(value);
    }
    alphaTarget(value) {
        this.simulation.alphaTarget(value);
    }
}
export { ForceSimulation };
//# sourceMappingURL=ForceSimulation.js.map