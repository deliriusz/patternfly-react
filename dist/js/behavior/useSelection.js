"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.withSelection = exports.useSelection = exports.SELECTION_STATE = exports.SELECTION_EVENT = void 0;
const tslib_1 = require("tslib");
const React = tslib_1.__importStar(require("react"));
const mobx_1 = require("mobx");
const mobx_react_1 = require("mobx-react");
const ElementContext_1 = tslib_1.__importDefault(require("../utils/ElementContext"));
exports.SELECTION_EVENT = 'selection';
exports.SELECTION_STATE = 'selectedIds';
const useSelection = ({ multiSelect, controlled, raiseOnSelect = true } = {}) => {
    const element = React.useContext(ElementContext_1.default);
    const elementRef = React.useRef(element);
    elementRef.current = element;
    const selected = React.useMemo(() => mobx_1.computed(() => {
        const { selectedIds } = element.getController().getState();
        return !!selectedIds && selectedIds.includes(element.getId());
    }), [element]);
    const onSelect = React.useCallback(mobx_1.action((e) => {
        e.stopPropagation();
        const id = elementRef.current.getId();
        const state = elementRef.current.getController().getState();
        const idx = state.selectedIds ? state.selectedIds.indexOf(id) : -1;
        let selectedIds;
        let raise = false;
        if (multiSelect && (e.ctrlKey || e.metaKey)) {
            if (!state.selectedIds) {
                raise = true;
                selectedIds = [id];
            }
            else {
                selectedIds = [...state.selectedIds];
                if (idx === -1) {
                    raise = true;
                    selectedIds.push(id);
                }
                else {
                    selectedIds.splice(idx, 1);
                }
            }
        }
        else if (idx === -1 || multiSelect) {
            raise = true;
            selectedIds = [id];
        }
        else {
            selectedIds = [];
        }
        if (!controlled) {
            state.selectedIds = selectedIds;
        }
        elementRef.current.getController().fireEvent(exports.SELECTION_EVENT, selectedIds);
        if (raiseOnSelect && raise) {
            elementRef.current.raise();
        }
    }), [multiSelect, controlled, raiseOnSelect]);
    return [selected.get(), onSelect];
};
exports.useSelection = useSelection;
const withSelection = (options) => (WrappedComponent) => {
    const Component = props => {
        const [selected, onSelect] = exports.useSelection(options);
        return React.createElement(WrappedComponent, Object.assign({}, props, { selected: selected, onSelect: onSelect }));
    };
    Component.displayName = `withSelection(${WrappedComponent.displayName || WrappedComponent.name})`;
    return mobx_react_1.observer(Component);
};
exports.withSelection = withSelection;
//# sourceMappingURL=useSelection.js.map