import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as nodemailer from 'nodemailer';
import { MailerHealthCheckService } from './mailer-check';

@Injectable()
export class EmailService {
  private transporter: nodemailer.Transporter;

  constructor(private readonly configService: ConfigService) {
    this.transporter = nodemailer.createTransport({
      host: this.configService.get<string>('MAIL_HOST'),
      port: this.configService.get<number>('MAIL_PORT'),
      secure: true, // true for 465, false for other ports
      auth: {
        user: this.configService.get<string>('MAIL_USER'),
        pass: this.configService.get<string>('MAIL_PASSWORD'),
      },
    });
  }

  async sendEmailWithAttachment(
    dto: string,
    files: Array<Express.Multer.File>,
  ): Promise<void> {
    const data = JSON.parse(dto);
    const { to, subject, text, html } = data;

    try {
      const mailerCheck = new MailerHealthCheckService(this.transporter);
      const isValid = await mailerCheck.verifyTransport();

      if (isValid && dto) {
        const attachments = files.map((file) => ({
          filename: file?.originalname,
          content: file?.buffer,
        }));

        const options = {
          from: this.configService.get('EMAIL_FROM'), // sender address
          to, // list of receivers
          subject, // Subject line
          text, // plain text body
          html, // html body
          attachments,
        };
        const result = await this.transporter.sendMail(options);
        return result.messageId;
      }
    } catch (error) {
      throw new Error(error);
    }
  }
}
