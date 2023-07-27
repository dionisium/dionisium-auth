"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const verify_req_body_libs_1 = require("../libs/verify_req_body_libs");
function validator(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        // if(req.headers.token != process.env.JWT_KEY){
        //     return res.status(401).json({message:'you is not authorized'});
        // }
        const req_body_result = yield (0, verify_req_body_libs_1.req_verify)(req.body || {});
        if (req_body_result == false) {
            return res.status(401).send({ error: 'some fields are inconplete' });
        }
    });
}
exports.default = validator;
//# sourceMappingURL=validator.js.map