"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.HandlersManager = void 0;
const tslib_1 = require("tslib");
const inject_1 = require("@appolo/inject");
const decorators_1 = require("./decorators");
const utils_1 = require("@appolo/utils");
let HandlersManager = class HandlersManager {
    constructor() {
        this._handlers = new Map();
    }
    async initialize() {
        this.app.tree.parent.discovery.exported.forEach(item => this._createHandler(item.fn, item.define));
    }
    _createHandler(fn, define) {
        let handlers = utils_1.Reflector.getFnMetadata(decorators_1.MessageHandlerSymbol, fn);
        if (!handlers) {
            return;
        }
        utils_1.Arrays.forEach(handlers, handler => {
            this.queueClient.handle(handler.eventName, async (job) => {
                return this.app.tree.parent.injector.get(define.definition.id)[handler.propertyKey](job);
            });
        });
    }
};
tslib_1.__decorate([
    (0, inject_1.inject)()
], HandlersManager.prototype, "moduleOptions", void 0);
tslib_1.__decorate([
    (0, inject_1.inject)()
], HandlersManager.prototype, "injector", void 0);
tslib_1.__decorate([
    (0, inject_1.inject)()
], HandlersManager.prototype, "app", void 0);
tslib_1.__decorate([
    (0, inject_1.inject)()
], HandlersManager.prototype, "logger", void 0);
tslib_1.__decorate([
    (0, inject_1.inject)()
], HandlersManager.prototype, "queueClient", void 0);
tslib_1.__decorate([
    (0, inject_1.init)()
], HandlersManager.prototype, "initialize", null);
HandlersManager = tslib_1.__decorate([
    (0, inject_1.define)(),
    (0, inject_1.singleton)()
], HandlersManager);
exports.HandlersManager = HandlersManager;
//# sourceMappingURL=handlersManager.js.map