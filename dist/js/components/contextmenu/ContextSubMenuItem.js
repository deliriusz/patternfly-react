"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const React = tslib_1.__importStar(require("react"));
const react_core_1 = require("@patternfly/react-core");
const react_styles_1 = require("@patternfly/react-styles");
const topology_components_1 = tslib_1.__importDefault(require("@patternfly/react-styles/css/components/Topology/topology-components"));
// FIXME fully qualified due to the effect of long build times on storybook
const Popper_1 = tslib_1.__importDefault(require("../popper/Popper"));
const angle_right_icon_1 = tslib_1.__importDefault(require('@patternfly/react-icons/dist/js/icons/angle-right-icon'));
const ContextSubMenuItem = (_a) => {
    var { label, children } = _a, other = tslib_1.__rest(_a, ["label", "children"]);
    const nodeRef = React.useRef(null);
    const subMenuRef = React.useRef(null);
    const [open, setOpen] = React.useState(false);
    const referenceCb = React.useCallback(() => nodeRef.current || { x: 0, y: 0 }, []);
    return (React.createElement(React.Fragment, null,
        React.createElement(react_core_1.DropdownItem, Object.assign({}, other, { className: react_styles_1.css(topology_components_1.default.topologyContextSubMenu), component: React.createElement("button", { ref: nodeRef, type: "button", 
                // prevent this DropdownItem from executing like a normal action item
                onClick: e => e.stopPropagation(), 
                // mouse enter will open the sub menu
                onMouseEnter: () => setOpen(true), onMouseLeave: e => {
                    // if the mouse leaves this item, close the sub menu only if the mouse did not enter the sub menu itself
                    if (!subMenuRef.current || !subMenuRef.current.contains(e.relatedTarget)) {
                        setOpen(false);
                    }
                }, onKeyDown: e => {
                    // open the sub menu on enter or right arrow
                    if (e.key === 'ArrowRight' || e.key === 'Enter') {
                        setOpen(true);
                        e.stopPropagation();
                    }
                } },
                label,
                React.createElement(angle_right_icon_1.default, { className: react_styles_1.css(topology_components_1.default.topologyContextSubMenuArrow) })) })),
        React.createElement(Popper_1.default, { open: open, placement: "right-start", closeOnEsc: true, closeOnOutsideClick: true, onRequestClose: e => {
                // only close the sub menu if clicking anywhere outside the menu item that owns the sub menu
                if (!e || !nodeRef.current || !nodeRef.current.contains(e.target)) {
                    setOpen(false);
                }
            }, reference: referenceCb, 
            // use the parent node to capture the li
            container: nodeRef.current ? nodeRef.current.parentElement : nodeRef.current, returnFocus: true },
            React.createElement("div", { ref: subMenuRef, role: "presentation", className: "pf-c-dropdown pf-m-expanded", onMouseLeave: e => {
                    // only close the sub menu if the mouse does not enter the item
                    if (!nodeRef.current || !nodeRef.current.contains(e.relatedTarget)) {
                        setOpen(false);
                    }
                }, onKeyDown: e => {
                    // close the sub menu on left arrow
                    if (e.key === 'ArrowLeft') {
                        setOpen(false);
                        e.stopPropagation();
                    }
                } },
                React.createElement(react_core_1.DropdownMenu, { className: react_styles_1.css(topology_components_1.default.topologyContextMenuCDropdownMenu), autoFocus: true }, children)))));
};
exports.default = ContextSubMenuItem;
//# sourceMappingURL=ContextSubMenuItem.js.map