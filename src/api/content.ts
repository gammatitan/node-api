import { Router, Request, Response } from 'express';
import AppLayoutBuilder from '../services/app-layout-builder';

const route = Router();
const appLayoutBuilder = new AppLayoutBuilder();

const content = (app: Router) => {
    app.use('/content', route);

    /**
     * Get layout
     */
    route.get('/layout', async (req: Request, res: Response) => {
        const layout = appLayoutBuilder.build(req.user);

        res.json(layout);
    });
};

export default content;
