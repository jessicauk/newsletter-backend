import { Address } from 'nodemailer/lib/mailer';

export interface RequestEmail {
  from: Address;
  to: Address[];
  subject: string;
  text?: string;
  html: string;
}

export interface EmailData {
  to: string;
  subject: string;
  text?: string;
  html?: string;
}
