"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const React = tslib_1.__importStar(require("react"));
const useCombineRefs = (...refs) => React.useCallback((element) => refs.forEach(ref => {
    if (ref) {
        if (typeof ref === 'function') {
            ref(element);
        }
        else {
            ref.current = element;
        }
    }
}), 
// eslint-disable-next-line react-hooks/exhaustive-deps
refs);
exports.default = useCombineRefs;
//# sourceMappingURL=useCombineRefs.js.map