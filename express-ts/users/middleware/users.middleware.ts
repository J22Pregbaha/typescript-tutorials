import express from 'express';
import usersService from '../services/users.service';
import debug from 'debug';

const log: debug.IDebugger = debug('app:users-controller');
class Middleware {
    async validateRequiredUserBodyFields(req: express.Request, res: express.Response, next: express.NextFunction) {
        if (req.body && req.body.email && req.body.password) {
            next();
        } else {
            res.status(400).send({
                error: "Missing required fields email and password"
            });
        }
    }

    async validateEmailDoesNotExist(req: express.Request, res: express.Response, next: express.NextFunction) {
        const user = await usersService.getUserByEmail(req.body.email);

        if (user) {
            res.status(400).send({
                error: "Email already exists"
            });
        } else {
            next();
        }
    }

    async validateSameEmailBelongsToSameUser(req: express.Request, res: express.Response, next: express.NextFunction) {
        const user = await usersService.getUserByEmail(req.body.email);

        if (user && user.id === req.params.userId) {
            res.status(400).send({
                error: "Email already exists"
            });
        } else {
            next();
        }
    }

    // Here we need to use an arrow function to bind `this` correctly
    validatePatchEmail = async (req: express.Request, res: express.Response, next: express.NextFunction) => {
        if (req.body.email) {
            log('Validating email', req.body.email);

            this.validateSameEmailBelongsToSameUser(req, res, next);
        } else {
            next();
        }
    }

    async validateUserExists(req: express.Request, res: express.Response, next: express.NextFunction) {
        const user = await usersService.readById(req.params.userId);

        if (user) {
            next();
        } else {
            res.status(400).send({
                error: `User ${req.params.userId} not found`
            });
        }
    }

    async extractId(req: express.Request, res: express.Response, next: express.NextFunction) {
        req.body.id = req.params.userId;
        next();
    }
}

export default new Middleware();