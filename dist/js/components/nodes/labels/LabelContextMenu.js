"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const React = tslib_1.__importStar(require("react"));
const ellipsis_v_icon_1 = tslib_1.__importDefault(require('@patternfly/react-icons/dist/js/icons/ellipsis-v-icon'));
const LabelActionIcon_1 = tslib_1.__importDefault(require("./LabelActionIcon"));
const LabelContextMenu = React.forwardRef(({ onContextMenu, className, x, y, paddingX, paddingY, height }, menuRef) => (React.createElement(LabelActionIcon_1.default, { ref: menuRef, icon: React.createElement(ellipsis_v_icon_1.default, null), iconOffsetX: -6, className: className, onClick: onContextMenu, x: x, y: y, height: height, paddingX: paddingX, paddingY: paddingY })));
exports.default = LabelContextMenu;
//# sourceMappingURL=LabelContextMenu.js.map