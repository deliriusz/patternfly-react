import * as React from 'react';
import { css } from '@patternfly/react-styles';
import styles from '@patternfly/react-styles/css/components/Topology/topology-components';
import { getHullPath, RHOMBUS_CORNER_RADIUS } from './shapeUtils';
import { useSvgAnchor } from '../../../behavior';
import { useCombineRefs } from '../../../utils';
const getRhombusPoints = (width, height, padding) => [
    [width / 2, -padding],
    [width + padding, height / 2],
    [width / 2, height + padding],
    [-padding, height / 2]
];
const Rhombus = ({ className = css(styles.topologyNodeBackground), width, height, filter, cornerRadius = RHOMBUS_CORNER_RADIUS, dndDropRef }) => {
    const anchorRef = useSvgAnchor();
    const refs = useCombineRefs(dndDropRef, anchorRef);
    const points = React.useMemo(() => {
        const polygonPoints = getRhombusPoints(width, height, cornerRadius / 2);
        return cornerRadius
            ? getHullPath(getRhombusPoints(width, height, -cornerRadius), cornerRadius)
            : polygonPoints.map(p => `${p[0]},${p[1]}`).join(' ');
    }, [cornerRadius, height, width]);
    return cornerRadius ? (React.createElement("path", { className: className, ref: refs, d: points, filter: filter })) : (React.createElement("polygon", { className: className, ref: refs, points: points, filter: filter }));
};
export default Rhombus;
//# sourceMappingURL=Rhombus.js.map