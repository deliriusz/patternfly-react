"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const React = tslib_1.__importStar(require("react"));
const angle_double_right_icon_1 = tslib_1.__importDefault(require('@patternfly/react-icons/dist/js/icons/angle-double-right-icon'));
const exclamation_triangle_icon_1 = tslib_1.__importDefault(require('@patternfly/react-icons/dist/js/icons/exclamation-triangle-icon'));
const check_circle_icon_1 = tslib_1.__importDefault(require('@patternfly/react-icons/dist/js/icons/check-circle-icon'));
const circle_icon_1 = tslib_1.__importDefault(require('@patternfly/react-icons/dist/js/icons/circle-icon'));
const exclamation_circle_icon_1 = tslib_1.__importDefault(require('@patternfly/react-icons/dist/js/icons/exclamation-circle-icon'));
const not_started_icon_1 = tslib_1.__importDefault(require('@patternfly/react-icons/dist/js/icons/not-started-icon'));
const hourglass_half_icon_1 = tslib_1.__importDefault(require('@patternfly/react-icons/dist/js/icons/hourglass-half-icon'));
const sync_alt_icon_1 = tslib_1.__importDefault(require('@patternfly/react-icons/dist/js/icons/sync-alt-icon'));
const in_progress_icon_1 = tslib_1.__importDefault(require('@patternfly/react-icons/dist/js/icons/in-progress-icon'));
const types_1 = require("../types");
const StatusIcon = (_a) => {
    var { status } = _a, props = tslib_1.__rest(_a, ["status"]);
    switch (status) {
        case types_1.RunStatus.InProgress:
            return React.createElement(in_progress_icon_1.default, Object.assign({}, props));
        case types_1.RunStatus.Running:
            return React.createElement(sync_alt_icon_1.default, Object.assign({}, props));
        case types_1.RunStatus.Succeeded:
            return React.createElement(check_circle_icon_1.default, Object.assign({}, props));
        case types_1.RunStatus.Failed:
        case types_1.RunStatus.FailedToStart:
            return React.createElement(exclamation_circle_icon_1.default, Object.assign({}, props));
        case types_1.RunStatus.Idle:
            return React.createElement(not_started_icon_1.default, Object.assign({}, props));
        case types_1.RunStatus.Pending:
            return React.createElement(hourglass_half_icon_1.default, Object.assign({}, props));
        case types_1.RunStatus.Cancelled:
            return React.createElement(exclamation_triangle_icon_1.default, Object.assign({}, props));
        case types_1.RunStatus.Skipped:
            return React.createElement(angle_double_right_icon_1.default, Object.assign({}, props));
        default:
            return React.createElement(circle_icon_1.default, Object.assign({}, props));
    }
};
exports.default = StatusIcon;
//# sourceMappingURL=StatusIcon.js.map