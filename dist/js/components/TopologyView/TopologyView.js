"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TopologyView = void 0;
const tslib_1 = require("tslib");
const React = tslib_1.__importStar(require("react"));
const react_core_1 = require("@patternfly/react-core");
const react_styles_1 = require("@patternfly/react-styles");
const topology_view_1 = tslib_1.__importDefault(require("@patternfly/react-styles/css/components/Topology/topology-view"));
const topology_side_bar_1 = tslib_1.__importDefault(require("@patternfly/react-styles/css/components/Topology/topology-side-bar"));
const topology_controlbar_1 = tslib_1.__importDefault(require("@patternfly/react-styles/css/components/Topology/topology-controlbar"));
const TopologyView = (_a) => {
    var { className = '', contextToolbar = null, viewToolbar = null, children = null, controlBar = null, sideBar = null, sideBarResizable = false, sideBarOpen = false, defaultSideBarSize = '500px', minSideBarSize = '150px', maxSideBarSize = '100%', onSideBarResize } = _a, props = tslib_1.__rest(_a, ["className", "contextToolbar", "viewToolbar", "children", "controlBar", "sideBar", "sideBarResizable", "sideBarOpen", "defaultSideBarSize", "minSideBarSize", "maxSideBarSize", "onSideBarResize"]);
    const topologyContent = !sideBarResizable ? (React.createElement(react_core_1.StackItem, { isFilled: true, className: react_styles_1.css(topology_view_1.default.topologyContainer, sideBar && topology_side_bar_1.default.topologyContainerWithSidebar, sideBarOpen && topology_side_bar_1.default.topologyContainerWithSidebarOpen) },
        React.createElement("div", { className: react_styles_1.css(topology_view_1.default.topologyContent) },
            children,
            controlBar && React.createElement("span", { className: react_styles_1.css(topology_controlbar_1.default.topologyControlBar) }, controlBar)),
        sideBar)) : (React.createElement(react_core_1.StackItem, { isFilled: true, className: react_styles_1.css(topology_view_1.default.topologyContainer) },
        React.createElement(react_core_1.Drawer, { isExpanded: sideBarOpen, isInline: true },
            React.createElement(react_core_1.DrawerContent, { panelContent: React.createElement(react_core_1.DrawerPanelContent, { isResizable: sideBarResizable, id: "topology-resize-panel", defaultSize: defaultSideBarSize, minSize: minSideBarSize, maxSize: maxSideBarSize, onResize: onSideBarResize }, sideBar) },
                React.createElement(react_core_1.DrawerContentBody, null,
                    React.createElement("div", { className: react_styles_1.css(topology_view_1.default.topologyContent) },
                        children,
                        controlBar && React.createElement("span", { className: react_styles_1.css(topology_controlbar_1.default.topologyControlBar) }, controlBar)))))));
    return (React.createElement(react_core_1.Stack, Object.assign({ className: className }, props),
        contextToolbar || viewToolbar ? (React.createElement(react_core_1.StackItem, { isFilled: false },
            React.createElement(react_core_1.GenerateId, { prefix: "pf-topology-view-" }, randomId => (React.createElement(react_core_1.Toolbar, { id: randomId },
                contextToolbar && (React.createElement(react_core_1.ToolbarContent, null,
                    React.createElement(react_core_1.ToolbarGroup, { className: "pf-topology-view__project-toolbar" }, contextToolbar))),
                viewToolbar && (React.createElement(react_core_1.ToolbarContent, null,
                    React.createElement(react_core_1.ToolbarGroup, { className: "pf-topology-view__view-toolbar" }, viewToolbar))),
                React.createElement(react_core_1.Divider, null)))))) : null,
        topologyContent));
};
exports.TopologyView = TopologyView;
exports.TopologyView.displayName = 'TopologyView';
//# sourceMappingURL=TopologyView.js.map