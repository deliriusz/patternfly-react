import * as React from 'react';
import SVGDefsContext from './SVGDefsContext';
import { Defs } from './Defs';
/**
 * Renders a `<defs>` element and sets up a {@link SVGDefsContext} provider such that child components
 * may contribute to the `<defs>` without the parent component needing explicit knowledge of each contribution.
 * This helps decouple the parent implementation from the children and ensures that duplicate defs entries,
 * such as filters, are eliminated.
 */
class SVGDefsProvider extends React.Component {
    constructor() {
        super(...arguments);
        this.defsRef = React.createRef();
        this.defs = {};
        this.contextValue = {
            addDef: (id, node) => {
                const defObj = this.defs[id];
                if (defObj) {
                    defObj.count++;
                }
                else {
                    this.defs[id] = {
                        count: 1,
                        node
                    };
                    this.updateDefs();
                }
            },
            removeDef: id => {
                const defObj = this.defs[id];
                if (--defObj.count === 0) {
                    delete this.defs[id];
                    this.updateDefs();
                }
            }
        };
    }
    updateDefs() {
        // Set the defs directly on the child component so that only it will re-render.
        // Does not use `setState` because otherwise all child components would be re-renders again
        // when only the `Defs` component needs to be rendered.
        this.defsRef.current && this.defsRef.current.setDefs(this.defs);
    }
    render() {
        return (React.createElement(SVGDefsContext.Provider, { value: this.contextValue },
            React.createElement(Defs, { ref: this.defsRef }),
            this.props.children));
    }
}
export default SVGDefsProvider;
//# sourceMappingURL=SVGDefsProvider.js.map