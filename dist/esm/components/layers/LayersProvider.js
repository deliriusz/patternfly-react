import * as React from 'react';
import { DEFAULT_LAYER } from '../../const';
import LayersContext from './LayersContext';
export default class LayersProvider extends React.Component {
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
        if (layers && !layers.includes(DEFAULT_LAYER)) {
            throw new Error('Missing default layer.');
        }
        const layerIds = layers || [DEFAULT_LAYER];
        return (React.createElement(LayersContext.Provider, { value: this.contextValue }, layerIds.map(id => (React.createElement("g", { key: id, "data-layer-id": id, ref: r => this.setDomLayers(r, id) }, id === DEFAULT_LAYER && this.state[id] ? children : undefined)))));
    }
}
//# sourceMappingURL=LayersProvider.js.map