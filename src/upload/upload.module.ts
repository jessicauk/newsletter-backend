import { Module } from '@nestjs/common';
import { UploadController } from './upload.controller';
import { RecipientModule } from 'src/recipient/recipient.module';

@Module({
  imports: [RecipientModule],
  controllers: [UploadController],
})
export class UploadModule {}
