"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const React = tslib_1.__importStar(require("react"));
const TaskNode_1 = tslib_1.__importDefault(require("./TaskNode"));
const FinallyNode = props => (React.createElement(TaskNode_1.default, Object.assign({ whenOffset: 0, whenSize: 0, truncateLength: 22 }, props)));
exports.default = FinallyNode;
//# sourceMappingURL=FinallyNode.js.map