import * as React from 'react';
import { action, computed } from 'mobx';
import { observer } from 'mobx-react';
import ElementContext from '../utils/ElementContext';
export const SELECTION_EVENT = 'selection';
export const SELECTION_STATE = 'selectedIds';
export const useSelection = ({ multiSelect, controlled, raiseOnSelect = true } = {}) => {
    const element = React.useContext(ElementContext);
    const elementRef = React.useRef(element);
    elementRef.current = element;
    const selected = React.useMemo(() => computed(() => {
        const { selectedIds } = element.getController().getState();
        return !!selectedIds && selectedIds.includes(element.getId());
    }), [element]);
    const onSelect = React.useCallback(action((e) => {
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
        elementRef.current.getController().fireEvent(SELECTION_EVENT, selectedIds);
        if (raiseOnSelect && raise) {
            elementRef.current.raise();
        }
    }), [multiSelect, controlled, raiseOnSelect]);
    return [selected.get(), onSelect];
};
export const withSelection = (options) => (WrappedComponent) => {
    const Component = props => {
        const [selected, onSelect] = useSelection(options);
        return React.createElement(WrappedComponent, Object.assign({}, props, { selected: selected, onSelect: onSelect }));
    };
    Component.displayName = `withSelection(${WrappedComponent.displayName || WrappedComponent.name})`;
    return observer(Component);
};
//# sourceMappingURL=useSelection.js.map