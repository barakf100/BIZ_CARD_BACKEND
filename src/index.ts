import configDotEnv from "./config";
import express, { json } from "express";
import notFound from "./middleware/not-found";
import connect from "./database/connections";
import { usersRouter } from "./routes/users";
import { cardsRouter } from "./routes/cards";
import { errorHandler } from "./middleware/error-handler";
import morgan from "morgan";
import cors from "cors";

configDotEnv();
connect();
const app = express();

app.use(express.static("public"));
app.use(express.json());
app.use(cors());
app.use(morgan("dev"));
app.use("/api/v1/users", usersRouter);
app.use("/api/v1/cards", cardsRouter);
app.use(errorHandler);
app.use(notFound);

app.listen(8080);

// TODO: morgan , logger (winston) , extras
// read about next auth
// react fiber
//  three.js
