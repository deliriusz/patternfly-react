import { __rest } from "tslib";
import * as React from 'react';
import { DropdownMenu, DropdownItem } from '@patternfly/react-core';
import { css } from '@patternfly/react-styles';
import topologyStyles from '@patternfly/react-styles/css/components/Topology/topology-components';
// FIXME fully qualified due to the effect of long build times on storybook
import Popper from '../popper/Popper';
import AngleRightIcon from '@patternfly/react-icons/dist/esm/icons/angle-right-icon';
const ContextSubMenuItem = (_a) => {
    var { label, children } = _a, other = __rest(_a, ["label", "children"]);
    const nodeRef = React.useRef(null);
    const subMenuRef = React.useRef(null);
    const [open, setOpen] = React.useState(false);
    const referenceCb = React.useCallback(() => nodeRef.current || { x: 0, y: 0 }, []);
    return (React.createElement(React.Fragment, null,
        React.createElement(DropdownItem, Object.assign({}, other, { className: css(topologyStyles.topologyContextSubMenu), component: React.createElement("button", { ref: nodeRef, type: "button", 
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
                React.createElement(AngleRightIcon, { className: css(topologyStyles.topologyContextSubMenuArrow) })) })),
        React.createElement(Popper, { open: open, placement: "right-start", closeOnEsc: true, closeOnOutsideClick: true, onRequestClose: e => {
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
                React.createElement(DropdownMenu, { className: css(topologyStyles.topologyContextMenuCDropdownMenu), autoFocus: true }, children)))));
};
export default ContextSubMenuItem;
//# sourceMappingURL=ContextSubMenuItem.js.map