import nodemailer from "nodemailer"
import Mail from "nodemailer/lib/mailer";
import { logger } from "./app-logger";
import config from "config";
export async function sendEmail(message: Mail.Options): Promise<boolean> {
    try {
        let transporter = nodemailer.createTransport(config.get("emailer.options"));
        // send mail with defined transport object
        let info = await transporter.sendMail(message);
        logger.info("Message sent", info);
    } catch (err) {
        logger.warn("Error on emailing", err);
        throw err;
    }
    return true;
}