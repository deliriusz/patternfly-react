"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.mockLocation = void 0;
const svg_utils_1 = require("../svg-utils");
const mockLocation = (location) => {
    const windowLocation = JSON.stringify(window.location);
    delete window.location;
    Object.defineProperty(window, 'location', {
        configurable: true,
        writable: true,
        value: JSON.parse(windowLocation),
    });
    if (location) {
        Object.assign(window.location, location);
    }
};
exports.mockLocation = mockLocation;
describe('svg-utils#createSvgIdUrl', () => {
    it('should return absolute url based on pathname and search', () => {
        exports.mockLocation({
            pathname: '/foo/bar',
            search: '?key=value',
        });
        expect(svg_utils_1.createSvgIdUrl('testid')).toBe('url(/foo/bar?key=value#testid)');
    });
});
//# sourceMappingURL=svg-utils.spec.js.map