"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.withCreateConnector = exports.CREATE_CONNECTOR_DROP_TYPE = exports.CREATE_CONNECTOR_OPERATION = void 0;
const tslib_1 = require("tslib");
const React = tslib_1.__importStar(require("react"));
const mobx_react_1 = require("mobx-react");
const react_styles_1 = require("@patternfly/react-styles");
const topology_components_1 = tslib_1.__importDefault(require("@patternfly/react-styles/css/components/Topology/topology-components"));
const svg_utils_1 = require("../utils/svg-utils");
const DefaultCreateConnector_1 = tslib_1.__importDefault(require("../components/DefaultCreateConnector"));
const Point_1 = tslib_1.__importDefault(require("../geom/Point"));
const Layer_1 = tslib_1.__importDefault(require("../components/layers/Layer"));
const contextmenu_1 = require("../components/contextmenu");
const types_1 = require("../types");
const useDndDrag_1 = require("./useDndDrag");
const const_1 = require("../const");
const utils_1 = require("../utils");
exports.CREATE_CONNECTOR_OPERATION = '#createconnector#';
exports.CREATE_CONNECTOR_DROP_TYPE = '#createConnector#';
const isReactElementArray = (choices) => React.isValidElement(choices[0]);
const DEFAULT_HANDLE_ANGLE = Math.PI / 180;
const DEFAULT_HANDLE_ANGLE_TOP = 1.5 * Math.PI;
const DEFAULT_HANDLE_LENGTH = 32;
const CreateConnectorWidget = mobx_react_1.observer(props => {
    const { element, onKeepAlive, onCreate, ConnectorComponent, handleAngle = DEFAULT_HANDLE_ANGLE, handleAngleTop = DEFAULT_HANDLE_ANGLE_TOP, handleLength = DEFAULT_HANDLE_LENGTH, contextMenuClass, dragItem, dragOperation, hideConnectorMenu } = props;
    const [prompt, setPrompt] = React.useState(null);
    const [active, setActive] = React.useState(false);
    const hintsRef = React.useRef();
    const spec = React.useMemo(() => {
        const dragSourceSpec = {
            item: dragItem || { type: exports.CREATE_CONNECTOR_DROP_TYPE },
            operation: dragOperation || { type: exports.CREATE_CONNECTOR_OPERATION },
            begin: (monitor, dragProps) => {
                setActive(true);
                return dragProps.element;
            },
            drag: (event, monitor, p) => {
                p.element.raise();
            },
            end: (dropResult, monitor, dragProps) => tslib_1.__awaiter(void 0, void 0, void 0, function* () {
                const event = monitor.getDragEvent();
                if ((types_1.isNode(dropResult) || types_1.isGraph(dropResult)) && event) {
                    const choices = yield dragProps.onCreate(dragProps.element, dropResult, event, monitor.getDropHints());
                    if (choices && choices.length && !hideConnectorMenu) {
                        setPrompt({ element: dragProps.element, target: dropResult, event, choices });
                        return;
                    }
                }
                setActive(false);
                dragProps.onKeepAlive(false);
            }),
            collect: monitor => ({
                dragging: !!monitor.getItem(),
                event: monitor.isDragging() ? monitor.getDragEvent() : undefined,
                hints: monitor.getDropHints()
            })
        };
        return dragSourceSpec;
    }, [setActive, dragItem, dragOperation, hideConnectorMenu]);
    const [{ dragging, event, hints }, dragRef] = useDndDrag_1.useDndDrag(spec, props);
    const [hover, hoverRef] = utils_1.useHover();
    const refs = utils_1.useCombineRefs(dragRef, hoverRef);
    if (!active && dragging && !event) {
        // another connector is dragging right now
        return null;
    }
    if (dragging) {
        // store the latest hints
        hintsRef.current = hints;
    }
    const dragEvent = prompt ? prompt.event : event;
    let startPoint;
    let endPoint;
    if (dragEvent) {
        endPoint = new Point_1.default(dragEvent.x, dragEvent.y);
        startPoint = element.getAnchor(types_1.AnchorEnd.source).getLocation(endPoint);
    }
    else {
        const bounds = element.getBounds();
        const isRightLabel = element.getLabelPosition() === types_1.LabelPosition.right;
        const referencePoint = isRightLabel
            ? new Point_1.default(bounds.x + bounds.width / 2, bounds.y)
            : new Point_1.default(bounds.right(), Math.tan(handleAngle) * (bounds.width / 2) + bounds.y + bounds.height / 2);
        startPoint = element.getAnchor(types_1.AnchorEnd.source).getLocation(referencePoint);
        endPoint = new Point_1.default(Math.cos(isRightLabel ? handleAngleTop : handleAngle) * handleLength + startPoint.x, Math.sin(isRightLabel ? handleAngleTop : handleAngle) * handleLength + startPoint.y);
    }
    // bring into the coordinate space of the element
    element.translateFromParent(startPoint);
    element.translateFromParent(endPoint);
    return (React.createElement(React.Fragment, null,
        React.createElement(Layer_1.default, { id: const_1.TOP_LAYER },
            React.createElement("g", { className: react_styles_1.css(topology_components_1.default.topologyDefaultCreateConnector), ref: refs, onMouseEnter: !active ? () => onKeepAlive(true) : undefined, onMouseLeave: !active ? () => onKeepAlive(false) : undefined },
                React.createElement(ConnectorComponent, { startPoint: startPoint, endPoint: endPoint, dragging: dragging, hints: hintsRef.current || [], hover: hover }),
                React.createElement("path", { d: svg_utils_1.hullPath([
                        [startPoint.x, startPoint.y],
                        [endPoint.x, endPoint.y]
                    ], 7), fillOpacity: "0" }))),
        prompt && (React.createElement(contextmenu_1.ContextMenu, { reference: { x: prompt.event.pageX, y: prompt.event.pageY }, className: contextMenuClass, open: true, onRequestClose: () => {
                setActive(false);
                onKeepAlive(false);
            } }, isReactElementArray(prompt.choices)
            ? prompt.choices
            : prompt.choices.map((c) => (React.createElement(contextmenu_1.ContextMenuItem, { key: c.label, onClick: () => {
                    onCreate(prompt.element, prompt.target, prompt.event, hintsRef.current, c);
                } }, c.label)))))));
});
const withCreateConnector = (onCreate, ConnectorComponent = DefaultCreateConnector_1.default, contextMenuClass, options) => (WrappedComponent) => {
    const Component = props => {
        const [show, setShow] = React.useState(false);
        const [alive, setKeepAlive] = React.useState(false);
        const onShowCreateConnector = React.useCallback(() => setShow(true), []);
        const onHideCreateConnector = React.useCallback(() => setShow(false), []);
        const onKeepAlive = React.useCallback((isAlive) => setKeepAlive(isAlive), [setKeepAlive]);
        return (React.createElement(React.Fragment, null,
            React.createElement(WrappedComponent, Object.assign({}, props, { onShowCreateConnector: onShowCreateConnector, onHideCreateConnector: onHideCreateConnector })),
            (show || alive) && (React.createElement(CreateConnectorWidget, Object.assign({}, options, { element: props.element, onCreate: onCreate, onKeepAlive: onKeepAlive, ConnectorComponent: ConnectorComponent, contextMenuClass: contextMenuClass })))));
    };
    Component.displayName = `withCreateConnector(${WrappedComponent.displayName || WrappedComponent.name})`;
    return mobx_react_1.observer(Component);
};
exports.withCreateConnector = withCreateConnector;
//# sourceMappingURL=withCreateConnector.js.map