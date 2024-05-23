import db from "../config/db";
import { connectDB } from "../server";

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
