"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const React = tslib_1.__importStar(require("react"));
const mobx_1 = require("mobx");
const useVisualizationController_1 = tslib_1.__importDefault(require("./useVisualizationController"));
const useVisualizationState = (key, initialState) => {
    const keyRef = React.useRef(key);
    if (keyRef.current !== key) {
        throw new Error(`State key change disallowed: ${keyRef.current} => ${key}`);
    }
    const [state, setState] = React.useState(initialState);
    const controller = useVisualizationController_1.default();
    const setControllerState = React.useCallback((value) => {
        controller.setState({ [keyRef.current]: value });
    }, [controller]);
    React.useEffect(() => {
        // init the controller state
        setControllerState(initialState);
        // sync controller state and react state such that the component is re-rendered when controller state changes
        return mobx_1.reaction(() => controller.getState()[keyRef.current], (value) => {
            setState(value);
        });
        // we only want to set the initial state once
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [controller]);
    return [state, setControllerState];
};
exports.default = useVisualizationState;
//# sourceMappingURL=useVisualizationState.js.map