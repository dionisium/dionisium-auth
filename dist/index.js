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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// DOTENV
const PROD = process.env.PRODUCTION || false;
if (PROD == false) {
    const { config } = require('dotenv');
    config();
}
// IMPORTS
const fastify_1 = __importDefault(require("fastify"));
const cors_1 = __importDefault(require("@fastify/cors"));
const routes_1 = __importDefault(require("./server/routes"));
function start() {
    return __awaiter(this, void 0, void 0, function* () {
        const app = (0, fastify_1.default)({ logger: true });
        yield app.register(cors_1.default, { origin: true });
        require('./server/database');
        // ROUTES
        app.register(routes_1.default, { prefix: '/api' });
        // SERVER
        const PORT = typeof process.env.PORT == 'number' ? process.env.PORT : Number(process.env.PORT) ? Number(process.env.PORT) : 4560;
        const HOST = process.env.HOST || 'localhost';
        app.listen({ port: PORT, host: HOST }, (_err, _address) => {
            console.info(_address);
            console.log(`Sever run in ${HOST}:${PORT}`);
            console.error(_err);
        });
    });
}
start();
//# sourceMappingURL=index.js.map