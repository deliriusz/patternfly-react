"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const React = tslib_1.__importStar(require("react"));
const shapeUtils_1 = require("./shapeUtils");
const index_1 = require("./index");
const Octagon = props => {
    var _a;
    return (React.createElement(index_1.SidedShape, Object.assign({ cornerRadius: (_a = props.cornerRadius) !== null && _a !== void 0 ? _a : shapeUtils_1.OCTAGON_CORNER_RADIUS }, props, { sides: 8 })));
};
exports.default = Octagon;
//# sourceMappingURL=Octagon.js.map