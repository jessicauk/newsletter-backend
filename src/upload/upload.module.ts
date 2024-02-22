import { Module } from '@nestjs/common';
import { UploadController } from './upload.controller';
import { EmailModule } from 'src/email/email.module';

@Module({
  imports: [EmailModule],
  controllers: [UploadController],
})
export class UploadModule {}
