"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.WithBendpoint = exports.withBendpoint = exports.useBendpoint = void 0;
const tslib_1 = require("tslib");
const React = tslib_1.__importStar(require("react"));
const mobx_1 = require("mobx");
const d3 = tslib_1.__importStar(require("d3"));
const mobx_react_1 = require("mobx-react");
const ElementContext_1 = tslib_1.__importDefault(require("../utils/ElementContext"));
const types_1 = require("../types");
const useDndDrag_1 = require("./useDndDrag");
const useBendpoint = (point, spec, props) => {
    const element = React.useContext(ElementContext_1.default);
    if (!types_1.isEdge(element)) {
        throw new Error('useBendpoint must be used within the scope of an Edge');
    }
    const elementRef = React.useRef(element);
    elementRef.current = element;
    const pointRef = React.useRef(point);
    pointRef.current = point;
    const [connect, dragRef] = useDndDrag_1.useDndDrag(React.useMemo(() => {
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
            return mobx_1.action(() => {
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
exports.useBendpoint = useBendpoint;
const withBendpoint = (spec) => (WrappedComponent) => {
    const Component = props => {
        const [dragProps, bendpointRef] = exports.useBendpoint(props.point, spec, props);
        return React.createElement(WrappedComponent, Object.assign({}, props, { bendpointRef: bendpointRef }, dragProps));
    };
    Component.displayName = `withBendpoint(${WrappedComponent.displayName || WrappedComponent.name})`;
    return mobx_react_1.observer(Component);
};
exports.withBendpoint = withBendpoint;
/**
 * @deprecated Use withBendpoint instead
 */
exports.WithBendpoint = exports.withBendpoint;
//# sourceMappingURL=useBendpoint.js.map