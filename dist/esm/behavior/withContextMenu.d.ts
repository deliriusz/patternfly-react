import * as React from 'react';
import { GraphElement as TopologyElement } from '../types';
export interface WithContextMenuProps {
    onContextMenu: (e: React.MouseEvent) => void;
    contextMenuOpen: boolean;
}
export declare const withContextMenu: <E extends TopologyElement<import("../types").ElementModel, any>>(actions: (element: E) => React.ReactElement[], container?: Element | null | undefined | (() => Element), className?: string, atPoint?: boolean) => <P extends WithContextMenuProps>(WrappedComponent: React.ComponentType<Partial<P>>) => React.FunctionComponent<Omit<P, keyof WithContextMenuProps>>;
//# sourceMappingURL=withContextMenu.d.ts.map