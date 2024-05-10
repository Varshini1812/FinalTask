import {
    Body,
    Controller,
    Get,
    Path,
    Post,
    Put,
    Response,
    Route,
    SuccessResponse,
    Security,
} from "tsoa";
import { Inject } from 'typescript-ioc'
import { UserErrorType, UserModel } from "../models/user";
import { UserRepository } from "../repo-base/user-repository";

@Route("users")
export class UserController extends Controller {

    @Inject private repo?: UserRepository;

    @Security("api_key", ["user"])
    @Get()
    @SuccessResponse(200, "Success")
    public async List(): Promise<Array<UserModel>> {
        let x: Array<UserModel> = await this.repo!.list();
        return x;
    }
    @Get("{userId}")
    @SuccessResponse(200, "Success")
    @Response(404, "Not Found")
    public async GetById(@Path("userId") userId: string): Promise<UserModel | UserErrorType> {
        let x: UserModel | null = await this.repo!.getone(userId);
        if (x == null) {
            this.setStatus(404);
            return { message: "Not Found" }
        }
        return x as UserModel;
    }

    @Post()
    @SuccessResponse(201, "Created")
    @Response(409, "Already exists")
    public async Create(@Body() user: UserModel): Promise<UserModel | UserErrorType> {
        let x: UserModel | null = await this.repo!.create(user);
        if (x == null) {
            this.setStatus(409);
            return { message: "Already exists" }
        }
        return x as UserModel;
    }
    @Put("{userId}")
    @SuccessResponse(201, "Created")
    @Response(404, "Not found")
    @Response(409, "Conflict")
    public async Update(@Path("userId") userId: string, @Body() user: UserModel): Promise<UserModel | UserErrorType> {
        user.userId = user.userId || userId;
        if (user.userId != userId) {
            this.setStatus(409);
            return { message: "User Id in confilict" }
        }
        let x: UserModel | null = await this.repo!.update(user);
        if (x == null) {
            this.setStatus(404);
            return { message: "Not found" }
        }
        return x as UserModel;
    }
}