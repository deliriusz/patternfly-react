import * as React from 'react';
import * as _ from 'lodash';
import { action } from 'mobx';
// https://github.com/mobxjs/mobx-react#observer-batching
import 'mobx-react/batchingForReactDom';
import { observer } from 'mobx-react';
import ReactMeasure from 'react-measure';
import { css } from '@patternfly/react-styles';
import styles from '@patternfly/react-styles/css/components/Topology/topology-components';
import SVGDefsProvider from './defs/SVGDefsProvider';
import ElementWrapper from './ElementWrapper';
import Dimensions from '../geom/Dimensions';
import useVisualizationController from '../hooks/useVisualizationController';
import '@patternfly/react-styles/css/components/Topology/topology-components.css';
const stopEvent = (e) => {
    e.preventDefault();
    e.stopPropagation();
};
const VisualizationSurface = ({ state }) => {
    const controller = useVisualizationController();
    React.useEffect(() => {
        state && controller.setState(state);
    }, [controller, state]);
    const onMeasure = React.useMemo(() => _.debounce(action((contentRect) => {
        controller.getGraph().setDimensions(new Dimensions(contentRect.client.width, contentRect.client.height));
    }), 100, { leading: true, trailing: true }), [controller]);
    // dispose of onMeasure
    React.useEffect(() => () => onMeasure.cancel(), [onMeasure]);
    if (!controller.hasGraph()) {
        return null;
    }
    const graph = controller.getGraph();
    return (React.createElement(ReactMeasure, { client: true, onResize: onMeasure }, ({ measureRef }) => (
    // render an outer div because react-measure doesn't seem to fire events properly on svg resize
    React.createElement("div", { "data-test-id": "topology", className: css(styles.topologyVisualizationSurface), ref: measureRef },
        React.createElement("svg", { className: css(styles.topologyVisualizationSurfaceSvg), onContextMenu: stopEvent },
            React.createElement(SVGDefsProvider, null,
                React.createElement(ElementWrapper, { element: graph })))))));
};
export default observer(VisualizationSurface);
//# sourceMappingURL=VisualizationSurface.js.map