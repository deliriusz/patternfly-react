"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const React = tslib_1.__importStar(require("react"));
const react_core_1 = require("@patternfly/react-core");
const react_styles_1 = require("@patternfly/react-styles");
const topology_components_1 = tslib_1.__importDefault(require("@patternfly/react-styles/css/components/Topology/topology-components"));
const dropdown_1 = tslib_1.__importDefault(require("@patternfly/react-styles/css/components/Dropdown/dropdown"));
// FIXME fully qualified due to the effect of long build times on storybook
const Popper_1 = tslib_1.__importDefault(require("../popper/Popper"));
const ContextMenu = (_a) => {
    var { children, open = true, onRequestClose } = _a, other = tslib_1.__rest(_a, ["children", "open", "onRequestClose"]);
    const [isOpen, setOpen] = React.useState(!!open);
    React.useEffect(() => {
        setOpen(open);
    }, [open]);
    const handleOnRequestClose = React.useCallback(() => {
        onRequestClose ? onRequestClose() : setOpen(false);
    }, [onRequestClose]);
    return (React.createElement(Popper_1.default, Object.assign({}, other, { closeOnEsc: true, closeOnOutsideClick: true, open: isOpen, onRequestClose: handleOnRequestClose }),
        React.createElement(react_core_1.DropdownContext.Provider, { value: {
                onSelect: handleOnRequestClose,
                toggleTextClass: dropdown_1.default.dropdownToggleText,
                toggleIconClass: dropdown_1.default.dropdownToggleIcon,
                menuClass: dropdown_1.default.dropdownMenu,
                itemClass: dropdown_1.default.dropdownMenuItem,
                toggleClass: dropdown_1.default.dropdownToggle,
                baseClass: dropdown_1.default.dropdown,
                baseComponent: 'div',
                sectionClass: dropdown_1.default.dropdownGroup,
                sectionTitleClass: dropdown_1.default.dropdownGroupTitle,
                sectionComponent: 'section',
                disabledClass: dropdown_1.default.modifiers.disabled
                // hoverClass: styles.modifiers.hover,
                // separatorClass: styles.dropdownSeparator,
            } },
            React.createElement("div", { className: react_styles_1.css(dropdown_1.default.dropdown, dropdown_1.default.modifiers.expanded) },
                React.createElement(react_core_1.DropdownMenu, { className: react_styles_1.css(topology_components_1.default.topologyContextMenuCDropdownMenu), autoFocus: true }, children)))));
};
exports.default = ContextMenu;
//# sourceMappingURL=ContextMenu.js.map