import { __awaiter } from "tslib";
import * as React from 'react';
import { observer } from 'mobx-react';
import { css } from '@patternfly/react-styles';
import styles from '@patternfly/react-styles/css/components/Topology/topology-components';
import { hullPath } from '../utils/svg-utils';
import DefaultCreateConnector from '../components/DefaultCreateConnector';
import Point from '../geom/Point';
import Layer from '../components/layers/Layer';
import { ContextMenu, ContextMenuItem } from '../components/contextmenu';
import { AnchorEnd, isGraph, isNode, LabelPosition } from '../types';
import { useDndDrag } from './useDndDrag';
import { TOP_LAYER } from '../const';
import { useCombineRefs, useHover } from '../utils';
export const CREATE_CONNECTOR_OPERATION = '#createconnector#';
export const CREATE_CONNECTOR_DROP_TYPE = '#createConnector#';
const isReactElementArray = (choices) => React.isValidElement(choices[0]);
const DEFAULT_HANDLE_ANGLE = Math.PI / 180;
const DEFAULT_HANDLE_ANGLE_TOP = 1.5 * Math.PI;
const DEFAULT_HANDLE_LENGTH = 32;
const CreateConnectorWidget = observer(props => {
    const { element, onKeepAlive, onCreate, ConnectorComponent, handleAngle = DEFAULT_HANDLE_ANGLE, handleAngleTop = DEFAULT_HANDLE_ANGLE_TOP, handleLength = DEFAULT_HANDLE_LENGTH, contextMenuClass, dragItem, dragOperation, hideConnectorMenu } = props;
    const [prompt, setPrompt] = React.useState(null);
    const [active, setActive] = React.useState(false);
    const hintsRef = React.useRef();
    const spec = React.useMemo(() => {
        const dragSourceSpec = {
            item: dragItem || { type: CREATE_CONNECTOR_DROP_TYPE },
            operation: dragOperation || { type: CREATE_CONNECTOR_OPERATION },
            begin: (monitor, dragProps) => {
                setActive(true);
                return dragProps.element;
            },
            drag: (event, monitor, p) => {
                p.element.raise();
            },
            end: (dropResult, monitor, dragProps) => __awaiter(void 0, void 0, void 0, function* () {
                const event = monitor.getDragEvent();
                if ((isNode(dropResult) || isGraph(dropResult)) && event) {
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
    const [{ dragging, event, hints }, dragRef] = useDndDrag(spec, props);
    const [hover, hoverRef] = useHover();
    const refs = useCombineRefs(dragRef, hoverRef);
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
        endPoint = new Point(dragEvent.x, dragEvent.y);
        startPoint = element.getAnchor(AnchorEnd.source).getLocation(endPoint);
    }
    else {
        const bounds = element.getBounds();
        const isRightLabel = element.getLabelPosition() === LabelPosition.right;
        const referencePoint = isRightLabel
            ? new Point(bounds.x + bounds.width / 2, bounds.y)
            : new Point(bounds.right(), Math.tan(handleAngle) * (bounds.width / 2) + bounds.y + bounds.height / 2);
        startPoint = element.getAnchor(AnchorEnd.source).getLocation(referencePoint);
        endPoint = new Point(Math.cos(isRightLabel ? handleAngleTop : handleAngle) * handleLength + startPoint.x, Math.sin(isRightLabel ? handleAngleTop : handleAngle) * handleLength + startPoint.y);
    }
    // bring into the coordinate space of the element
    element.translateFromParent(startPoint);
    element.translateFromParent(endPoint);
    return (React.createElement(React.Fragment, null,
        React.createElement(Layer, { id: TOP_LAYER },
            React.createElement("g", { className: css(styles.topologyDefaultCreateConnector), ref: refs, onMouseEnter: !active ? () => onKeepAlive(true) : undefined, onMouseLeave: !active ? () => onKeepAlive(false) : undefined },
                React.createElement(ConnectorComponent, { startPoint: startPoint, endPoint: endPoint, dragging: dragging, hints: hintsRef.current || [], hover: hover }),
                React.createElement("path", { d: hullPath([
                        [startPoint.x, startPoint.y],
                        [endPoint.x, endPoint.y]
                    ], 7), fillOpacity: "0" }))),
        prompt && (React.createElement(ContextMenu, { reference: { x: prompt.event.pageX, y: prompt.event.pageY }, className: contextMenuClass, open: true, onRequestClose: () => {
                setActive(false);
                onKeepAlive(false);
            } }, isReactElementArray(prompt.choices)
            ? prompt.choices
            : prompt.choices.map((c) => (React.createElement(ContextMenuItem, { key: c.label, onClick: () => {
                    onCreate(prompt.element, prompt.target, prompt.event, hintsRef.current, c);
                } }, c.label)))))));
});
export const withCreateConnector = (onCreate, ConnectorComponent = DefaultCreateConnector, contextMenuClass, options) => (WrappedComponent) => {
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
    return observer(Component);
};
//# sourceMappingURL=withCreateConnector.js.map