"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserRoutes = void 0;
const common_routes_config_1 = require("../common/common.routes.config");
const users_controller_1 = __importDefault(require("./controllers/users.controller"));
const users_middleware_1 = __importDefault(require("./middleware/users.middleware"));
class UserRoutes extends common_routes_config_1.CommonRoutesConfig {
    constructor(app) {
        super(app, 'UserRoutes');
    }
    configureRoutes() {
        this.app.route('/users')
            .get(users_controller_1.default.listUsers)
            .post(users_middleware_1.default.validateRequiredUserBodyFields, users_middleware_1.default.validateEmailDoesNotExist, users_controller_1.default.createUser);
        this.app.param('userId', users_middleware_1.default.extractId);
        this.app.route('/user/:userId')
            .all(users_middleware_1.default.validateUserExists)
            .get(users_controller_1.default.getUserById)
            .delete(users_controller_1.default.removeUser)
            .patch(users_middleware_1.default.validatePatchEmail, users_controller_1.default.patchUser)
            .put(users_middleware_1.default.validateRequiredUserBodyFields, users_middleware_1.default.validateSameEmailBelongsToSameUser, users_controller_1.default.putUser);
        return this.app;
    }
}
exports.UserRoutes = UserRoutes;
//# sourceMappingURL=users.routes.config.js.map