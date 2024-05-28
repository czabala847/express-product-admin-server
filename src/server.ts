import color from "colors";
import cors, { CorsOptions } from "cors";
import express from "express";
import morgan from "morgan";
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

//Permitir conexiones

const corsOptions: CorsOptions = {
  origin: function (origin, callback) {
    if (origin === process.env.FRONTEND_URL) {
      callback(null, true);
    } else {
      callback(new Error("No permitido por CORS"));
    }
  },
};

server.use(cors(corsOptions));

server.use(express.json()); //Habilitar lectura del body

server.use(morgan("dev"));
server.use("/api/products", router);

//Docs
server.use("/docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

export default server;
