import { css } from '@patternfly/react-styles';
import styles from '@patternfly/react-styles/css/components/Topology/topology-components';
import * as React from 'react';
import { useAnchor } from '../../../behavior';
import { EllipseAnchor } from '../../../anchors';
const Ellipse = ({ className = css(styles.topologyNodeBackground), width, height, filter, dndDropRef }) => {
    useAnchor(EllipseAnchor);
    return (React.createElement("ellipse", { className: className, ref: dndDropRef, cx: width / 2, cy: height / 2, rx: Math.max(0, width / 2 - 1), ry: Math.max(0, height / 2 - 1), filter: filter }));
};
export default Ellipse;
//# sourceMappingURL=Ellipse.js.map