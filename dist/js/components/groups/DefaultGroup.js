"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const React = tslib_1.__importStar(require("react"));
const mobx_react_1 = require("mobx-react");
const DefaultGroupExpanded_1 = tslib_1.__importDefault(require("./DefaultGroupExpanded"));
const DefaultGroupCollapsed_1 = tslib_1.__importDefault(require("./DefaultGroupCollapsed"));
const DefaultGroup = (_a) => {
    var { className, element, onCollapseChange } = _a, rest = tslib_1.__rest(_a, ["className", "element", "onCollapseChange"]);
    const handleCollapse = (group, collapsed) => {
        if (collapsed && rest.collapsedWidth !== undefined && rest.collapsedHeight !== undefined) {
            group.setBounds(group.getBounds().setSize(rest.collapsedWidth, rest.collapsedHeight));
        }
        group.setCollapsed(collapsed);
        onCollapseChange && onCollapseChange(group, collapsed);
    };
    if (element.isCollapsed()) {
        return (React.createElement(DefaultGroupCollapsed_1.default, Object.assign({ className: className, element: element, onCollapseChange: handleCollapse }, rest)));
    }
    return React.createElement(DefaultGroupExpanded_1.default, Object.assign({ className: className, element: element, onCollapseChange: handleCollapse }, rest));
};
exports.default = mobx_react_1.observer(DefaultGroup);
//# sourceMappingURL=DefaultGroup.js.map