import * as React from 'react';
import { HEXAGON_CORNER_RADIUS } from './shapeUtils';
import { SidedShape } from './index';
const Hexagon = props => {
    var _a;
    return (React.createElement(SidedShape, Object.assign({ cornerRadius: (_a = props.cornerRadius) !== null && _a !== void 0 ? _a : HEXAGON_CORNER_RADIUS }, props, { sides: 6 })));
};
export default Hexagon;
//# sourceMappingURL=Hexagon.js.map