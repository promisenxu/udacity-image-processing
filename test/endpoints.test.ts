import request from "supertest";
import app from "../src/app";

test("Server should run", async () => {
  const response = await request(app).get("/");
  expect(response.status).toBe(200);
});

test("Image resizing should work", async () => {
  const response = await request(app).get(
    "/images/palmtunnel?width=100&height=100"
  );
  expect(response.status).toBe(200);
  expect(response.type).toBe("image/jpeg");
});
