import * as React from 'react';
import { EventListener } from '../types';
export declare const SELECTION_EVENT = "selection";
export declare const SELECTION_STATE = "selectedIds";
export declare type SelectionEventListener = EventListener<[string[]]>;
export declare type OnSelect = (e: React.MouseEvent) => void;
interface Options {
    multiSelect?: boolean;
    controlled?: boolean;
    raiseOnSelect?: boolean;
}
export declare const useSelection: ({ multiSelect, controlled, raiseOnSelect }?: Options) => [boolean, OnSelect];
export interface WithSelectionProps {
    selected: boolean;
    onSelect: OnSelect;
}
export declare const withSelection: (options?: Options) => <P extends WithSelectionProps>(WrappedComponent: React.ComponentType<Partial<P>>) => React.FunctionComponent<Omit<P, keyof WithSelectionProps>>;
export {};
//# sourceMappingURL=useSelection.d.ts.map