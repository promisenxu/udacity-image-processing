import express, { Request } from 'express';

const router = express.Router();

export const BASE_ROUTE = '/images';

router.get("/:imageName", (req: Request<{imageName: string}, any, any, {width?: number, height?: number}>, res) => {
    res.send(`Processing ${req.params.imageName} with width ${req.query.width} and height ${req.query.height}`);
});
export default router;