import express, { Request, Response, NextFunction } from "express";
import { getReadyResizedImageFilepath } from "../utils/image-processing";

const router = express.Router();

export const IMAGE_RESIZING_ROUTE_BASE_PATH = "/images";

router.get(
  "/:imageName",
  async (
    req: Request<
      { imageName: string },
      string,
      Record<string, never>,
      { width?: string; height?: string }
    >,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    // Checking parameters
    if (!req.params.imageName) {
      res.status(400);
      res.send("Please specify imageName in the query parameters");
      return;
    }
    if (!req.query.width || !req.query.height) {
      res.status(400);
      res.send("Please specify width and height in the query parameters");
      return;
    }
    const widthAsNumber = parseInt(req.query.width, 10);
    const heightAsNumber = parseInt(req.query.height, 10);
    if (
      isNaN(widthAsNumber) ||
      isNaN(heightAsNumber) ||
      widthAsNumber <= 0 ||
      heightAsNumber <= 0
    ) {
      res.status(400);
      res.send("Please specify width and height in positive numbers");
      return;
    }

    try {
      const cachedFilepath = await getReadyResizedImageFilepath(
        req.params.imageName,
        widthAsNumber,
        heightAsNumber
      );
      res.sendFile(cachedFilepath, (error: Error): void => {
        if (error) {
          res.status(400);
          res.send("Unknown error when sending response: " + error);
        }
      });
    } catch (error) {
      next(error);
    }
  }
);
export default router;
