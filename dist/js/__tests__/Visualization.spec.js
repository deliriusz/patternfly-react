"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Visualization_1 = require("../Visualization");
describe('Visualization', () => {
    it('should clean up old graph model', () => {
        const visualization = new Visualization_1.Visualization();
        expect(visualization.getElementById('a')).toBeUndefined();
        visualization.fromModel({
            graph: {
                id: 'a',
                type: 'graph',
            },
        });
        const graphA = visualization.getElementById('a');
        expect(graphA).not.toBeUndefined();
        if (!graphA) {
            fail();
            return;
        }
        graphA.destroy = jest.fn();
        visualization.fromModel({
            graph: {
                id: 'b',
                type: 'graph',
            },
        });
        expect(visualization.getElementById('a')).toBeUndefined();
        expect(visualization.getElementById('b')).not.toBeUndefined();
        expect(graphA.destroy).toHaveBeenCalledTimes(1);
    });
});
//# sourceMappingURL=Visualization.spec.js.map