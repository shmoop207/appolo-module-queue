"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Handler = void 0;
const tslib_1 = require("tslib");
const inject_1 = require("@appolo/inject");
const decorators_1 = require("../../src/decorators");
let Handler = class Handler {
    handle(job) {
        this.working = job.params.param1;
    }
};
tslib_1.__decorate([
    (0, decorators_1.handler)("test")
], Handler.prototype, "handle", null);
Handler = tslib_1.__decorate([
    (0, inject_1.define)(),
    (0, inject_1.singleton)()
], Handler);
exports.Handler = Handler;
//# sourceMappingURL=handler.js.map