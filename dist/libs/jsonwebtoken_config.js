"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
class libs {
    sing(_id) {
        try {
            const token = jsonwebtoken_1.default.sign({ _id: _id }, process.env.JWT_KEY, {
                expiresIn: (7 * 24 * 60 * 60)
            });
            return token;
        }
        catch (error) {
            console.error(error);
            return 'error unexpected';
        }
    }
    decoded(token) {
        try {
            const decoded = jsonwebtoken_1.default.verify(token, process.env.JWT_KEY);
            return decoded;
        }
        catch (error) {
            return false;
        }
    }
}
exports.default = libs;
//# sourceMappingURL=jsonwebtoken_config.js.map