import { Body, Controller, Delete, Param, Post, UploadedFile, UseInterceptors } from "@nestjs/common";
import { FileInterceptor } from "@nestjs/platform-express";
import { BufferedFile } from "../../minio-client/interfaces/bufferedFile.interface";
import { DeleteDto } from "../dto/delete.dto";
import { UploadService } from "../services/upload.service";

@Controller('upload')
export class UploadController {
    constructor(private uploadService: UploadService) { }

    @Post('image')
    @UseInterceptors(FileInterceptor('image'))
    async uploadImage(@UploadedFile() image: BufferedFile) {
        return await this.uploadService.uploadImage(image);
    }
    @Post('delete')
    async deleteImage(@Body() body: DeleteDto) {
        return await this.uploadService.deleteImage(body.image);
    }
}