import { __rest } from "tslib";
import * as React from 'react';
import { DropdownMenu, DropdownContext } from '@patternfly/react-core';
import { css } from '@patternfly/react-styles';
import topologyStyles from '@patternfly/react-styles/css/components/Topology/topology-components';
import styles from '@patternfly/react-styles/css/components/Dropdown/dropdown';
// FIXME fully qualified due to the effect of long build times on storybook
import Popper from '../popper/Popper';
const ContextMenu = (_a) => {
    var { children, open = true, onRequestClose } = _a, other = __rest(_a, ["children", "open", "onRequestClose"]);
    const [isOpen, setOpen] = React.useState(!!open);
    React.useEffect(() => {
        setOpen(open);
    }, [open]);
    const handleOnRequestClose = React.useCallback(() => {
        onRequestClose ? onRequestClose() : setOpen(false);
    }, [onRequestClose]);
    return (React.createElement(Popper, Object.assign({}, other, { closeOnEsc: true, closeOnOutsideClick: true, open: isOpen, onRequestClose: handleOnRequestClose }),
        React.createElement(DropdownContext.Provider, { value: {
                onSelect: handleOnRequestClose,
                toggleTextClass: styles.dropdownToggleText,
                toggleIconClass: styles.dropdownToggleIcon,
                menuClass: styles.dropdownMenu,
                itemClass: styles.dropdownMenuItem,
                toggleClass: styles.dropdownToggle,
                baseClass: styles.dropdown,
                baseComponent: 'div',
                sectionClass: styles.dropdownGroup,
                sectionTitleClass: styles.dropdownGroupTitle,
                sectionComponent: 'section',
                disabledClass: styles.modifiers.disabled
                // hoverClass: styles.modifiers.hover,
                // separatorClass: styles.dropdownSeparator,
            } },
            React.createElement("div", { className: css(styles.dropdown, styles.modifiers.expanded) },
                React.createElement(DropdownMenu, { className: css(topologyStyles.topologyContextMenuCDropdownMenu), autoFocus: true }, children)))));
};
export default ContextMenu;
//# sourceMappingURL=ContextMenu.js.map