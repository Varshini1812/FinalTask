import { Controller, Post, Get, UploadedFile, Route, Path} from "tsoa";
import config from "config";
import path from "node:path";
import fs from "node:fs/promises";
import { logger } from "../utils/app-logger";
import crypto from "node:crypto";
@Route("file")
export class FileController extends Controller {
  @Post("")
  async updadFile(@UploadedFile() file: Express.Multer.File) {
    const uploadDir = config.get("uploadedFiles.dir") as string;
    const absoluteUploadDir = path.isAbsolute(uploadDir)
      ? uploadDir
      : path.join(process.cwd(), uploadDir);

    try {
      const uniqueFilename =
        crypto.randomBytes(4).toString("hex") + path.extname(file.originalname);
      const filePath = path.join(absoluteUploadDir, uniqueFilename);

      await fs.mkdir(absoluteUploadDir, { recursive: true });

      await fs.writeFile(filePath, file.buffer);

      logger.info(`File upTsoaloaded successfully: ${filePath}`);

      // Return the uploaded file path
      return uniqueFilename;
    } catch (error) {
      logger.error("Error while processing file:", error);
      return "";
    }
  }
  @Get("{filename}")
      public async getImageUrl(@Path() filename: string): Promise<string> {
        const uploadDir = config.get("uploadedFiles.dir") as string;
        const imagePath: string = path.resolve(uploadDir, filename);

       return imagePath;
    }
//   public async getImageUrl(
//     @Path() filename: string,
//     @Res() res: Response<200, { reason: any }>,
//     @Response res2:App
//   ): Promise<void> {
//     // const uploadDir = config.get("uploadedFiles.dir") as string;
//     // const imagePath: string = path.resolve(uploadDir, filename);

//     try {
//         filename;
//     //   const data = await fs.readFile(imagePath);
   
//       this.sendFile('G:\\Amazecodes\\InternTask\\FINAL_TASK\\Backend\\files\\8dcf0726.jpeg');
//     } catch (error) {
//       console.error(error);
//       res.status(500).json({ error: "Failed to read file" });
//     }
//   }
}
