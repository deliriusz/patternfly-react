import * as React from 'react';
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
export default useCombineRefs;
//# sourceMappingURL=useCombineRefs.js.map