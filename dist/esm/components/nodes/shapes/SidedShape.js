import { css } from '@patternfly/react-styles';
import styles from '@patternfly/react-styles/css/components/Topology/topology-components';
import * as React from 'react';
import { getPathForSides, getPointsForSides } from './shapeUtils';
import { usePolygonAnchor } from '../../../behavior';
const SidedShape = ({ className = css(styles.topologyNodeBackground), width, height, filter, sides = 6, cornerRadius = 0, dndDropRef }) => {
    const [polygonPoints, points] = React.useMemo(() => {
        const polygonPoints = getPointsForSides(sides, Math.min(width, height));
        return [
            polygonPoints,
            cornerRadius
                ? getPathForSides(sides, Math.min(width, height), cornerRadius)
                : polygonPoints.map(p => `${p[0]},${p[1]}`).join(' ')
        ];
    }, [cornerRadius, height, sides, width]);
    usePolygonAnchor(polygonPoints);
    return cornerRadius ? (React.createElement("path", { className: className, ref: dndDropRef, d: points, filter: filter })) : (React.createElement("polygon", { className: className, ref: dndDropRef, points: points, filter: filter }));
};
export default SidedShape;
//# sourceMappingURL=SidedShape.js.map