"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const React = tslib_1.__importStar(require("react"));
const ReactDOM = tslib_1.__importStar(require("react-dom"));
const react_core_1 = require("@patternfly/react-core");
const getContainer = (container) => typeof container === 'function' ? container() : container;
const Portal = ({ children, container }) => {
    const [containerNode, setContainerNode] = React.useState();
    react_core_1.useIsomorphicLayoutEffect(() => {
        setContainerNode(getContainer(container) || document.body);
    }, [container]);
    return containerNode ? ReactDOM.createPortal(children, containerNode) : null;
};
exports.default = Portal;
//# sourceMappingURL=Portal.js.map