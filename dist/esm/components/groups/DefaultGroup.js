import { __rest } from "tslib";
import * as React from 'react';
import { observer } from 'mobx-react';
import DefaultGroupExpanded from './DefaultGroupExpanded';
import DefaultGroupCollapsed from './DefaultGroupCollapsed';
const DefaultGroup = (_a) => {
    var { className, element, onCollapseChange } = _a, rest = __rest(_a, ["className", "element", "onCollapseChange"]);
    const handleCollapse = (group, collapsed) => {
        if (collapsed && rest.collapsedWidth !== undefined && rest.collapsedHeight !== undefined) {
            group.setBounds(group.getBounds().setSize(rest.collapsedWidth, rest.collapsedHeight));
        }
        group.setCollapsed(collapsed);
        onCollapseChange && onCollapseChange(group, collapsed);
    };
    if (element.isCollapsed()) {
        return (React.createElement(DefaultGroupCollapsed, Object.assign({ className: className, element: element, onCollapseChange: handleCollapse }, rest)));
    }
    return React.createElement(DefaultGroupExpanded, Object.assign({ className: className, element: element, onCollapseChange: handleCollapse }, rest));
};
export default observer(DefaultGroup);
//# sourceMappingURL=DefaultGroup.js.map