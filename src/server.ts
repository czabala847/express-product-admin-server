import color from "colors";
import express from "express";
import swaggerUi from "swagger-ui-express";
import db from "./config/db";
import swaggerSpec from "./config/swagger";
import router from "./router";

export async function connectDB() {
  try {
    await db.authenticate();
    await db.sync();
    // console.log(colors.bgGreen.white.bold("DB conectada"));
  } catch (error) {
    console.error(color.bgRed.white.bold("Error conectar DB"), error);
  }
}

connectDB();
const server = express();

server.use(express.json()); //Habilitar lectura del body
server.use("/api/products", router);

//Docs
server.use("/docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

export default server;
