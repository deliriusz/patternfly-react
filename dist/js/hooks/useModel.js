"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const React = tslib_1.__importStar(require("react"));
const useVisualizationController_1 = tslib_1.__importDefault(require("./useVisualizationController"));
const useModel = (model) => {
    const controller = useVisualizationController_1.default();
    React.useEffect(() => {
        controller.fromModel(model);
    }, [controller, model]);
};
exports.default = useModel;
//# sourceMappingURL=useModel.js.map