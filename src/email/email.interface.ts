import * as nodemailer from 'nodemailer';
import { Address } from 'nodemailer/lib/mailer';

export interface Body {
  from: Address;
  to: Address[];
  subject: string;
  text?: string;
  html: string;
}

export interface SendEmail extends nodemailer.SendMailOptions {}
