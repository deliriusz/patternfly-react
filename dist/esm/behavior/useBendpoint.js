import * as React from 'react';
import { action } from 'mobx';
import * as d3 from 'd3';
import { observer } from 'mobx-react';
import ElementContext from '../utils/ElementContext';
import { isEdge } from '../types';
import { useDndDrag } from './useDndDrag';
export const useBendpoint = (point, spec, props) => {
    const element = React.useContext(ElementContext);
    if (!isEdge(element)) {
        throw new Error('useBendpoint must be used within the scope of an Edge');
    }
    const elementRef = React.useRef(element);
    elementRef.current = element;
    const pointRef = React.useRef(point);
    pointRef.current = point;
    const [connect, dragRef] = useDndDrag(React.useMemo(() => {
        const sourceSpec = {
            item: { type: '#useBendpoint#' },
            begin: (monitor, p) => (spec && spec.begin ? spec.begin(monitor, p) : undefined),
            drag: (event, monitor, p) => {
                // assumes the edge is in absolute coordinate space
                pointRef.current.translate(event.dx, event.dy);
                elementRef.current.raise();
                spec && spec.drag && spec.drag(event, monitor, p);
            },
            canDrag: spec ? spec.canDrag : undefined,
            end: spec ? spec.end : undefined,
            collect: spec ? spec.collect : undefined
        };
        return sourceSpec;
    }, [spec]), props);
    // argh react events don't play nice with d3 pan zoom double click event
    const ref = React.useCallback(node => {
        d3.select(node).on('click', function (event) {
            return action(() => {
                if (event.shiftKey) {
                    event.stopPropagation();
                    elementRef.current.removeBendpoint(pointRef.current);
                }
            });
        });
        dragRef(node);
    }, [dragRef]);
    return [connect, ref];
};
export const withBendpoint = (spec) => (WrappedComponent) => {
    const Component = props => {
        const [dragProps, bendpointRef] = useBendpoint(props.point, spec, props);
        return React.createElement(WrappedComponent, Object.assign({}, props, { bendpointRef: bendpointRef }, dragProps));
    };
    Component.displayName = `withBendpoint(${WrappedComponent.displayName || WrappedComponent.name})`;
    return observer(Component);
};
/**
 * @deprecated Use withBendpoint instead
 */
export const WithBendpoint = withBendpoint;
//# sourceMappingURL=useBendpoint.js.map