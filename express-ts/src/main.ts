import {app, routes, CommonRoutesConfig, debugLog, runningMessage, port} from './app';

const start = (port: number) => {
    try {
        app.listen(port, () => {
            routes.forEach((route: CommonRoutesConfig) => {
                debugLog(`Routes configured for ${route.getName()}`);
            });
            console.log(runningMessage);
        });
    } catch (error) {
        console.error(error);
        process.exit();
    }
};

start(port);