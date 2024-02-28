import { Address } from 'nodemailer/lib/mailer';
import { EmailData } from 'src/email/email.interface';

export interface RecipientData {
  files: Array<Express.Multer.File>;
  data: Partial<EmailData>;
  recipients: Address[];
}
