"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const React = tslib_1.__importStar(require("react"));
const react_core_1 = require("@patternfly/react-core");
const trash_icon_1 = tslib_1.__importDefault(require('@patternfly/react-icons/dist/js/icons/trash-icon'));
/**
 * @param startPoint
 * @param endPoint
 */
function computeTooltipPosition(startPoint, endPoint) {
    const angle = Math.abs((Math.atan2(endPoint.y - startPoint.y, endPoint.x - startPoint.x) * 180) / Math.PI);
    if (angle < 135 && angle > 90) {
        return react_core_1.TooltipPosition.left;
    }
    if (angle > 45 && angle <= 90) {
        return react_core_1.TooltipPosition.right;
    }
    return react_core_1.TooltipPosition.top;
}
const DefaultRemoveConnector = ({ startPoint, endPoint, onRemove, size = 14 }) => (React.createElement(react_core_1.Tooltip, { content: "Delete Connector", position: computeTooltipPosition(startPoint, endPoint) },
    React.createElement("g", { transform: `translate(${startPoint.x + (endPoint.x - startPoint.x) * 0.5}, ${startPoint.y +
            (endPoint.y - startPoint.y) * 0.5})`, onClick: e => {
            e.stopPropagation();
            onRemove();
        } },
        React.createElement("circle", { className: "topology-connector__remove-bg", cx: 0, cy: 0, r: size }),
        React.createElement("g", { transform: `translate(-${size / 2}, -${size / 2})` },
            React.createElement(trash_icon_1.default, { className: "topology-connector__remove-icon", style: { fontSize: size } })))));
exports.default = DefaultRemoveConnector;
//# sourceMappingURL=DefaultRemoveConnector.js.map