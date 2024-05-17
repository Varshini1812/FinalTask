import {
    Controller,
    Post,
    SuccessResponse,
    Response,
    UploadedFiles,
    Route,
} from "tsoa";
import config from 'config';
import path from "node:path";
import fs from "node:fs/promises";
import { logger } from "../utils/app-logger";
import crypto from "node:crypto";

@Route("general")
export class GeneralController extends Controller {
    @Post("upload")
    @SuccessResponse(200, "Success")
    @Response(400, "Invalid request")
    public async GeneralUpload(
        @UploadedFiles() files: Express.Multer.File[]): Promise<Array<string>> {
        
        let thePath = config.get("uploadedFiles.dir") as string;
        thePath = path.isAbsolute(thePath) ? thePath : path.join(process.cwd(), thePath);
        path.resolve(thePath);
        
        let result = new Array<string>();

        for (const file of files) {
            console.log(file)
            let filename = Array.from(crypto.randomBytes(4)).map(x => 
                x.toString(16)).join("")
                + path.extname(file.originalname);
            let filepath = path.join(thePath, filename); 
                
            try {
                await fs.mkdir(thePath, { recursive: true });
                await fs.writeFile(filepath, file.buffer);
            } catch (ex) {
                logger.error("Error in writing upload file : ", ex);
            }
            result.push(filepath);
        }
        return result;
    }
}