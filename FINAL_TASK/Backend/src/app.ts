import express from "express";
import bodyParser from "body-parser";
import helmet from "helmet";
import { useSwagger, useErrorHandler, useCors } from "./utils/swagger-and-other";
import { RegisterRoutes } from "../build/routes";
import { logger, setUpMorgan } from "./utils/app-logger";
import { nocache } from "./utils/nocache";
import { RegisterClasses } from "./utils/general";

export const app = express();

app.use(helmet());
app.use(nocache());
useCors(app);
setUpMorgan(app);
// Use body parser to read sent json payloads
app.use(
    bodyParser.urlencoded({
        extended: true,
    })
);
app.use(bodyParser.json());

RegisterClasses();

RegisterRoutes(app);

useSwagger(app);

useErrorHandler(app);

logger.info("Information");
logger.warn("Warning");
logger.error("Error display");
