"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const React = tslib_1.__importStar(require("react"));
const useVisualizationController_1 = tslib_1.__importDefault(require("./useVisualizationController"));
const useEventListener = (type, listener) => {
    const controller = useVisualizationController_1.default();
    React.useEffect(() => {
        controller.addEventListener(type, listener);
        return () => {
            controller.removeEventListener(type, listener);
        };
    }, [controller, type, listener]);
};
exports.default = useEventListener;
//# sourceMappingURL=useEventListener.js.map