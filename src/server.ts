import colors from "colors";
import express from "express";
import db from "./config/db";
import router from "./router";

async function connectDB() {
  try {
    await db.authenticate();
    await db.sync();
    console.log(colors.bgGreen.white.bold("DB conectada"));
  } catch (error) {
    console.error(colors.bgRed.white.bold("Error conectar DB"), error);
  }
}

connectDB();
const server = express();

server.use("/api/products", router);

export default server;
