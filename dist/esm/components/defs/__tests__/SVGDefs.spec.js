import * as React from 'react';
import { render } from '@testing-library/react';
import SVGDefs from '../SVGDefs';
import SVGDefsContext from '../SVGDefsContext';
import { SVGDefsSetter } from '../SVGDefsSetter';
describe('SVGDefs', () => {
    it('should get #addDef and #removeDef from context', () => {
        const contextProps = {
            addDef: jest.fn(),
            removeDef: jest.fn()
        };
        const props = {
            id: 'foo',
            children: React.createElement("span", null)
        };
        const { unmount } = render(React.createElement(SVGDefsContext.Provider, { value: contextProps },
            React.createElement(SVGDefs, Object.assign({}, props))));
        // addDef called on mount and removeDef on unmount being called
        // signifies the context props were passed into SVGDefs (and therefore SVGDefsSetter).
        expect(contextProps.addDef).toHaveBeenCalledWith("foo", React.createElement("span", null));
        unmount();
        expect(contextProps.removeDef).toHaveBeenLastCalledWith("foo");
    });
    describe('SVGDefsSetter', () => {
        it('should callback #addDef and #removeDef on update', () => {
            const props = {
                id: 'foo',
                addDef: jest.fn(),
                removeDef: jest.fn(),
                children: React.createElement("span", null),
            };
            const { unmount, rerender } = render(React.createElement(SVGDefsSetter, Object.assign({}, props)));
            expect(props.addDef).toHaveBeenCalledWith(props.id, props.children);
            // test update
            const newChild = React.createElement("span", null);
            rerender(React.createElement(SVGDefsSetter, Object.assign({}, props), newChild));
            expect(props.addDef).toHaveBeenCalledTimes(2);
            expect(props.addDef).toHaveBeenLastCalledWith(props.id, newChild);
            // test unmount
            unmount();
            expect(props.removeDef).toHaveBeenCalledTimes(1);
            expect(props.removeDef).toHaveBeenLastCalledWith(props.id);
        });
    });
});
//# sourceMappingURL=SVGDefs.spec.js.map