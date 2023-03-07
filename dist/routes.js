"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const router = (0, express_1.Router)();
const controller_1 = __importDefault(require("./controller"));
const controller = new controller_1.default();
const validator_1 = __importDefault(require("./libs/validator"));
router.post('/signup', validator_1.default, controller.signup);
router.post('/signin', validator_1.default, controller.signin);
router.post('/verify', validator_1.default, controller.verify);
router.post('/withGoogle', validator_1.default, controller.withGoogle);
router.post('/update/avatar', validator_1.default, controller.changeAvatar);
exports.default = router;
//# sourceMappingURL=routes.js.map