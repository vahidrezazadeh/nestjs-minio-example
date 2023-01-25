import { HttpException, HttpStatus, Injectable, Logger } from "@nestjs/common";
import { MinioService } from "nestjs-minio-client";
import { BufferedFile } from "../interfaces/bufferedFile.interface";
import * as crypto from 'crypto';

@Injectable()
export class MinioClientService {

    private readonly logger: Logger;
    private readonly bucketName = process.env.MINIO_BUCKET_NAME;


    constructor(
        private readonly minioService: MinioService
    ) {
        this.logger = new Logger('MinioService');
        const policy = {
            Version: '2012-10-17',
            Statement: [
                {
                    Effect: 'Allow',
                    Principal: {
                        AWS: ['*'],
                    },
                    Action: [
                        's3:ListBucketMultipartUploads',
                        's3:GetBucketLocation',
                        's3:ListBucket',
                    ],
                    Resource: [`arn:aws:s3:::${this.bucketName}`],
                },
                {
                    Effect: 'Allow',
                    Principal: {
                        AWS: ['*'],
                    },
                    Action: [
                        's3:PutObject',
                        's3:AbortMultipartUpload',
                        's3:DeleteObject',
                        's3:GetObject',
                        's3:ListMultipartUploadParts',
                    ],
                    Resource: [`arn:aws:s3:::${this.bucketName}/*`],
                },
            ],
        };
        this.client.setBucketPolicy(
            process.env.MINIO_BUCKET_NAME,
            JSON.stringify(policy),
            function (err) {
                if (err) throw err;
                console.log('Bucket policy set');
            },
        );
    }


    public get client() {
        return this.minioService.client;
    }
    public getFileExtension(fileName: string) {
        return fileName.substring(
            fileName.lastIndexOf('.'),
            fileName.length,
        );
    }
    private getHashFileName() {
        const timestamp = Date.now().toString();
        return crypto
            .createHash('md5')
            .update(timestamp)
            .digest('hex');
    }
    private async generateFileUrl(fileName: string) {
        return `${process.env.MINIO_ENDPOINT}:${process.env.MINIO_PORT}/${process.env.MINIO_BUCKET_NAME}/${fileName}`
    }
    public async upload(
        file: BufferedFile,
        bucketName: string = this.bucketName,
    ) {

        const extension = this.getFileExtension(file.originalname);

        const metaData = {
            'Content-Type': file.mimetype,
        };

        const hashedFileName = await this.getHashFileName();

        const fileName = hashedFileName + extension;

        this.client.putObject(
            bucketName,
            fileName,
            file.buffer,
            metaData,
            function (err, res) {
                if (err) {
                    throw new HttpException(
                        'Error In Uploading file',
                        HttpStatus.BAD_REQUEST,
                    );
                }
            },
        );

        return await this.generateFileUrl(fileName);
    }
    async delete(objetName: string, bucketName: string = this.bucketName) {
        this.client.removeObject(bucketName, objetName, function (err, res) {
            if (err)
                throw new HttpException(
                    'An error occured when deleting!',
                    HttpStatus.BAD_REQUEST,
                );
        });
    }
}