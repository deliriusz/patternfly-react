"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const React = tslib_1.__importStar(require("react"));
const const_1 = require("../../const");
const LayersContext_1 = tslib_1.__importDefault(require("./LayersContext"));
class LayersProvider extends React.Component {
    constructor(props) {
        super(props);
        this.contextValue = (id) => {
            if (this.state[id]) {
                return this.state[id];
            }
            throw new Error(`Unknown layer '${id}'`);
        };
        this.setDomLayers = (node, id) => {
            if (node && this.state[id] !== node) {
                this.setState(state => (Object.assign(Object.assign({}, state), { [id]: node })));
            }
        };
        this.getLayerNode = (id) => {
            const node = this.state[id];
            if (node) {
                return node;
            }
            throw new Error(`Unknown layer '${id}'`);
        };
        this.state = {};
    }
    render() {
        const { layers, children } = this.props;
        if (layers && !layers.includes(const_1.DEFAULT_LAYER)) {
            throw new Error('Missing default layer.');
        }
        const layerIds = layers || [const_1.DEFAULT_LAYER];
        return (React.createElement(LayersContext_1.default.Provider, { value: this.contextValue }, layerIds.map(id => (React.createElement("g", { key: id, "data-layer-id": id, ref: r => this.setDomLayers(r, id) }, id === const_1.DEFAULT_LAYER && this.state[id] ? children : undefined)))));
    }
}
exports.default = LayersProvider;
//# sourceMappingURL=LayersProvider.js.map