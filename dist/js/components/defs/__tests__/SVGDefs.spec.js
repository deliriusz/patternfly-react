"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const React = tslib_1.__importStar(require("react"));
const react_1 = require("@testing-library/react");
const SVGDefs_1 = tslib_1.__importDefault(require("../SVGDefs"));
const SVGDefsContext_1 = tslib_1.__importDefault(require("../SVGDefsContext"));
const SVGDefsSetter_1 = require("../SVGDefsSetter");
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
        const { unmount } = react_1.render(React.createElement(SVGDefsContext_1.default.Provider, { value: contextProps },
            React.createElement(SVGDefs_1.default, Object.assign({}, props))));
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
            const { unmount, rerender } = react_1.render(React.createElement(SVGDefsSetter_1.SVGDefsSetter, Object.assign({}, props)));
            expect(props.addDef).toHaveBeenCalledWith(props.id, props.children);
            // test update
            const newChild = React.createElement("span", null);
            rerender(React.createElement(SVGDefsSetter_1.SVGDefsSetter, Object.assign({}, props), newChild));
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