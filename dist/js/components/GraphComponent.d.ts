import * as React from 'react';
import { Graph } from '../types';
import { WithPanZoomProps } from '../behavior/usePanZoom';
import { WithDndDropProps } from '../behavior/useDndDrop';
import { WithSelectionProps } from '../behavior/useSelection';
import { WithContextMenuProps } from '../behavior/withContextMenu';
interface ElementProps {
    element: Graph;
}
declare type GraphComponentProps = ElementProps & WithPanZoomProps & WithDndDropProps & WithSelectionProps & WithContextMenuProps;
declare const _default: React.FunctionComponent<GraphComponentProps>;
export default _default;
//# sourceMappingURL=GraphComponent.d.ts.map