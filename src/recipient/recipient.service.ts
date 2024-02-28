import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ConfigService } from '@nestjs/config';
import { Recipient } from './recipient.entity';
import { generateUnsubscribeToken, TEMPLATE_MESSAGE } from './recipient.utils';
import { EmailService } from 'src/email/email.service';
import { RecipientData } from './recipient.interface';
import { EmailData } from 'src/email/email.interface';

@Injectable()
export class RecipientService {
  constructor(
    @InjectRepository(Recipient)
    private recipientRepository: Repository<Recipient>,
    private readonly configService: ConfigService,
    private readonly mailerService: EmailService,
  ) {}

  async findAll(): Promise<Recipient[]> {
    return this.recipientRepository.find({
      select: ['email', 'name', 'isSubscribed'],
      where: { isSubscribed: true },
    });
  }

  async findOne(userId: string): Promise<Recipient> {
    return this.recipientRepository.findOne({ where: { userId } });
  }

  async findByEmail(email: string): Promise<Recipient> {
    return this.recipientRepository.findOne({ where: { email } });
  }

  async findByToken(unsubscribeToken: string): Promise<Recipient> {
    return this.recipientRepository.findOne({
      select: ['email', 'name', 'isSubscribed'],
      where: { unsubscribeToken },
    });
  }

  async create(recipient: Recipient): Promise<Recipient> {
    const unsubscribeToken = generateUnsubscribeToken();
    const data = { ...recipient, unsubscribeToken };
    return this.recipientRepository.save(data);
  }

  async recipientTemplate(email: string, html: string): Promise<string> {
    const recipient = await this.findByEmail(email);
    const unsubscribeLink = `${this.configService.get<string>('CORS_ORIGIN')}/recipient/unsubscribe/${recipient.unsubscribeToken}`;
    const template = `<div>
    ${html}
    <p style="font-size:22px">${recipient?.name},</p><br>
    <p style="font-size:18px">${TEMPLATE_MESSAGE}</p>
    <p style="font-size:18px">${unsubscribeLink}</p>
    <div>`;
    return template;
  }

  async subscribe(userId: string): Promise<Recipient> {
    const recipient = await this.recipientRepository.findOne({
      where: { userId },
    });
    recipient.isSubscribed = true;
    return this.recipientRepository.save(recipient);
  }

  async unsubscribe(unsubscribeToken: string): Promise<Recipient> {
    const recipient = await this.recipientRepository.findOne({
      where: { unsubscribeToken },
    });
    recipient.isSubscribed = false;
    return this.recipientRepository.save(recipient);
  }

  async sendRecipientEmail({
    recipients,
    data,
    files,
  }: RecipientData): Promise<void> {
    // Send email to recipient
    for (const recipient of recipients) {
      const recipientData: EmailData = {
        to: recipient.address,
        subject: data.subject,
        text: data.text,
        html: await this.recipientTemplate(recipient.address, data.html),
      };

      await this.mailerService.sendEmailWithAttachment(recipientData, files);
    }
  }
}
