import * as React from 'react';
import * as d3 from 'd3';
import { observer } from 'mobx-react';
import { pointInSvgPath } from 'point-in-svg-path';
import { comparer, computed } from 'mobx';
import ElementContext from '../utils/ElementContext';
import Point from '../geom/Point';
import { useDndManager } from './useDndManager';
const EMPTY_PROPS = Object.freeze({});
export const useDndDrop = (spec, props) => {
    const specRef = React.useRef(spec);
    specRef.current = spec;
    const propsRef = React.useRef(props != null ? props : EMPTY_PROPS);
    propsRef.current = props != null ? props : EMPTY_PROPS;
    const dndManager = useDndManager();
    const nodeRef = React.useRef(null);
    const idRef = React.useRef();
    const monitor = React.useMemo(() => {
        const targetMonitor = {
            getHandlerId: () => idRef.current,
            receiveHandlerId: (sourceId) => {
                idRef.current = sourceId;
            },
            canDrop: () => dndManager.canDropOnTarget(idRef.current),
            isDragging: () => dndManager.isDragging(),
            hasDropTarget: () => dndManager.hasDropTarget(),
            getDropHints: () => dndManager.getDropHints(),
            isOver(options) {
                return dndManager.isOverTarget(idRef.current, options);
            },
            getItemType: () => dndManager.getItemType(),
            getItem: () => dndManager.getItem(),
            getDropResult: () => dndManager.getDropResult(),
            didDrop: () => dndManager.didDrop(),
            getDragEvent: () => dndManager.getDragEvent(),
            getOperation: () => dndManager.getOperation(),
            isCancelled: () => dndManager.isCancelled()
        };
        return targetMonitor;
    }, [dndManager]);
    const element = React.useContext(ElementContext);
    const elementRef = React.useRef(element);
    elementRef.current = element;
    React.useEffect(() => {
        const dropTarget = {
            type: spec.accept,
            dropHint: () => {
                if (typeof specRef.current.dropHint === 'string') {
                    return specRef.current.dropHint;
                }
                if (typeof specRef.current.dropHint === 'function') {
                    return specRef.current.dropHint(monitor.getItem(), monitor, propsRef.current);
                }
                return elementRef.current.getType();
            },
            hitTest: (x, y) => {
                if (specRef.current.hitTest) {
                    return specRef.current.hitTest(x, y, propsRef.current);
                }
                if (nodeRef.current) {
                    if (!(nodeRef.current instanceof SVGGraphicsElement)) {
                        return false;
                    }
                    // Rounding the coordinates due to an issue with `point-in-svg-path` returning false
                    // when the coordinates clearly are within the path.
                    const point = Point.singleUse(Math.round(x), Math.round(y));
                    // Translate to this element's coordinates.
                    // Assumes the node is not within an svg element containing another transform.
                    elementRef.current.translateFromAbsolute(point);
                    // perform a fast bounds check
                    const { x: bboxx, y: bboxy, width, height } = nodeRef.current.getBBox();
                    if (point.x < bboxx || point.x > bboxx + width || point.y < bboxy || point.y > bboxy + height) {
                        return false;
                    }
                    if (nodeRef.current instanceof SVGPathElement) {
                        const d = nodeRef.current.getAttribute('d');
                        return pointInSvgPath(d, point.x, point.y);
                    }
                    if (nodeRef.current instanceof SVGCircleElement) {
                        const { cx, cy, r } = nodeRef.current;
                        return Math.sqrt(Math.pow((point.x - cx.animVal.value), 2) + Math.pow((point.y - cy.animVal.value), 2)) < r.animVal.value;
                    }
                    if (nodeRef.current instanceof SVGEllipseElement) {
                        const { cx, cy, rx, ry } = nodeRef.current;
                        return (Math.pow((point.x - cx.animVal.value), 2) / Math.pow(rx.animVal.value, 2) +
                            Math.pow((point.y - cy.animVal.value), 2) / Math.pow(ry.animVal.value, 2) <=
                            1);
                    }
                    if (nodeRef.current instanceof SVGPolygonElement) {
                        const arr = (nodeRef.current.getAttribute('points') || '')
                            .replace(/,/g, ' ')
                            .split(' ')
                            .map(s => +s);
                        const points = [];
                        for (let i = 0; i < arr.length; i += 2) {
                            points.push(arr.slice(i, i + 2));
                        }
                        return d3.polygonContains(points, [point.x, point.y]);
                    }
                    // TODO support round rect
                    // already passed the bbox test
                    return true;
                }
                return false;
            },
            hover: () => {
                specRef.current.hover && specRef.current.hover(monitor.getItem(), monitor, propsRef.current);
            },
            canDrop: () => {
                if (typeof specRef.current.canDrop === 'boolean') {
                    return specRef.current.canDrop;
                }
                if (typeof specRef.current.canDrop === 'function') {
                    return specRef.current.canDrop(monitor.getItem(), monitor, propsRef.current);
                }
                return true;
            },
            drop: () => {
                if (specRef.current.drop) {
                    return specRef.current.drop(monitor.getItem(), monitor, propsRef.current);
                }
                if (!monitor.didDrop()) {
                    return elementRef.current;
                }
                return undefined;
            }
        };
        const [targetId, unregister] = dndManager.registerTarget(dropTarget);
        monitor.receiveHandlerId(targetId);
        return unregister;
    }, [spec.accept, dndManager, monitor]);
    const collected = React.useMemo(() => computed(() => (spec.collect ? spec.collect(monitor, propsRef.current) : {}), {
        equals: comparer.shallow
    }), [monitor, spec]);
    return [collected.get(), nodeRef];
};
export const withDndDrop = (spec) => (WrappedComponent) => {
    const Component = props => {
        // TODO fix cast to any
        const [dndDropProps, dndDropRef] = useDndDrop(spec, props);
        return React.createElement(WrappedComponent, Object.assign({}, props, dndDropProps, { dndDropRef: dndDropRef }));
    };
    Component.displayName = `withDndDrop(${WrappedComponent.displayName || WrappedComponent.name})`;
    return observer(Component);
};
//# sourceMappingURL=useDndDrop.js.map