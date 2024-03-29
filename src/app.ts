import express from "express";
import "express-async-errors";

import * as imagesRoute from "./routes/images";

const app = express();

app.get("/", (_req: express.Request, res: express.Response): void => {
  res.send("This is the Image Processing API");
});
app.use(imagesRoute.IMAGE_RESIZING_ROUTE_BASE_PATH, imagesRoute.default);

// Error handling
app.use((err: Error, _req: express.Request, res: express.Response): void => {
  if (err.message === "Source image does not exist") {
    res.status(404);
  } else {
    res.status(500);
  }
  res.send(err.message);
});

export default app;
