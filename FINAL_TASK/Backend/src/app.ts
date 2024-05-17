import express from "express";
import bodyParser from "body-parser";
import helmet from "helmet";
import { useSwagger, useErrorHandler, useCors } from "./utils/swagger-and-other";
import { RegisterRoutes } from "../build/routes";
import { logger, setUpMorgan } from "./utils/app-logger";
import { nocache } from "./utils/nocache";
import { RegisterClasses } from "./utils/general";
const cors = require('cors');
import 'localstorage-polyfill'
export const app = express();
const config = require('config');
app.use(helmet());
app.use(nocache());
useCors(app);
setUpMorgan(app);

app.use(cors());
global['localStorage'] = localStorage;
app.use(
    bodyParser.urlencoded({
        extended: true,
    })
);
app.use(bodyParser.json());
const corsSites = config.get('cors.sites');
console.log(corsSites); 
RegisterClasses();

RegisterRoutes(app);

useSwagger(app);

useErrorHandler(app);

logger.info("Information");
logger.warn("Warning");
logger.error("Error display");
