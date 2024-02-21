import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as nodemailer from 'nodemailer';
import { Address } from 'nodemailer/lib/mailer';
import { MailerHealthCheckService } from './MailerHealtCheckService';

@Injectable()
export class EmailService {
  private transporter: nodemailer.Transporter;

  constructor(private readonly configService: ConfigService) {
    this.transporter = nodemailer.createTransport({
      host: this.configService.get<string>('MAIL_HOST'),
      port: this.configService.get<number>('MAIL_PORT'),
      pool: true,
      secure: true, // true for 465, false for other ports
      auth: {
        user: this.configService.get<string>('MAIL_USER'),
        pass: this.configService.get<string>('MAIL_PASSWORD'),
      },
    });
  }

  async sendEmailWithAttachment(dto: string, file: Express.Multer.File) {
    console.log('DTO', dto);
    const data = JSON.parse(dto);
    console.log('Data', data);
    const { to, subject, text, html, from } = data;
    const sender: Address = from ?? {
      name: this.configService.get('NAME_SENDER'),
      address: this.configService.get('MAIL_SENDER'),
    };
    try {
      const mailerCheck = new MailerHealthCheckService(this.transporter);
      const isValid = await mailerCheck.verifyTransport();

      console.log('File', file);

      if (isValid && dto) {
        const options = {
          from: sender, // sender address
          to, // list of receivers
          subject, // Subject line
          text, // plain text body
          html, // html body
          attachments: [
            {
              filename: file?.originalname,
              content: file?.buffer, // Use the buffer directly for attachments
              contentType: file?.mimetype,
              encoding: 'binary',
            },
          ],
        };
        const result = await this.transporter.sendMail(options);
        console.log('Message sent: %s', result.messageId);
        return result;
      }
    } catch (error) {
      throw new Error(error);
    }
  }
}
