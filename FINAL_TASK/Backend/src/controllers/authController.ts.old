import {
    Body,
    Controller,
    Post,
    Route,
    Security,
    Request,
    SuccessResponse,
    Response,
} from "tsoa";
import config from 'config'
import { Inject } from "typescript-ioc";
import { UserRepository } from "../repo-base/user-repository";
import { AppRequest } from "../utils/app-request";
import jwt from "jsonwebtoken";
import { md5 } from "../utils/md5";
import { randomInt } from "crypto";
import { sendEmail } from "../utils/emailer";

@Route("auth")
export class AuthController extends Controller {
    constructor(@Inject private repo: UserRepository) { super(); }

    @Post("login")
    @SuccessResponse(200, "Success")
    @Response(400, "Invalid login")
    public async Login(
        @Body() login: { password: string, userName: string })
        : Promise<{ accessToken: string | null, refreshToken: string | null }> {
        let user = await this.repo.getByEmailWithSensitiveInfo(login.userName);
        if (user && md5(login.password) == user.password) {
            return {
                accessToken: jwt.sign({ userid: user.userId, scope: ["user"], name: user.userName },
                    config.get("common.accessKey"),
                    {
                        expiresIn: config.get("common.accessTimeout")
                    }),
                refreshToken: jwt.sign({ userid: user.userId, scope: ["api"] },
                    config.get("common.refreshKey"),
                    {
                        expiresIn: config.get("common.refreshTimeout")
                    })
            };
        }
        this.setStatus(400);
        return { accessToken: null, refreshToken: null }
    }
    @Post("refresh-token")
    @SuccessResponse(200, "Success")
    @Response(400, "Invalid request")
    public async Refresh(@Body() refresh: { refreshToken: string })
        : Promise<{ accessToken: string | null, refreshToken: string | null }> {

        let decoded = jwt.verify(refresh.refreshToken, config.get("common.refreshKey")) as any;
        if (decoded.userid) {
            let user = await this.repo.getone(decoded.userid);
            if (user) {
                return {
                    accessToken: jwt.sign({ userid: user.userId, scope: ["user"], name: user.userName },
                        config.get("common.accessKey"),
                        {
                            expiresIn: config.get("common.accessTimeout")
                        }),
                    refreshToken: jwt.sign({ userid: user.userId, scope: ["api"] },
                        config.get("common.refreshKey"),
                        {
                            expiresIn: config.get("common.refreshTimeout")
                        })
                };
            }
        }
        this.setStatus(400);
        return { accessToken: null, refreshToken: null }
    }

    @Post("logout")
    @SuccessResponse(200, "Success")
    @Response(400, "Invalid request")
    public async Logout()
        : Promise<{ success: boolean }> {

        return { success: true }
    }

    @Post("change-password-step1")
    @SuccessResponse(200, "Success")
    public async ChangePasswordStep1(@Body() data: { email: string })
        : Promise<{ success: boolean }> {
        let user = await this.repo.getByEmailWithSensitiveInfo(data.email);
        if (user != null) {
            let token = randomInt(100000, 999999);
            await this.repo.updateToken(user.userId || "-100", md5(token.toString()));
            await sendEmail({
                to: data.email,
                subject: "Starter Kit Site Password Change",
                text: "Token is : " + token.toString(),
                from: config.get("emailer.from")
            });
            return { success: true }
        }
        return { success: false }
    }
    @Post("change-password-step2")
    @SuccessResponse(200, "Success")
    public async ChangePasswordStep2(@Body() data: { email: string, token: string, password: string })
        : Promise<{ success: boolean }> {
        let result = { success: false };
        if (data.password) {
            let user = await this.repo.getByEmailWithSensitiveInfo(data.email);
            if (user != null) {
                let token = md5(data.token);
                if (token == user.token) {
                    user.password = md5(data.password);
                    user.token = null;
                    user.tokenDate = null;
                    await this.repo.update(user);
                    result.success = true;
                }
            }
        }
        return result
    }

    @Security("bearer", ["user"])
    @Post("change-password")
    @SuccessResponse(200, "Success")
    public async ChangePassword(
        @Body() change: { oldPassword: string, password: string },
        @Request() req: AppRequest)
        : Promise<{ success: boolean }> {
        let result = { success: false };
        if (change.password) {
            let info = await this.repo.getone(req.user?.id || "-100");
            if (!info) {
                return result;
            }
            let user = await this.repo.getByEmailWithSensitiveInfo(info.email);
            if (user != null) {
                let oldPassword = md5(change.oldPassword);
                if (oldPassword == user.password) {
                    user.password = md5(change.password);
                    user.token = null;
                    user.tokenDate = null;
                    await this.repo.update(user);
                    result.success = true;
                }
            }
        }
        return result
    }
}