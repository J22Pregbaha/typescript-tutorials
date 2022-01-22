import express from 'express';

import * as winston from 'winston';
import * as expressWinston from 'express-winston';
import cors from 'cors';
import { CommonRoutesConfig } from '../common/common.routes.config';
import { UserRoutes } from '../users/users.routes.config';
import debug from 'debug';

const app: express.Application = express();
const port: number = 3000;
const routes: Array<CommonRoutesConfig> = [];
const debugLog: debug.IDebugger = debug('app');

// here we are adding middleware to parse all incoming requests as JSON 
app.use(express.json());

// here we are adding middleware to allow cross-origin requests
app.use(cors());

// here we are preparing the expressWinston logging middleware configuration,
// which will automatically log all HTTP requests handled by Express.js
const loggerOptions: expressWinston.LoggerOptions = {
    transports: [new winston.transports.Console()],
    format: winston.format.combine(
        winston.format.json(),
        winston.format.prettyPrint(),
        winston.format.colorize({ all: true }),
    )
};

if (!process.env.DEBUG) {
    loggerOptions.meta = false; // when not debugging, log requests as one-liners
}

// initialize the logger with the above configuration
app.use(expressWinston.logger(loggerOptions));

// here we are adding the UserRoutes to our array,
// after sending the Express.js application object to have routes added to our app!
routes.push(new UserRoutes(app));

// a simple route to make sure everything is working properly
const runningMessage = `Server running on http://localhost:${port}`;
app.get('/', (req: express.Request, res: express.Response) => {
    res.status(200).send(runningMessage);
});

export {app, routes, CommonRoutesConfig, debugLog, runningMessage, port};