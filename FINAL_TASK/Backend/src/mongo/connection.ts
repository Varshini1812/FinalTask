import mongoose from "mongoose";
import config from "config";
import { logger } from "../utils/app-logger";
import { color } from "../utils/color-console";

export function connectDB() {
    if (mongoose.connection.readyState > 0) {
        return;
    }
    mongoose.connect(
        config.get("mongodb.url") as string,
        config.get("mongodb.options") as mongoose.MongooseOptions
    ).then(() => {
        logger.info(`${color.FgGreen}Mongo DB Connected : Config Name : ${config.get("mongodb.name")} ${color.Reset}`);
    }).catch((err) => {
        logger.error(`${color.FgRed}Mongo DB Not Connected${color.Reset}`, (err || "").toString());
    });
}

export { mongoose as db };