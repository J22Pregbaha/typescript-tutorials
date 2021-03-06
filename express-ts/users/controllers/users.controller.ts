// we import express to add types to the request/response objects from our controller functions
import express from 'express';

// we import our newly created user services
import usersService from '../services/users.service';

// we import the argon2 library for password hashing
import argon2 from 'argon2';

import debug from 'debug';

const log: debug.IDebugger = debug('app:users-controller');

class UsersController {
    async listUsers(req: express.Request, res: express.Response) {
        const users = await usersService.list(100, 0);
        res.status(200).json(users);
    }

    async getUserById(req: express.Request, res: express.Response) {
        const user = await usersService.readById(req.body.id);
        res.status(200).json(user);
    }

    async createUser(req: express.Request, res: express.Response) {
        req.body.password = await argon2.hash(req.body.password);
        const userId = await usersService.create(req.body);
        res.status(201).json({data: userId});
    }

    async patchUser(req: express.Request, res: express.Response) {
        if (req.body.password) {
            req.body.password = await argon2.hash(req.body.password);
        }
        log(await usersService.patchById(req.body.id, req.body));
        const user = await usersService.readById(req.body.id);
        res.status(200).json({message:"User successfully updated", user: user});
    }

    async putUser(req: express.Request, res: express.Response) {
        req.body.password = await argon2.hash(req.body.password);
        log(await usersService.putById(req.body.id, req.body));
        const user = await usersService.readById(req.body.id);
        res.status(200).json({message:"User successfully updated", user: user});
    }

    async removeUser(req: express.Request, res: express.Response) {
        log(await usersService.deleteById(req.body.id));
        res.status(200).json({message: "User successfully deleted"});
    }
}

export default new UsersController();