"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TopologyControlBar = exports.createTopologyControlButtons = exports.defaultControlButtonsOptions = exports.LEGEND = exports.RESET_VIEW = exports.FIT_TO_SCREEN = exports.ZOOM_OUT = exports.ZOOM_IN = void 0;
const tslib_1 = require("tslib");
const React = tslib_1.__importStar(require("react"));
const react_core_1 = require("@patternfly/react-core");
const expand_icon_1 = tslib_1.__importDefault(require('@patternfly/react-icons/dist/js/icons/expand-icon'));
const expand_arrows_alt_icon_1 = tslib_1.__importDefault(require('@patternfly/react-icons/dist/js/icons/expand-arrows-alt-icon'));
const search_plus_icon_1 = tslib_1.__importDefault(require('@patternfly/react-icons/dist/js/icons/search-plus-icon'));
const search_minus_icon_1 = tslib_1.__importDefault(require('@patternfly/react-icons/dist/js/icons/search-minus-icon'));
require("@patternfly/react-styles/css/components/Topology/topology-controlbar.css");
/* ID's for common control buttons */
exports.ZOOM_IN = 'zoom-in';
exports.ZOOM_OUT = 'zoom-out';
exports.FIT_TO_SCREEN = 'fit-to-screen';
exports.RESET_VIEW = 'reset-view';
exports.LEGEND = 'legend';
/* Default options for creating control buttons */
exports.defaultControlButtonsOptions = {
    zoomIn: true,
    zoomInIcon: React.createElement(search_plus_icon_1.default, null),
    zoomInTip: 'Zoom In',
    zoomInAriaLabel: 'Zoom In',
    zoomInCallback: null,
    zoomInDisabled: false,
    zoomInHidden: false,
    zoomOut: true,
    zoomOutIcon: React.createElement(search_minus_icon_1.default, null),
    zoomOutTip: 'Zoom Out',
    zoomOutAriaLabel: 'Zoom Out',
    zoomOutCallback: null,
    zoomOutDisabled: false,
    zoomOutHidden: false,
    fitToScreen: true,
    fitToScreenIcon: React.createElement(expand_arrows_alt_icon_1.default, null),
    fitToScreenTip: 'Fit to Screen',
    fitToScreenAriaLabel: 'Fit to Screen',
    fitToScreenCallback: null,
    fitToScreenDisabled: false,
    fitToScreenHidden: false,
    resetView: true,
    resetViewIcon: React.createElement(expand_icon_1.default, null),
    resetViewTip: 'Reset View',
    resetViewAriaLabel: 'Reset View',
    resetViewCallback: null,
    resetViewDisabled: false,
    resetViewHidden: false,
    legend: true,
    legendIcon: 'Legend',
    legendTip: '',
    legendAriaLabel: null,
    legendCallback: null,
    legendDisabled: false,
    legendHidden: false,
    customButtons: []
};
/* Utility function to create the common control buttons, can pass null for all defaults, or specify overrides */
const createTopologyControlButtons = ({ zoomIn = exports.defaultControlButtonsOptions.zoomIn, zoomInIcon = exports.defaultControlButtonsOptions.zoomInIcon, zoomInTip = exports.defaultControlButtonsOptions.zoomInTip, zoomInAriaLabel = exports.defaultControlButtonsOptions.zoomInAriaLabel, zoomInCallback = exports.defaultControlButtonsOptions.zoomInCallback, zoomInDisabled = exports.defaultControlButtonsOptions.zoomInDisabled, zoomInHidden = exports.defaultControlButtonsOptions.zoomInHidden, zoomOut = exports.defaultControlButtonsOptions.zoomOut, zoomOutIcon = exports.defaultControlButtonsOptions.zoomOutIcon, zoomOutTip = exports.defaultControlButtonsOptions.zoomOutTip, zoomOutAriaLabel = exports.defaultControlButtonsOptions.zoomOutAriaLabel, zoomOutCallback = exports.defaultControlButtonsOptions.zoomOutCallback, zoomOutDisabled = exports.defaultControlButtonsOptions.zoomOutDisabled, zoomOutHidden = exports.defaultControlButtonsOptions.zoomOutHidden, fitToScreen = exports.defaultControlButtonsOptions.fitToScreen, fitToScreenIcon = exports.defaultControlButtonsOptions.fitToScreenIcon, fitToScreenTip = exports.defaultControlButtonsOptions.fitToScreenTip, fitToScreenAriaLabel = exports.defaultControlButtonsOptions.fitToScreenAriaLabel, fitToScreenCallback = exports.defaultControlButtonsOptions.fitToScreenCallback, fitToScreenDisabled = exports.defaultControlButtonsOptions.fitToScreenDisabled, fitToScreenHidden = exports.defaultControlButtonsOptions.fitToScreenHidden, resetView = exports.defaultControlButtonsOptions.resetView, resetViewIcon = exports.defaultControlButtonsOptions.resetViewIcon, resetViewTip = exports.defaultControlButtonsOptions.resetViewTip, resetViewAriaLabel = exports.defaultControlButtonsOptions.resetViewAriaLabel, resetViewCallback = exports.defaultControlButtonsOptions.resetViewCallback, resetViewDisabled = exports.defaultControlButtonsOptions.resetViewDisabled, resetViewHidden = exports.defaultControlButtonsOptions.resetViewHidden, legend = exports.defaultControlButtonsOptions.legend, legendIcon = exports.defaultControlButtonsOptions.legendIcon, legendTip = exports.defaultControlButtonsOptions.legendTip, legendAriaLabel = exports.defaultControlButtonsOptions.legendAriaLabel, legendCallback = exports.defaultControlButtonsOptions.legendCallback, legendDisabled = exports.defaultControlButtonsOptions.legendDisabled, legendHidden = exports.defaultControlButtonsOptions.legendHidden, customButtons = exports.defaultControlButtonsOptions.customButtons } = exports.defaultControlButtonsOptions) => {
    const controlButtons = [];
    if (zoomIn) {
        controlButtons.push({
            id: exports.ZOOM_IN,
            icon: zoomInIcon,
            tooltip: zoomInTip,
            ariaLabel: zoomInAriaLabel,
            callback: zoomInCallback,
            disabled: zoomInDisabled,
            hidden: zoomInHidden
        });
    }
    if (zoomOut) {
        controlButtons.push({
            id: exports.ZOOM_OUT,
            icon: zoomOutIcon,
            tooltip: zoomOutTip,
            ariaLabel: zoomOutAriaLabel,
            callback: zoomOutCallback,
            disabled: zoomOutDisabled,
            hidden: zoomOutHidden
        });
    }
    if (fitToScreen) {
        controlButtons.push({
            id: exports.FIT_TO_SCREEN,
            icon: fitToScreenIcon,
            tooltip: fitToScreenTip,
            ariaLabel: fitToScreenAriaLabel,
            callback: fitToScreenCallback,
            disabled: fitToScreenDisabled,
            hidden: fitToScreenHidden
        });
    }
    if (resetView) {
        controlButtons.push({
            id: exports.RESET_VIEW,
            icon: resetViewIcon,
            tooltip: resetViewTip,
            ariaLabel: resetViewAriaLabel,
            callback: resetViewCallback,
            disabled: resetViewDisabled,
            hidden: resetViewHidden
        });
    }
    if (customButtons) {
        controlButtons.push(...customButtons);
    }
    if (legend) {
        controlButtons.push({
            id: exports.LEGEND,
            icon: legendIcon,
            tooltip: legendTip,
            ariaLabel: legendAriaLabel,
            callback: legendCallback,
            disabled: legendDisabled,
            hidden: legendHidden
        });
    }
    return controlButtons;
};
exports.createTopologyControlButtons = createTopologyControlButtons;
const TopologyControlBar = ({ className = null, children = null, controlButtons = [], onButtonClick = () => undefined }) => {
    const handleButtonClick = (event, button) => {
        event.preventDefault();
        onButtonClick(button.id);
        if (button.callback) {
            button.callback(button.id);
        }
    };
    const renderButton = (button) => {
        const renderedButton = (React.createElement(react_core_1.Button, { id: button.id, className: `pf-topology-control-bar__button${button.disabled ? ' pf-m-disabled' : ''}`, onClick: (event) => handleButtonClick(event, button), disabled: button.disabled, "aria-disabled": button.disabled, variant: "tertiary" },
            button.icon,
            (button.ariaLabel || button.tooltip) && (React.createElement("span", { className: "pf-u-screen-reader" }, button.ariaLabel || button.tooltip))));
        if (button.tooltip) {
            return React.createElement(react_core_1.Tooltip, { content: button.tooltip }, renderedButton);
        }
        return renderedButton;
    };
    return (React.createElement(react_core_1.GenerateId, { prefix: "pf-topology-control-bar-" }, randomId => (React.createElement(react_core_1.Toolbar, { className: className, style: { backgroundColor: 'transparent', padding: 0 }, id: randomId },
        React.createElement(react_core_1.ToolbarContent, null,
            React.createElement(react_core_1.ToolbarGroup, { spaceItems: { default: 'spaceItemsNone' } },
                controlButtons.map((button) => button.hidden ? null : React.createElement(react_core_1.ToolbarItem, { key: button.id }, renderButton(button))),
                children))))));
};
exports.TopologyControlBar = TopologyControlBar;
exports.TopologyControlBar.displayName = 'TopologyControlBar';
//# sourceMappingURL=TopologyControlBar.js.map