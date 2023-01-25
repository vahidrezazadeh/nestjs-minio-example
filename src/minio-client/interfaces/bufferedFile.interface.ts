import { AppMimeType } from "../models/file.model";

export interface BufferedFile {
    fieldname: string;
    originalname: string;
    encoding: string;
    mimetype: AppMimeType;
    size: number;
    buffer: Buffer | string;
}
