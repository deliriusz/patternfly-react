import { __rest } from "tslib";
import * as React from 'react';
import { Drawer, DrawerContent, DrawerContentBody, DrawerPanelContent, Toolbar, ToolbarContent, ToolbarGroup, Divider, GenerateId, Stack, StackItem } from '@patternfly/react-core';
import { css } from '@patternfly/react-styles';
import styles from '@patternfly/react-styles/css/components/Topology/topology-view';
import sideBarStyles from '@patternfly/react-styles/css/components/Topology/topology-side-bar';
import controlBarStyles from '@patternfly/react-styles/css/components/Topology/topology-controlbar';
export const TopologyView = (_a) => {
    var { className = '', contextToolbar = null, viewToolbar = null, children = null, controlBar = null, sideBar = null, sideBarResizable = false, sideBarOpen = false, defaultSideBarSize = '500px', minSideBarSize = '150px', maxSideBarSize = '100%', onSideBarResize } = _a, props = __rest(_a, ["className", "contextToolbar", "viewToolbar", "children", "controlBar", "sideBar", "sideBarResizable", "sideBarOpen", "defaultSideBarSize", "minSideBarSize", "maxSideBarSize", "onSideBarResize"]);
    const topologyContent = !sideBarResizable ? (React.createElement(StackItem, { isFilled: true, className: css(styles.topologyContainer, sideBar && sideBarStyles.topologyContainerWithSidebar, sideBarOpen && sideBarStyles.topologyContainerWithSidebarOpen) },
        React.createElement("div", { className: css(styles.topologyContent) },
            children,
            controlBar && React.createElement("span", { className: css(controlBarStyles.topologyControlBar) }, controlBar)),
        sideBar)) : (React.createElement(StackItem, { isFilled: true, className: css(styles.topologyContainer) },
        React.createElement(Drawer, { isExpanded: sideBarOpen, isInline: true },
            React.createElement(DrawerContent, { panelContent: React.createElement(DrawerPanelContent, { isResizable: sideBarResizable, id: "topology-resize-panel", defaultSize: defaultSideBarSize, minSize: minSideBarSize, maxSize: maxSideBarSize, onResize: onSideBarResize }, sideBar) },
                React.createElement(DrawerContentBody, null,
                    React.createElement("div", { className: css(styles.topologyContent) },
                        children,
                        controlBar && React.createElement("span", { className: css(controlBarStyles.topologyControlBar) }, controlBar)))))));
    return (React.createElement(Stack, Object.assign({ className: className }, props),
        contextToolbar || viewToolbar ? (React.createElement(StackItem, { isFilled: false },
            React.createElement(GenerateId, { prefix: "pf-topology-view-" }, randomId => (React.createElement(Toolbar, { id: randomId },
                contextToolbar && (React.createElement(ToolbarContent, null,
                    React.createElement(ToolbarGroup, { className: "pf-topology-view__project-toolbar" }, contextToolbar))),
                viewToolbar && (React.createElement(ToolbarContent, null,
                    React.createElement(ToolbarGroup, { className: "pf-topology-view__view-toolbar" }, viewToolbar))),
                React.createElement(Divider, null)))))) : null,
        topologyContent));
};
TopologyView.displayName = 'TopologyView';
//# sourceMappingURL=TopologyView.js.map