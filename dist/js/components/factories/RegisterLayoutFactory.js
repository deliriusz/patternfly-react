"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const useLayoutFactory_1 = tslib_1.__importDefault(require("../../hooks/useLayoutFactory"));
const RegisterLayoutFactory = ({ factory }) => {
    useLayoutFactory_1.default(factory);
    return null;
};
exports.default = RegisterLayoutFactory;
//# sourceMappingURL=RegisterLayoutFactory.js.map