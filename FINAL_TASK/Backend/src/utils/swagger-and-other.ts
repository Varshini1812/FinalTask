import { Response as ExResponse, Request as ExRequest, Express, NextFunction } from "express";
import { ValidateError } from "tsoa";
import swaggerUi from "swagger-ui-express";
import { logger } from "./app-logger";
import config from 'config';
import cors, { CorsOptions } from 'cors';
import { AuthError } from "./app-request";

// ...
export function useSwagger(app: Express) {
    app.use("/docs", swaggerUi.serve, async (_req: ExRequest, res: ExResponse) => {
        return res.send(
            swaggerUi.generateHTML(await import("../../build/swagger.json"))
        );
    });
}

export function useErrorHandler(app: Express) {
    app.use(function errorHandler(
        err: unknown,
        req: ExRequest,
        res: ExResponse,
        next: NextFunction
    ): ExResponse | void {

        logger.error(
            (err && (err as any)?.message)
            || (typeof err == "string" ? err : "Error thrown"),
            err);

        if (err instanceof AuthError) {
            return res.status(err.status || 401).json({
                message: "Authentication Failure"
            });
        }

        if (err instanceof ValidateError) {
            logger.warn(`Caught Validation Error for ${req.path}:`, err.fields);
            return res.status(422).json({
                message: "Validation Failed",
                details: err?.fields,
            });
        }

        if (err instanceof Error) {
            return res.status(500).json({
                message: "Internal Server Error",
            });
        }

        next();
    });
}

export function useCors(app: Express) {
    var whitelist = config.get("cors.sites") as string[];

    var corsOptions: CorsOptions = {
        origin: function (origin: any, callback: any) {

            if (config.get("cors.debug") == true) {
                logger.info("Allowed Origins", whitelist, { requested: (origin || "none") });
            }

            if (!origin || whitelist.indexOf(origin) !== -1) {
                callback(null, true)
            } else {
                callback(new Error('Not allowed by CORS'))
            }

        },
        credentials: true,
        exposedHeaders: "X-Token",
    }
    app.use(cors(corsOptions));
}
