import app from "./app";
const port = 3000;

app.listen(port, (): void => {
  console.log(`Image processing API listening at http://localhost:${port}`);
});
