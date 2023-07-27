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
const USERS_1 = __importStar(require("./models/USERS"));
// LIBS
const jsonwebtoken_config_1 = __importDefault(require("./libs/jsonwebtoken_config"));
const JWTLibs = new jsonwebtoken_config_1.default();
class default_1 {
    signup(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { name, email, password } = req.body;
            const userFound = yield USERS_1.default.findOne({ email });
            if (userFound) {
                return res.code(401).send({ error: 'the email already is use' });
            }
            if (password.length < 8) {
                return res.code(401).send({ error: 'the password is too short' });
            }
            const user = new USERS_1.default({
                name,
                email,
                password: yield (0, USERS_1.encryptPassword)(password),
                roles: 'user',
                plain: 'started pack'
            });
            yield user.save();
            const token = yield JWTLibs.sing(user._id);
            return res.code(200).send({ token: token, plain: user.plain, avatar: user.avatar });
        });
    }
    signin(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { email, password } = req.body;
            const userFound = yield USERS_1.default.findOne({ email });
            if (!userFound) {
                return res.code(401).send({ error: 'the email or password are incorrect' });
            }
            const result = yield (0, USERS_1.comparePassword)(userFound.password, password);
            if (result == false) {
                return res.code(401).send({ error: 'the email or password are incorrect' });
            }
            const token = yield JWTLibs.sing(userFound._id);
            return res.code(200).send({ token: token, plain: userFound.plain, avatar: userFound.avatar });
        });
    }
    withGoogle(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { name, email, id } = req.body;
                const userFound = yield USERS_1.default.findOne({ email });
                if (userFound) {
                    const token = yield JWTLibs.sing(userFound._id);
                    return res.code(200).send({ token: token, plain: userFound.plain, avatar: userFound.avatar });
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
            }
            catch (error) {
                console.log(error);
                return res.code(400).send({ error: 'error unexpected' });
            }
        });
    }
    verify(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { token } = req.body;
                const decoded = yield JWTLibs.decoded(token);
                if (decoded == 'error unexpected') {
                    return res.code(401).send({ error: 'you is not authorized or the token is expired' });
                }
                const userFound = yield USERS_1.default.findById(decoded === null || decoded === void 0 ? void 0 : decoded["_id"]);
                return res.code(200).send({ token: token, plain: userFound.plain, avatar: userFound.avatar });
            }
            catch (error) {
                console.log(error);
                return res.code(400).send({ error: 'error unexpected' });
            }
        });
    }
    changeAvatar(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { token, avatar } = req.body;
                const decoded = yield JWTLibs.decoded(token);
                if (decoded == 'error unexpected') {
                    return res.code(401).send({ error: 'you is not authorized or the token is expired' });
                }
                yield USERS_1.default.findByIdAndUpdate(decoded === null || decoded === void 0 ? void 0 : decoded["_id"], { avatar: avatar });
                res.code(200).send({ message: 'update' });
            }
            catch (error) {
                console.log(error);
                return res.code(400).send({ error: 'error unexpected' });
            }
        });
    }
}
exports.default = default_1;
//# sourceMappingURL=controller.js.map