"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.port = exports.runningMessage = exports.debugLog = exports.CommonRoutesConfig = exports.routes = exports.app = void 0;
const express_1 = __importDefault(require("express"));
const winston = __importStar(require("winston"));
const expressWinston = __importStar(require("express-winston"));
const cors_1 = __importDefault(require("cors"));
const common_routes_config_1 = require("../common/common.routes.config");
Object.defineProperty(exports, "CommonRoutesConfig", { enumerable: true, get: function () { return common_routes_config_1.CommonRoutesConfig; } });
const users_routes_config_1 = require("../users/users.routes.config");
const debug_1 = __importDefault(require("debug"));
const app = (0, express_1.default)();
exports.app = app;
const port = 3000;
exports.port = port;
const routes = [];
exports.routes = routes;
const debugLog = (0, debug_1.default)('app');
exports.debugLog = debugLog;
// here we are adding middleware to parse all incoming requests as JSON 
app.use(express_1.default.json());
// here we are adding middleware to allow cross-origin requests
app.use((0, cors_1.default)());
// here we are preparing the expressWinston logging middleware configuration,
// which will automatically log all HTTP requests handled by Express.js
const loggerOptions = {
    transports: [new winston.transports.Console()],
    format: winston.format.combine(winston.format.json(), winston.format.prettyPrint(), winston.format.colorize({ all: true }))
};
if (!process.env.DEBUG) {
    loggerOptions.meta = false; // when not debugging, log requests as one-liners
}
// initialize the logger with the above configuration
app.use(expressWinston.logger(loggerOptions));
// here we are adding the UserRoutes to our array,
// after sending the Express.js application object to have routes added to our app!
routes.push(new users_routes_config_1.UserRoutes(app));
// a simple route to make sure everything is working properly
const runningMessage = `Server running on http://localhost:${port}`;
exports.runningMessage = runningMessage;
app.get('/', (req, res) => {
    res.status(200).send(runningMessage);
});
//# sourceMappingURL=app.js.map