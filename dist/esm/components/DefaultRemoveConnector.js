import * as React from 'react';
import { Tooltip, TooltipPosition } from '@patternfly/react-core';
import TrashIcon from '@patternfly/react-icons/dist/esm/icons/trash-icon';
/**
 * @param startPoint
 * @param endPoint
 */
function computeTooltipPosition(startPoint, endPoint) {
    const angle = Math.abs((Math.atan2(endPoint.y - startPoint.y, endPoint.x - startPoint.x) * 180) / Math.PI);
    if (angle < 135 && angle > 90) {
        return TooltipPosition.left;
    }
    if (angle > 45 && angle <= 90) {
        return TooltipPosition.right;
    }
    return TooltipPosition.top;
}
const DefaultRemoveConnector = ({ startPoint, endPoint, onRemove, size = 14 }) => (React.createElement(Tooltip, { content: "Delete Connector", position: computeTooltipPosition(startPoint, endPoint) },
    React.createElement("g", { transform: `translate(${startPoint.x + (endPoint.x - startPoint.x) * 0.5}, ${startPoint.y +
            (endPoint.y - startPoint.y) * 0.5})`, onClick: e => {
            e.stopPropagation();
            onRemove();
        } },
        React.createElement("circle", { className: "topology-connector__remove-bg", cx: 0, cy: 0, r: size }),
        React.createElement("g", { transform: `translate(-${size / 2}, -${size / 2})` },
            React.createElement(TrashIcon, { className: "topology-connector__remove-icon", style: { fontSize: size } })))));
export default DefaultRemoveConnector;
//# sourceMappingURL=DefaultRemoveConnector.js.map