import {
  Body,
  Controller,
  Post,
  UseInterceptors,
  UploadedFile,
  HttpStatus,
  Req,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { EmailService } from './email.service';
import { RequestEmail } from './email.interface';

@Controller('email')
export class EmailController {
  constructor(private readonly mailerService: EmailService) {}

  @Post('/send-email')
  @UseInterceptors(FileInterceptor('file'))
  async sendMail(
    @Body() body: { data: string },
    @UploadedFile() file: Express.Multer.File,
  ) {
    console.log('Body', body);
    const { data } = body;
    /* const dto: RequestEmail = {
      ...body,
    }; */
    const result = await this.mailerService.sendEmailWithAttachment(data, file);
    return {
      status: HttpStatus.OK,
      message: 'Email sent succesfully',
      result,
    };
  }
}
