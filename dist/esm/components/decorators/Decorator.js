import * as React from 'react';
import { css } from '@patternfly/react-styles';
import styles from '@patternfly/react-styles/css/components/Topology/topology-components';
import SvgDropShadowFilter from '../svg/SvgDropShadowFilter';
import { createSvgIdUrl, useHover } from '../../utils';
import { DEFAULT_DECORATOR_PADDING } from '../nodes';
const HOVER_FILTER_ID = 'DecoratorDropShadowHoverFilterId';
const Decorator = ({ className, x, y, showBackground, radius, padding = DEFAULT_DECORATOR_PADDING, children, icon, onClick, ariaLabel, circleRef }) => {
    const [hover, hoverRef] = useHover();
    const iconRadius = radius - padding;
    return (React.createElement("g", Object.assign({ ref: hoverRef, className: css(styles.topologyNodeDecorator, className) }, (onClick
        ? {
            onClick: e => {
                e.stopPropagation();
                onClick(e);
            },
            role: 'button',
            'aria-label': ariaLabel
        }
        : null)),
        React.createElement(SvgDropShadowFilter, { id: HOVER_FILTER_ID, dy: 3, stdDeviation: 5, floodOpacity: 0.5 }),
        showBackground && (React.createElement("circle", { key: hover ? 'circle-hover' : 'circle', ref: circleRef, className: css(styles.topologyNodeDecoratorBg), cx: x, cy: y, r: radius, filter: hover ? createSvgIdUrl(HOVER_FILTER_ID) : undefined })),
        React.createElement("g", { transform: `translate(${x}, ${y})` },
            icon ? (React.createElement("g", { className: css(styles.topologyNodeDecoratorIcon), style: { fontSize: `${iconRadius * 2}px` }, transform: `translate(-${iconRadius}, -${iconRadius})` }, icon)) : null,
            children)));
};
export default Decorator;
//# sourceMappingURL=Decorator.js.map