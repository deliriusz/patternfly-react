"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const React = tslib_1.__importStar(require("react"));
const useVisualizationController_1 = tslib_1.__importDefault(require("./useVisualizationController"));
const useComponentFactory = (factory) => {
    const controller = useVisualizationController_1.default();
    React.useEffect(() => {
        controller.registerComponentFactory(factory);
        // TODO support unregister?
    }, [controller, factory]);
};
exports.default = useComponentFactory;
//# sourceMappingURL=useComponentFactory.js.map