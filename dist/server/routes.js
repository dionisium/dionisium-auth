"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const schemas_1 = require("../libs/schemas");
// CONTROLLERS
const controller_1 = __importDefault(require("./controller"));
function default_1(fastify, options, done) {
    fastify.route({
        method: 'POST',
        url: '/signin',
        handler: controller_1.default.signin,
        schema: { body: schemas_1._Body_Signin, response: schemas_1._Response },
    });
    fastify.route({
        method: 'POST',
        url: '/signup',
        handler: controller_1.default.signup,
        schema: { body: schemas_1._Body_Signup, response: schemas_1._Response }
    });
    fastify.route({
        method: 'POST',
        url: '/verify',
        handler: controller_1.default.verify,
        schema: { body: schemas_1._Body_Verify, response: schemas_1._Response }
    });
    fastify.route({
        method: 'POST',
        url: '/withGoogle',
        handler: controller_1.default.withGoogle,
        schema: { body: schemas_1._Body_WithGoogle, response: schemas_1._Response }
    });
    fastify.route({
        method: 'POST',
        url: '/update/avatar',
        handler: controller_1.default.changeAvatar,
        schema: { body: schemas_1._Body_ChangeAvatar, response: schemas_1._Response }
    });
    done();
}
exports.default = default_1;
//# sourceMappingURL=routes.js.map