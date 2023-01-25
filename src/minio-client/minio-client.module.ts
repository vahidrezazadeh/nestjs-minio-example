import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MinioModule } from 'nestjs-minio-client';
import { MinioClientService } from './services/minioClient.service';


@Module({
    imports: [
        MinioModule.registerAsync({
            imports: [ConfigModule],
            useFactory: async (configService: ConfigService) => ({
                endPoint: configService.get('MINIO_ENDPOINT'),
                port: parseInt(configService.get('MINIO_PORT')),
                useSSL: false, // If on localhost, keep it at false. If deployed on https, change to true
                accessKey: configService.get('MINIO_ACCESS_KEY'),
                secretKey: configService.get('MINIO_SECRET_KEY'),
            }),
            inject: [ConfigService],
        }),
    ],
    providers: [MinioClientService],
    exports: [MinioClientService],
})
export class MinioClientModule {

}
