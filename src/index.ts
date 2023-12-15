import configDotEnv from "./config";
import express, { json } from "express";
import logger from "./middleware/logger";
import notFound from "./middleware/not-found";
import connect from "./database/connections";
import { usersRouter } from "./routes/users";
import { cardsRouter } from "./routes/cards";
import { errorHandler } from "./middleware/error-handler";

configDotEnv();
connect();
const app = express();
app.use(express.json());
app.use(logger);
app.use("/api/v1/users", usersRouter);
app.use("/api/v1/cards", cardsRouter);
app.use(errorHandler);
app.use(notFound);

app.listen(8080);
