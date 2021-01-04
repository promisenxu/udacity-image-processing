import express, { Request } from 'express';
import { getReadyResizedImageFilepath } from '../utils/image-processing';

const router = express.Router();

export const BASE_PATH = '/images';

router.get("/:imageName", async (req: Request<{imageName: string}, any, any, {width?: number, height?: number}>, res, next: any) => {
    if (!req.params.imageName) {
        res.status(400);
        res.send('Please specify image to resize');
    }
    try {
        const cachedFilepath = await getReadyResizedImageFilepath(req.params.imageName, req.query.width, req.query.height);
        res.send(cachedFilepath);
    }
    catch (error) {
        next(error);
    }
});
export default router;