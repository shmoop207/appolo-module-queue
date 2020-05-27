"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.handler = exports.MessageHandlerSymbol = void 0;
require("reflect-metadata");
const appolo_1 = require("appolo");
exports.MessageHandlerSymbol = Symbol("MessageHandler");
function handler(eventName) {
    return function (target, propertyKey, descriptor) {
        let data = appolo_1.Util.getReflectData(exports.MessageHandlerSymbol, target.constructor, {});
        if (!data[propertyKey]) {
            data[propertyKey] = {
                eventName: eventName,
                propertyKey,
                descriptor
            };
        }
    };
}
exports.handler = handler;
//# sourceMappingURL=decorators.js.map