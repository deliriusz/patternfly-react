"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ContextMenuSeparator = exports.ContextMenuItem = exports.ContextSubMenuItem = exports.ContextMenu = void 0;
var ContextMenu_1 = require("./ContextMenu");
Object.defineProperty(exports, "ContextMenu", { enumerable: true, get: function () { return __importDefault(ContextMenu_1).default; } });
var ContextSubMenuItem_1 = require("./ContextSubMenuItem");
Object.defineProperty(exports, "ContextSubMenuItem", { enumerable: true, get: function () { return __importDefault(ContextSubMenuItem_1).default; } });
// re-export dropdown components as context menu components
var react_core_1 = require("@patternfly/react-core");
Object.defineProperty(exports, "ContextMenuItem", { enumerable: true, get: function () { return react_core_1.DropdownItem; } });
Object.defineProperty(exports, "ContextMenuSeparator", { enumerable: true, get: function () { return react_core_1.DropdownSeparator; } });
//# sourceMappingURL=index.js.map