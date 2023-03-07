"use strict";
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
const morgan_1 = __importDefault(require("morgan"));
const cors_1 = __importDefault(require("cors"));
const method_override_1 = __importDefault(require("method-override"));
const express_1 = __importDefault(require("express"));
const app = (0, express_1.default)();
require('./database');
// MIDLEWARES
app.use((0, method_override_1.default)('_method'));
app.use(express_1.default.urlencoded({ extended: true }));
app.use(express_1.default.json());
app.use((0, cors_1.default)());
app.use((0, morgan_1.default)('tiny'));
// ROUTES
const routes_1 = __importDefault(require("./routes"));
app.use('/api', routes_1.default);
// SERVER
app.set('port', process.env.PORT || 3400);
app.listen(app.get('port'), () => {
    console.log('server on port:' + app.get('port'));
});
//# sourceMappingURL=index.js.map