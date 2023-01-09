"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.QueueClient = void 0;
const tslib_1 = require("tslib");
const inject_1 = require("@appolo/inject");
const appolo_queue_1 = require("appolo-queue");
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
    (0, inject_1.inject)()
], QueueClient.prototype, "logger", void 0);
tslib_1.__decorate([
    (0, inject_1.inject)()
], QueueClient.prototype, "moduleOptions", void 0);
QueueClient = tslib_1.__decorate([
    (0, inject_1.define)(),
    (0, inject_1.singleton)(),
    (0, inject_1.factory)()
], QueueClient);
exports.QueueClient = QueueClient;
//# sourceMappingURL=queueClient.js.map