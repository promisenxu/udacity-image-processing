import express, { Request } from 'express';
import { getReadyResizedImageFilepath } from '../utils/image-processing';

const router = express.Router();

export const BASE_PATH = '/images';

router.get(
    '/:imageName',
    async (
        req: Request<
            { imageName: string },
            any,
            any,
            { width?: string; height?: string }
        >,
        res,
        next: any
    ) => {
        if (!req.params.imageName) {
            res.status(400);
            res.send('Please specify image to resize');
        }
        try {
            const cachedFilepath = await getReadyResizedImageFilepath(
                req.params.imageName,
                req.query.width ? parseInt(req.query.width, 10) : undefined,
                req.query.height ? parseInt(req.query.height, 10) : undefined
            );
            res.send(cachedFilepath);
        } catch (error) {
            next(error);
        }
    }
);
export default router;
