import { Address } from 'nodemailer/lib/mailer';

export interface RequestEmail {
  from: Address;
  to: Address[];
  subject: string;
  text?: string;
  html: string;
}
