"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TopologySideBar = void 0;
const tslib_1 = require("tslib");
const React = tslib_1.__importStar(require("react"));
const react_styles_1 = require("@patternfly/react-styles");
const topology_side_bar_1 = tslib_1.__importDefault(require("@patternfly/react-styles/css/components/Topology/topology-side-bar"));
const times_icon_1 = tslib_1.__importDefault(require('@patternfly/react-icons/dist/js/icons/times-icon'));
const react_core_1 = require("@patternfly/react-core");
const TopologySideBar = (_a) => {
    var { className = '', resizable = false, show, onClose = null, header, children = null } = _a, otherProps = tslib_1.__rest(_a, ["className", "resizable", "show", "onClose", "header", "children"]);
    const [isIn, setIsIn] = React.useState(false);
    React.useEffect(() => {
        let timer = null;
        if (isIn !== show) {
            clearTimeout(timer);
            timer = setTimeout(() => setIsIn(show), 150);
        }
        return () => {
            clearTimeout(timer);
        };
    }, [show, isIn]);
    const classNames = resizable
        ? react_styles_1.css(topology_side_bar_1.default.topologyResizableSideBar, className)
        : react_styles_1.css(topology_side_bar_1.default.topologySideBar, 'fade', className, show && topology_side_bar_1.default.shown, isIn && topology_side_bar_1.default.in);
    return (React.createElement("div", Object.assign({}, otherProps, { role: "dialog", className: classNames }), (resizable || show) && (React.createElement(React.Fragment, null,
        onClose && (React.createElement(react_core_1.Button, { className: react_styles_1.css(topology_side_bar_1.default.topologySideBarDismiss), variant: "plain", onClick: onClose, "aria-label": "Close" },
            React.createElement(times_icon_1.default, null))),
        header && React.createElement("div", { className: react_styles_1.css(topology_side_bar_1.default.topologySideBarHeader) }, header),
        children))));
};
exports.TopologySideBar = TopologySideBar;
exports.TopologySideBar.displayName = 'TopologySideBar';
//# sourceMappingURL=TopologySideBar.js.map