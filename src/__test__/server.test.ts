import request from "supertest";
import db from "../config/db";
import server, { connectDB } from "../server";

describe("GET /api", () => {
  it("should send back a json response with a message 'Hello World'", async () => {
    const response = await request(server).get("/api");
    expect(response.status).toBe(200);
    expect(response.header["content-type"]).toMatch(/json/);
    expect(response.body).toEqual({
      msg: "Hello World",
    });
  });

  it("should not return a 404", async () => {
    const response = await request(server).get("/api");
    expect(response.status).not.toBe(404);
  });
});

jest.mock("../config/db");

describe("connectDB", () => {
  it("should handle database connection errors", async () => {
    const messageError = "Error conectar DB";

    jest
      .spyOn(db, "authenticate")
      .mockRejectedValueOnce(new Error(messageError));
    const consoleSpy = jest.spyOn(console, "error");
    await connectDB();

    expect(consoleSpy).toHaveBeenCalledWith(
      expect.stringContaining(messageError)
    );
  });
});
