import { Module } from '@nestjs/common';
import { MinioClientModule } from 'src/minio-client/minio-client.module';
import { UploadController } from './controllers/upload.controller';
import { UploadService } from './services/upload.service';

@Module({
    imports: [
        MinioClientModule
    ],
    providers: [
        UploadService
    ],
    controllers: [
        UploadController
    ]
})
export class UploadModule { }
