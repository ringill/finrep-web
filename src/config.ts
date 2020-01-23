// config.ts
import dotenv from "dotenv";
dotenv.config();

export const inboxFolder = process.env.FS_INBOX_FOLDER;
export const pdfFileName = `${inboxFolder}626663090.pdf`;

