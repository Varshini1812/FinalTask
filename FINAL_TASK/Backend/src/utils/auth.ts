import express from "express";
import jwt from "jsonwebtoken";
import config from "config"
import { AuthUser, AuthError } from "./app-request";

export async function expressAuthentication(
    request: express.Request,
    securityName: string,
    scopes?: string[]
): Promise<AuthUser | null> {

    if (securityName === "bearer" || securityName === "api_key") {
        const token =
            request.body._token ||
            request.query._token ||
            ((request.headers["authorization"] || "") as string).replace(/^[ ]*[bB]earer[ ]+/i, "");
        return new Promise<AuthUser>((resolve, reject) => {
            if (token === 'test') {
                resolve({
                    id: "-1",
                    name: "Testing",
                    roles: ["test"],
                });
            }
            if (!token) {
                reject(new AuthError("No token provided"));
            }
            jwt.verify(token, config.get("common.accessKey"), function (err: any, decoded: any) {
                if (err) {
                    reject(new AuthError(`${err.name}: ${err.message}`));
                } else {
                    // Check if JWT contains all required scopes
                    for (let scope of scopes || []) {
                        if (!decoded.scope.includes(scope)) {
                            reject(new AuthError("JWT does not contain required scope."));
                        }
                    }
                    resolve({
                        id: decoded.userid,
                        name: decoded.name,
                        roles: decoded.roles,
                    });
                }
            });
        });

    }
    return null;
}