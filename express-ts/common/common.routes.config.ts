import express from 'express';

export abstract class CommonRoutesConfig {
    app: express.Application;
    name: string;

    constructor(app: express.Application, name: string) {
        this.app = app;
        this.name = name;
        this.configureRoutes();
    }

    getName() { return this.name; }

    // The line below forces any class extending this class to provide this function (configureRoutes)
    //  that returns an express.Application object.
    abstract configureRoutes(): express.Application;
}