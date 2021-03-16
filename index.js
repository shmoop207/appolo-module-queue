"use strict";
var QueueModule_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.QueueModule = exports.Events = exports.handler = exports.Queue = exports.Job = void 0;
const tslib_1 = require("tslib");
const engine_1 = require("@appolo/engine");
const queueClient_1 = require("./src/queueClient");
const decorators_1 = require("./src/decorators");
Object.defineProperty(exports, "handler", { enumerable: true, get: function () { return decorators_1.handler; } });
const appolo_queue_1 = require("appolo-queue");
Object.defineProperty(exports, "Events", { enumerable: true, get: function () { return appolo_queue_1.Events; } });
Object.defineProperty(exports, "Job", { enumerable: true, get: function () { return appolo_queue_1.Job; } });
Object.defineProperty(exports, "Queue", { enumerable: true, get: function () { return appolo_queue_1.Queue; } });
let QueueModule = QueueModule_1 = class QueueModule extends engine_1.Module {
    constructor() {
        super(...arguments);
        this.Defaults = {
            id: "queue"
        };
    }
    static for(options) {
        return { type: QueueModule_1, options };
    }
    get exports() {
        return [{ id: this.moduleOptions.id, type: queueClient_1.QueueClient }];
    }
};
QueueModule = QueueModule_1 = tslib_1.__decorate([
    engine_1.module()
], QueueModule);
exports.QueueModule = QueueModule;
//# sourceMappingURL=index.js.map