import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MinioClientModule } from './minio-client/minio-client.module';

@Module({
  imports: [MinioClientModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
