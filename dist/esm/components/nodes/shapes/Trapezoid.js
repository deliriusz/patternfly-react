import { css } from '@patternfly/react-styles';
import styles from '@patternfly/react-styles/css/components/Topology/topology-components';
import * as React from 'react';
import { getHullPath, TRAPEZOID_CORNER_RADIUS } from './shapeUtils';
import { usePolygonAnchor } from '../../../behavior';
const TOP_INSET_AMOUNT = 1 / 8;
const getTrapezoidPoints = (width, height, padding, outline = false) => {
    const yPadding = outline ? 0 : padding;
    const topXPadding = outline ? padding / 4 : padding;
    const bottomXPadding = outline ? -padding / 4 : padding;
    return [
        [width * TOP_INSET_AMOUNT + topXPadding, yPadding],
        [width - width * TOP_INSET_AMOUNT - topXPadding, yPadding],
        [width - bottomXPadding, height - yPadding],
        [bottomXPadding, height - yPadding]
    ];
};
const Trapezoid = ({ className = css(styles.topologyNodeBackground), width, height, filter, cornerRadius = TRAPEZOID_CORNER_RADIUS, dndDropRef }) => {
    const [polygonPoints, points] = React.useMemo(() => {
        const polygonPoints = getTrapezoidPoints(width, height, cornerRadius, true);
        const path = cornerRadius
            ? getHullPath(getTrapezoidPoints(width, height, cornerRadius), cornerRadius)
            : polygonPoints.map(p => `${p[0]},${p[1]}`).join(' ');
        return [polygonPoints, path];
    }, [height, cornerRadius, width]);
    usePolygonAnchor(polygonPoints);
    return cornerRadius ? (React.createElement("path", { className: className, ref: dndDropRef, d: points, filter: filter })) : (React.createElement("polygon", { className: className, ref: dndDropRef, points: points, filter: filter }));
};
export default Trapezoid;
//# sourceMappingURL=Trapezoid.js.map