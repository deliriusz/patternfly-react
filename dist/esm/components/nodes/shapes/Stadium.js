import { css } from '@patternfly/react-styles';
import styles from '@patternfly/react-styles/css/components/Topology/topology-components';
import * as React from 'react';
import { useSvgAnchor } from '../../../behavior';
import { getHullPath } from './shapeUtils';
import { useCombineRefs } from '../../../utils';
const getStadiumPoints = (width, radius) => [
    [radius, radius],
    [width - radius, radius],
    [width - radius, radius],
    [radius, radius]
];
const Stadium = ({ className = css(styles.topologyNodeBackground), width, height, filter, dndDropRef }) => {
    const anchorRef = useSvgAnchor();
    const refs = useCombineRefs(dndDropRef, anchorRef);
    const points = React.useMemo(() => getHullPath(getStadiumPoints(width, height / 2), height / 2), [height, width]);
    return React.createElement("path", { className: className, ref: refs, d: points, filter: filter });
};
export default Stadium;
//# sourceMappingURL=Stadium.js.map