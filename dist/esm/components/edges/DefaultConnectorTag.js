import { __rest } from "tslib";
import * as React from 'react';
import { css } from '@patternfly/react-styles';
import styles from '@patternfly/react-styles/css/components/Topology/topology-components';
import { StatusModifier, useSize } from '../../utils';
const DefaultConnectorTag = (_a) => {
    var { className, startPoint, endPoint, tag, status, paddingX = 4, paddingY = 2 } = _a, other = __rest(_a, ["className", "startPoint", "endPoint", "tag", "status", "paddingX", "paddingY"]);
    const [textSize, textRef] = useSize([tag, className]);
    const { width, height, startX, startY } = React.useMemo(() => {
        if (!textSize) {
            return {
                width: 0,
                height: 0,
                startX: 0,
                startY: 0
            };
        }
        const width = textSize ? textSize.width + paddingX * 2 : 0;
        const height = textSize ? textSize.height + paddingY * 2 : 0;
        const startX = -width / 2;
        const startY = -height / 2;
        return {
            width,
            height,
            startX,
            startY
        };
    }, [textSize, paddingX, paddingY]);
    return (React.createElement("g", { className: css(styles.topologyEdgeTag, className, StatusModifier[status]), transform: `translate(${startPoint.x + (endPoint.x - startPoint.x) * 0.5}, ${startPoint.y +
            (endPoint.y - startPoint.y) * 0.5})` },
        textSize && (React.createElement("rect", { className: css(styles.topologyEdgeTagBackground), x: startX, y: startY, width: width, height: height, rx: 3, ry: 3 })),
        React.createElement("text", Object.assign({ dy: "0.35em" }, other, { ref: textRef, x: startX + paddingX, y: 0 }), tag)));
};
export default DefaultConnectorTag;
//# sourceMappingURL=DefaultConnectorTag.js.map