import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { BufferedFile } from "../../minio-client/interfaces/bufferedFile.interface";
import { MinioClientService } from "../../minio-client/services/minioClient.service";

@Injectable()
export class UploadService {
    constructor(private readonly minioClientService: MinioClientService) { }
    async uploadImage(file: BufferedFile) {
        if (!(file.mimetype.includes('jpeg') || file.mimetype.includes('png'))) {
            throw new HttpException(
                'Invalid File Extension',
                HttpStatus.BAD_REQUEST,
            );
        }
        const imageUrl = await this.minioClientService.upload(file);
        return {
            url: imageUrl
        }
    }
    async deleteImage(imageUrl: string) {
        await this.minioClientService.delete(imageUrl);
    }
}