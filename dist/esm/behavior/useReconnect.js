import * as React from 'react';
import { observer } from 'mobx-react';
import { useDndDrag } from './useDndDrag';
export const withSourceDrag = (spec) => (WrappedComponent) => {
    const Component = props => {
        // TODO fix cast to any
        const [dndDragProps, dndDragRef] = useDndDrag(spec, props);
        return React.createElement(WrappedComponent, Object.assign({}, props, { sourceDragRef: dndDragRef }, dndDragProps));
    };
    Component.displayName = `withSourceDrag(${WrappedComponent.displayName || WrappedComponent.name})`;
    return observer(Component);
};
export const withTargetDrag = (spec) => (WrappedComponent) => {
    const Component = props => {
        // TODO fix cast to any
        const [dndDragProps, dndDragRef] = useDndDrag(spec, props);
        return React.createElement(WrappedComponent, Object.assign({}, props, { targetDragRef: dndDragRef }, dndDragProps));
    };
    Component.displayName = `withTargetDrag(${WrappedComponent.displayName || WrappedComponent.name})`;
    return observer(Component);
};
//# sourceMappingURL=useReconnect.js.map