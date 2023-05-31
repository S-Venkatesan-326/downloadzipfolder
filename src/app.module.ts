import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { BlobStorageService } from './app.service';

@Module({
  imports: [],
  controllers: [AppController],
  providers: [BlobStorageService],
})
export class AppModule {}
