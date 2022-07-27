"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const visitor_1 = require("./visitor");
function declare(api, options) {
    const { objectName = 'Java', propertyName = 'type' } = options;
    return {
        name: 'babel-plugin-transform-graal-imports',
        visitor: (0, visitor_1.visitor)(api.types, objectName, propertyName),
    };
}
exports.default = declare;
