import * as React from 'react';
import { Node } from '../../types';
import { WhenStatus } from '../types';
import { WithSelectionProps } from '../../behavior';
export declare const DEFAULT_WHEN_SIZE = 12;
export declare const DEFAULT_WHEN_OFFSET = 12;
declare type WhenDecoratorProps = {
    element: Node;
    className?: string;
    leftOffset?: number;
    edgeLength?: number;
    width?: number;
    height?: number;
    nameLabelClass?: string;
    status?: WhenStatus;
    showStatusState?: boolean;
    disableTooltip?: boolean;
    toolTip?: React.ReactNode;
} & Partial<WithSelectionProps>;
export declare const WhenDecorator: React.FC<WhenDecoratorProps>;
declare const _default: React.FC<WhenDecoratorProps>;
export default _default;
//# sourceMappingURL=WhenDecorator.d.ts.map