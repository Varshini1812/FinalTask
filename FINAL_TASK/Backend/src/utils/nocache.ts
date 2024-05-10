import { Request, Response, NextFunction } from "express";

export function nocache() {
    return function nocache(_req: Request, res: Response, next: NextFunction) {
        res.setHeader("Surrogate-Control", "no-store");
        res.setHeader(
            "Cache-Control",
            "no-store, no-cache, must-revalidate, proxy-revalidate"
        );
        res.setHeader("Pragma", "no-cache");
        res.setHeader("Expires", "0");

        next();
    };
};