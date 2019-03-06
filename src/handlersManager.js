"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const appolo_1 = require("appolo");
const _ = require("lodash");
const decorators_1 = require("./decorators");
let HandlersManager = class HandlersManager {
    constructor() {
        this._handlers = new Map();
    }
    async initialize() {
        _.forEach(this.app.parent.exported, (item => this._createHandler(item.fn, item.define)));
    }
    _createHandler(fn, define) {
        let handlers = appolo_1.Util.getReflectData(decorators_1.MessageHandlerSymbol, fn);
        if (!handlers) {
            return;
        }
        _.forEach(handlers, handler => {
            this.queueClient.handle(handler.eventName, async (job) => {
                return this.app.parent.injector.get(define.definition.id)[handler.propertyKey](job);
            });
        });
    }
};
tslib_1.__decorate([
    appolo_1.inject()
], HandlersManager.prototype, "moduleOptions", void 0);
tslib_1.__decorate([
    appolo_1.inject()
], HandlersManager.prototype, "injector", void 0);
tslib_1.__decorate([
    appolo_1.inject()
], HandlersManager.prototype, "app", void 0);
tslib_1.__decorate([
    appolo_1.inject()
], HandlersManager.prototype, "logger", void 0);
tslib_1.__decorate([
    appolo_1.inject()
], HandlersManager.prototype, "queueClient", void 0);
tslib_1.__decorate([
    appolo_1.initMethod()
], HandlersManager.prototype, "initialize", null);
HandlersManager = tslib_1.__decorate([
    appolo_1.define(),
    appolo_1.singleton()
], HandlersManager);
exports.HandlersManager = HandlersManager;
//# sourceMappingURL=handlersManager.js.map