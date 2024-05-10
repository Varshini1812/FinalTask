import {
    Controller,
    Get,
    NoSecurity,
    Route,
    Security,
    SuccessResponse,
} from "tsoa";
import { UserModel } from "../models/user";
import { Mapper } from "../utils/mapper";

@Route("sample")
@Security("bearer", ['user'])
export class SampleController extends Controller {
    @Get("test")
    @SuccessResponse(200, "I am working")
    public async Test(): Promise<UserModel> {
        let x: UserModel = new Mapper<UserModel>().createFrom({
            user_id: 1,
            phone: "1234",
            new_mail: "a@2",
            password: null,
            x: "token",
            token_date: '2007-10-12',
            some_data: 'notfound',
            some_more_data: 'xyz',
        }, [
            ["new_mail", "email"],
        ], [
            "some_data",
            "some_more_data"
        ], {
            noDefaultMapping: false
        });
        return x;
    }
    @Get("test2")
    @NoSecurity()
    @SuccessResponse(200, "I am working")
    public async Test2(): Promise<UserModel> {
        let x: UserModel = new Mapper<UserModel>().createFrom({
            user_id: 1,
            phone: "1234",
            new_mail: "a@2",
            password: null,
            x: "token",
            token_date: '2007-10-12',
            some_data: 'notfound',
            some_more_data: 'xyz',
        }, [
            ["new_mail", "email"],
        ], [
            "some_data",
            "some_more_data"
        ], {
            noDefaultMapping: false
        });
        return x;
    }
}