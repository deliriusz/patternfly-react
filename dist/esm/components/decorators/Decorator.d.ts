import * as React from 'react';
interface DecoratorTypes {
    children?: React.ReactNode;
    className?: string;
    x: number;
    y: number;
    radius: number;
    padding?: number;
    showBackground?: boolean;
    icon?: React.ReactNode;
    onClick?(event: React.MouseEvent<SVGGElement, MouseEvent>): void;
    ariaLabel?: string;
    circleRef?: React.Ref<SVGCircleElement>;
}
declare const Decorator: React.FunctionComponent<DecoratorTypes>;
export default Decorator;
//# sourceMappingURL=Decorator.d.ts.map