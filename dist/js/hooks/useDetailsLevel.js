"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const useVisualizationController_1 = tslib_1.__importDefault(require("./useVisualizationController"));
const types_1 = require("../types");
const useDetailsLevel = () => {
    const controller = useVisualizationController_1.default();
    if (!controller) {
        return types_1.ScaleDetailsLevel.high;
    }
    return controller.getGraph().getDetailsLevel();
};
exports.default = useDetailsLevel;
//# sourceMappingURL=useDetailsLevel.js.map