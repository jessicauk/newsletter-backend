import {
  Body,
  Controller,
  Post,
  UseInterceptors,
  UploadedFiles,
  HttpStatus,
} from '@nestjs/common';
import { FilesInterceptor } from '@nestjs/platform-express';
import { multerOptions } from './multer.config';
import { DataLoadDto } from './upload.dto';
import { EmailService } from '../email/email.service';

@Controller('api/upload')
export class UploadController {
  constructor(private readonly mailerService: EmailService) {}
  @Post('/upload-file')
  @UseInterceptors(FilesInterceptor('files', 5, multerOptions))
  async sendMail(
    @Body() body: DataLoadDto,
    @UploadedFiles() files: Array<Express.Multer.File>,
  ) {
    const { data } = body;
    const result = await this.mailerService.sendEmailWithAttachment(
      data,
      files,
    );
    return {
      status: HttpStatus.OK,
      message: 'Email sent successfully',
      result,
    };
  }
}
