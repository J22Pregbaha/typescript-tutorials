import { CommonRoutesConfig } from "../common/common.routes.config";
import usersController from "./controllers/users.controller";
import usersMiddleware from "./middleware/users.middleware";
import express from "express";

export class UserRoutes extends CommonRoutesConfig {
    constructor(app: express.Application) {
        super(app, 'UserRoutes');
    }

    configureRoutes() : express.Application {
        this.app.route('/users')
        .get(usersController.listUsers)
        .post(usersMiddleware.validateRequiredUserBodyFields,
            usersMiddleware.validateEmailDoesNotExist,
            usersController.createUser);

        this.app.param('userId', usersMiddleware.extractId);
        this.app.route('/user/:userId')
        .all(usersMiddleware.validateUserExists)
        .get(usersController.getUserById)
        .delete(usersController.removeUser)
        .patch(usersMiddleware.validatePatchEmail,
            usersController.patchUser)
        .put(usersMiddleware.validateRequiredUserBodyFields,
            usersMiddleware.validateSameEmailBelongsToSameUser,
            usersController.putUser);

        return this.app;
    }
}