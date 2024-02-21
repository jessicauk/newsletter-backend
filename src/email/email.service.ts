import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as nodemailer from 'nodemailer';
import { Body } from './email.interface';
import { MailerHealthCheckService } from "./MailerHealtCheckService";

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
        user: this.configService.get<string>('MAIL_USER'), // generated ethereal user
        pass: this.configService.get<string>('MAIL_PASSWORD'), // generated ethereal password
      },
    });
  }

  async sendMail(body: Body) {
    const { to, subject, text, html, from } = body;
      const mailerCheck = new MailerHealthCheckService(this.transporter)
      const isValid = await mailerCheck.verifyTransport()
      if (isValid) {
        const result = await this.transporter.sendMail({
          from, // sender address
          to, // list of receivers
          subject, // Subject line
          text, // plain text body
          html, // html body
        });
        console.log('Message sent: %s', result.messageId);
      }
    } catch (error) {
      throw new Error(error);
    }
  }
}
