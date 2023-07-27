"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// CONTROLLERS
const controller_1 = __importDefault(require("./controller"));
// LIBS
const validator_1 = __importDefault(require("./libs/validator"));
class default_1 extends controller_1.default {
    constructor(routes, path) {
        super();
        this.routes = routes;
        this.path = path;
    }
    router() {
        this.routes.post(this.path + '/signin', { preValidation: validator_1.default }, this.signin);
        this.routes.post(this.path + '/signup', { preValidation: validator_1.default }, this.signup);
        this.routes.post(this.path + '/verify', { preValidation: validator_1.default }, this.verify);
        this.routes.post(this.path + '/withGoogle', { preValidation: validator_1.default }, this.withGoogle);
        this.routes.post(this.path + '/update/avatar', { preValidation: validator_1.default }, this.changeAvatar);
    }
}
exports.default = default_1;
//# sourceMappingURL=routes.js.map