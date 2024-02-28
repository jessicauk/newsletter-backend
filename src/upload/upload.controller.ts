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
import { RecipientService } from '../recipient/recipient.service';

@Controller('api/upload')
export class UploadController {
  constructor(private readonly recipientService: RecipientService) {}
  @Post('/upload-file')
  @UseInterceptors(FilesInterceptor('files', 5, multerOptions))
  async sendMail(
    @Body() body: DataLoadDto,
    @UploadedFiles() files: Array<Express.Multer.File>,
  ) {
    try {
      const { data } = body;
      const { to: recipients, ...rest } = JSON.parse(data);
      const result = await this.recipientService.sendRecipientEmail({
        recipients,
        data: rest,
        files,
      });

      return {
        status: HttpStatus.OK,
        message: 'Email sent successfully',
        result,
      };
    } catch (error) {
      return {
        status: HttpStatus.BAD_REQUEST,
        message: error.message,
      };
    }
  }
}
