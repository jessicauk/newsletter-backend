// A pipe to check or convert document payloads for your controller
import { Injectable } from '@nestjs/common';
import * as nodemailer from 'nodemailer';

@Injectable()
export class MailerHealthCheckService {
  constructor(private readonly nodemailerService: nodemailer.Transporter) {
    this.nodemailerService = nodemailerService;
  }

  async verifyTransport(): Promise<boolean> {
    try {
      const testResult = await this.nodemailerService.verify();
      return Promise.resolve(!!testResult);
    } catch (error) {
      // Handle or log the failure here
      return Promise.resolve(false);
    }
  }
}
