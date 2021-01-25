import express, { Request, Response } from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import appRoutes from '../api';
import config from '../config';
import errorHandler from '../api/middlewares/error-handler';
import RESPONSE from '../constants/response';
import DB from '../services/db';

const loadExpress = async ({ app }: { app: express.Application }) => {
    try {
        await DB.connect();

        // Health check
        app.get('/', (req: Request, res: Response) => {
            res.status(RESPONSE.HTTP_OK).json('App running').end();
        });

        // Useful if you're behind a reverse proxy (Heroku, Bluemix, AWS ELB, Nginx, etc)
        // It shows the real origin IP in the heroku or Cloudwatch logs
        app.enable('trust proxy');

        // Enable Cross Origin Resource Sharing to all origins by default
        app.use(
            cors({
                exposedHeaders: ['X-Total-Count'],
            })
        );

        // Middleware that transforms the raw string of req.body into json
        app.use(bodyParser.json());

        // Load API routes
        app.use(config.api.prefix, appRoutes());

        // Error handler
        app.use(errorHandler);
    } catch (err) {
        console.error(err);
    }
};

export default loadExpress;
