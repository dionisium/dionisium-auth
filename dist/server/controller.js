"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// MODELS
const USERS_1 = __importStar(require("../models/USERS"));
// LIBS
const jsonwebtoken_config_1 = __importDefault(require("../libs/jsonwebtoken_config"));
const JWTLibs = new jsonwebtoken_config_1.default();
class ctrl {
    signup(req, reply) {
        return __awaiter(this, void 0, void 0, function* () {
            const { name, email, password } = req.body;
            if (!email.includes('@') || !email.includes('.com') || email.length < 12 || /\S/.test(email)) {
                return reply.code(400).send({ _error: 'the email is invalid' });
            }
            if (password.length < 8 || !/\d/.test(password) || /\S/.test(password)) {
                return reply.code(400).send({ _error: 'the password is invalid' });
            }
            const userFound = yield USERS_1.default.findOne({ email });
            if (userFound) {
                return reply.code(400).send({ _error: 'the email already is use' });
            }
            const user = new USERS_1.default({
                name,
                email,
                password: yield (0, USERS_1.encryptPassword)(password),
                plain: ['started pack']
            });
            yield user.save();
            const token = yield JWTLibs.sing(user._id);
            return reply.code(200).send({ _token: token, _plain: user.plain, _avatar: user.avatar });
        });
    }
    signin(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { email, password } = req.body;
            const userFound = yield USERS_1.default.findOne({ email });
            if (!userFound) {
                return res.code(401).send({ _error: 'the email or password are incorrect' });
            }
            const result = yield (0, USERS_1.comparePassword)(userFound.password, password);
            if (result == false) {
                return res.code(401).send({ _error: 'the email or password are incorrect' });
            }
            const token = yield JWTLibs.sing(userFound._id);
            return res.code(200).send({ _token: token, _plain: userFound.plain, _avatar: userFound.avatar });
        });
    }
    withGoogle(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { name, email, id } = req.body;
            const userFound = yield USERS_1.default.findOne({ email });
            if (userFound) {
                const token = yield JWTLibs.sing(userFound._id);
                return res.code(200).send({ _token: token, _plain: userFound.plain, _avatar: userFound.avatar });
            }
            const user = new USERS_1.default({
                name,
                email,
                password: yield (0, USERS_1.encryptPassword)(id),
                roles: 'user',
                plain: 'started pack'
            });
            yield user.save();
            const token = yield JWTLibs.sing(user._id);
            return res.code(200).send({ token: token, plain: user.plain, avatar: user.avatar });
        });
    }
    verify(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { token } = req.body;
            const decoded = yield JWTLibs.decoded(token);
            if (!decoded) {
                return res.code(401).send({ _error: 'you is not authorized or the token is expired' });
            }
            const userFound = yield USERS_1.default.findById(decoded === null || decoded === void 0 ? void 0 : decoded["_id"]);
            if (!userFound) {
                return res.code(401).send({ _error: 'you is not authorized or the token is expired' });
            }
            return res.code(200).send({ _token: token, _plain: userFound.plain, _avatar: userFound.avatar });
        });
    }
    changeAvatar(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { token, avatar } = req.body;
                const decoded = yield JWTLibs.decoded(token);
                if (!decoded) {
                    return res.code(401).send({ error: 'you is not authorized or the token is expired' });
                }
                yield USERS_1.default.findByIdAndUpdate(decoded === null || decoded === void 0 ? void 0 : decoded["_id"], { avatar: avatar });
                res.code(200).send({ message: 'update' });
            }
            catch (_a) {
                return res.code(501).send({ error: 'error unexpected' });
            }
        });
    }
}
exports.default = new ctrl();
//# sourceMappingURL=controller.js.map