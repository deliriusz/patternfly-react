"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const React = tslib_1.__importStar(require("react"));
const useCallbackRef_1 = tslib_1.__importDefault(require("./useCallbackRef"));
const useHover = (delayIn = 200, delayOut = 200) => {
    const [hover, setHover] = React.useState(false);
    const mountRef = React.useRef(true);
    // need to ensure we do not start the unset timer on unmount
    React.useEffect(() => () => {
        mountRef.current = false;
    }, []);
    // The unset handle needs to be referred by listeners in different closures.
    const unsetHandle = React.useRef();
    const callbackRef = useCallbackRef_1.default(React.useCallback((node) => {
        if (node) {
            // store locally instead of a ref because it only needs to be referred by inner closures
            let delayHandle;
            const delayedStateChange = (newState, delay) => {
                clearTimeout(unsetHandle.current);
                clearTimeout(delayHandle);
                if (delay != null) {
                    delayHandle = window.setTimeout(() => {
                        clearTimeout(unsetHandle.current);
                        setHover(newState);
                    }, delay);
                }
                else {
                    setHover(newState);
                }
            };
            const onMouseEnter = () => {
                delayedStateChange(true, delayIn);
            };
            const onMouseLeave = () => {
                delayedStateChange(false, delayOut);
            };
            node.addEventListener('mouseenter', onMouseEnter);
            node.addEventListener('mouseleave', onMouseLeave);
            return () => {
                node.removeEventListener('mouseenter', onMouseEnter);
                node.removeEventListener('mouseleave', onMouseLeave);
                clearTimeout(delayHandle);
                if (mountRef.current) {
                    // Queue the unset in case reattaching to a new node in the same location.
                    // This can happen with layers. Rendering a node to a new layer will unmount the old node
                    // and remount a new node at the same location. This will prevent flickering and getting
                    // stuck in a hover state.
                    unsetHandle.current = window.setTimeout(() => {
                        if (mountRef.current) {
                            setHover(false);
                        }
                    }, Math.max(delayIn, delayOut));
                }
            };
        }
        return undefined;
    }, [delayIn, delayOut]));
    return [hover, callbackRef];
};
exports.default = useHover;
//# sourceMappingURL=useHover.js.map