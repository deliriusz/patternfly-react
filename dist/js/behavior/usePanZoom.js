"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.withPanZoom = exports.usePanZoom = void 0;
const tslib_1 = require("tslib");
const React = tslib_1.__importStar(require("react"));
const d3 = tslib_1.__importStar(require("d3"));
const mobx_react_1 = require("mobx-react");
const mobx_1 = require("mobx");
const ElementContext_1 = tslib_1.__importDefault(require("../utils/ElementContext"));
const useCallbackRef_1 = tslib_1.__importDefault(require("../utils/useCallbackRef"));
const Point_1 = tslib_1.__importDefault(require("../geom/Point"));
const types_1 = require("../types");
const const_1 = require("../const");
// Used to send events prevented by d3.zoom to the document allowing modals, dropdowns, etc, to close
const propagatePanZoomMouseEvent = (e) => {
    document.dispatchEvent(new MouseEvent(e.type, e));
};
const usePanZoom = () => {
    const element = React.useContext(ElementContext_1.default);
    if (!types_1.isGraph(element)) {
        throw new Error('usePanZoom must be used within the scope of a Graph');
    }
    const elementRef = React.useRef(element);
    elementRef.current = element;
    return useCallbackRef_1.default((node) => {
        let disposeListener;
        if (node) {
            // TODO fix any type
            const $svg = d3.select(node.ownerSVGElement);
            if (node && node.ownerSVGElement) {
                node.ownerSVGElement.addEventListener('mousedown', propagatePanZoomMouseEvent);
                node.ownerSVGElement.addEventListener('click', propagatePanZoomMouseEvent);
            }
            const zoom = d3
                .zoom()
                .scaleExtent(elementRef.current.getScaleExtent())
                .on('zoom', mobx_1.action(() => {
                elementRef.current.setPosition(new Point_1.default(d3.event.transform.x, d3.event.transform.y));
                elementRef.current.setScale(d3.event.transform.k);
            }))
                .filter(() => {
                if (d3.event.ctrlKey || d3.event.button) {
                    return false;
                }
                // only allow zoom from double clicking the graph directly
                if (d3.event.type === 'dblclick') {
                    // check if target is not within a node or edge
                    const svg = node.ownerSVGElement;
                    let p = d3.event.target;
                    while (p && p !== svg) {
                        if (p instanceof Element) {
                            const kind = p.getAttribute(const_1.ATTR_DATA_KIND);
                            if (kind) {
                                if (kind !== types_1.ModelKind.graph) {
                                    return false;
                                }
                                break;
                            }
                        }
                        p = p.parentNode;
                    }
                }
                return true;
            });
            zoom($svg);
            // Update the d3 transform whenever the scale or bounds change.
            // This is kinda hacky because when d3 has already made the most recent transform update,
            // we listen for the model change, due to the above, only to update the d3 transform again.
            disposeListener = mobx_1.autorun(() => {
                const scale = elementRef.current.getScale();
                const scaleExtent = elementRef.current.getScaleExtent();
                // update the min scaling value such that the user can zoom out to the new scale in case
                // it is smaller than the default zoom out scale
                zoom.scaleExtent([Math.min(scale, scaleExtent[0]), scaleExtent[1]]);
                const b = elementRef.current.getBounds();
                // update d3 zoom data directly
                // eslint-disable-next-line no-underscore-dangle
                Object.assign($svg.node().__zoom, {
                    k: scale,
                    x: b.x,
                    y: b.y
                });
            });
            // disable double click zoom
            // $svg.on('dblclick.zoom', null);
        }
        return () => {
            disposeListener && disposeListener();
            if (node) {
                // remove all zoom listeners
                d3.select(node.ownerSVGElement).on('.zoom', null);
                if (node.ownerSVGElement) {
                    node.ownerSVGElement.removeEventListener('mousedown', propagatePanZoomMouseEvent);
                    node.ownerSVGElement.removeEventListener('click', propagatePanZoomMouseEvent);
                }
            }
        };
    });
};
exports.usePanZoom = usePanZoom;
const withPanZoom = () => (WrappedComponent) => {
    const Component = props => {
        const panZoomRef = exports.usePanZoom();
        return React.createElement(WrappedComponent, Object.assign({}, props, { panZoomRef: panZoomRef }));
    };
    Component.displayName = `withPanZoom(${WrappedComponent.displayName || WrappedComponent.name})`;
    return mobx_react_1.observer(Component);
};
exports.withPanZoom = withPanZoom;
//# sourceMappingURL=usePanZoom.js.map