"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Defs = void 0;
const tslib_1 = require("tslib");
const React = tslib_1.__importStar(require("react"));
class Defs extends React.PureComponent {
    constructor(props) {
        super(props);
        this.state = {};
    }
    setDefs(defs) {
        // setting the state will re-render this component
        this.setState({ defs: Object.assign({}, defs) });
    }
    render() {
        const { defs } = this.state;
        return defs ? (React.createElement("defs", null, Object.keys(defs).map(id => (React.createElement(React.Fragment, { key: id }, defs[id].node))))) : null;
    }
}
exports.Defs = Defs;
//# sourceMappingURL=Defs.js.map