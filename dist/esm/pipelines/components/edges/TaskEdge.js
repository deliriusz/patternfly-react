import * as React from 'react';
import { observer } from 'mobx-react';
import { css } from '@patternfly/react-styles';
import styles from '@patternfly/react-styles/css/components/Topology/topology-components';
import { integralShapePath } from '../../utils';
const TaskEdge = ({ element, className, nodeSeparation }) => {
    var _a;
    const startPoint = element.getStartPoint();
    const endPoint = element.getEndPoint();
    const groupClassName = css(styles.topologyEdge, className);
    const startIndent = ((_a = element.getData()) === null || _a === void 0 ? void 0 : _a.indent) || 0;
    return (React.createElement("g", { "data-test-id": "task-handler", className: groupClassName, fillOpacity: 0 },
        React.createElement("path", { d: integralShapePath(startPoint, endPoint, startIndent, nodeSeparation), transform: "translate(0.5,0.5)", shapeRendering: "geometricPrecision" })));
};
export default observer(TaskEdge);
//# sourceMappingURL=TaskEdge.js.map