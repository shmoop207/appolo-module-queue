"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.QueueClient = void 0;
const tslib_1 = require("tslib");
const appolo_1 = require("appolo");
const appolo_queue_1 = require("appolo-queue");
let QueueClient = /** @class */ (() => {
    let QueueClient = class QueueClient {
        async get() {
            try {
                let client = new appolo_queue_1.Queue(this.moduleOptions.config);
                await client.initialize();
                return client;
            }
            catch (e) {
                this.logger.error(`failed to initialize queue ${this.moduleOptions.id}`, { err: e.toString() });
                throw e;
            }
        }
    };
    tslib_1.__decorate([
        appolo_1.inject()
    ], QueueClient.prototype, "logger", void 0);
    tslib_1.__decorate([
        appolo_1.inject()
    ], QueueClient.prototype, "moduleOptions", void 0);
    QueueClient = tslib_1.__decorate([
        appolo_1.define(),
        appolo_1.singleton(),
        appolo_1.factory()
    ], QueueClient);
    return QueueClient;
})();
exports.QueueClient = QueueClient;
//# sourceMappingURL=queueClient.js.map