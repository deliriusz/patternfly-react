import * as React from 'react';
import { OCTAGON_CORNER_RADIUS } from './shapeUtils';
import { SidedShape } from './index';
const Octagon = props => {
    var _a;
    return (React.createElement(SidedShape, Object.assign({ cornerRadius: (_a = props.cornerRadius) !== null && _a !== void 0 ? _a : OCTAGON_CORNER_RADIUS }, props, { sides: 8 })));
};
export default Octagon;
//# sourceMappingURL=Octagon.js.map