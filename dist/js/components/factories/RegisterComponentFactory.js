"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const useComponentFactory_1 = tslib_1.__importDefault(require("../../hooks/useComponentFactory"));
const RegisterComponentFactory = ({ factory }) => {
    useComponentFactory_1.default(factory);
    return null;
};
exports.default = RegisterComponentFactory;
//# sourceMappingURL=RegisterComponentFactory.js.map