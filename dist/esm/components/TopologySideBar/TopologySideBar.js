import { __rest } from "tslib";
import * as React from 'react';
import { css } from '@patternfly/react-styles';
import styles from '@patternfly/react-styles/css/components/Topology/topology-side-bar';
import TimesIcon from '@patternfly/react-icons/dist/esm/icons/times-icon';
import { Button } from '@patternfly/react-core';
export const TopologySideBar = (_a) => {
    var { className = '', resizable = false, show, onClose = null, header, children = null } = _a, otherProps = __rest(_a, ["className", "resizable", "show", "onClose", "header", "children"]);
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
        ? css(styles.topologyResizableSideBar, className)
        : css(styles.topologySideBar, 'fade', className, show && styles.shown, isIn && styles.in);
    return (React.createElement("div", Object.assign({}, otherProps, { role: "dialog", className: classNames }), (resizable || show) && (React.createElement(React.Fragment, null,
        onClose && (React.createElement(Button, { className: css(styles.topologySideBarDismiss), variant: "plain", onClick: onClose, "aria-label": "Close" },
            React.createElement(TimesIcon, null))),
        header && React.createElement("div", { className: css(styles.topologySideBarHeader) }, header),
        children))));
};
TopologySideBar.displayName = 'TopologySideBar';
//# sourceMappingURL=TopologySideBar.js.map