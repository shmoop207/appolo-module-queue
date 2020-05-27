"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Handler = void 0;
const tslib_1 = require("tslib");
const appolo_1 = require("appolo");
const decorators_1 = require("../../src/decorators");
let Handler = /** @class */ (() => {
    let Handler = class Handler {
        handle(job) {
            this.working = job.params.param1;
        }
    };
    tslib_1.__decorate([
        decorators_1.handler("test")
    ], Handler.prototype, "handle", null);
    Handler = tslib_1.__decorate([
        appolo_1.define(),
        appolo_1.singleton()
    ], Handler);
    return Handler;
})();
exports.Handler = Handler;
//# sourceMappingURL=handler.js.map