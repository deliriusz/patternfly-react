import * as React from 'react';
export declare type PanZoomRef = (node: SVGGElement | null) => void;
export declare const usePanZoom: () => PanZoomRef;
export interface WithPanZoomProps {
    panZoomRef: PanZoomRef;
}
export declare const withPanZoom: () => <P extends WithPanZoomProps>(WrappedComponent: React.ComponentType<P>) => React.FunctionComponent<Omit<P, "panZoomRef">>;
//# sourceMappingURL=usePanZoom.d.ts.map