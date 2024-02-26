import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Recipient } from './recipient.entity';
import { generateUnsubscribeToken } from './recipient.utils';

@Injectable()
export class RecipientService {
  constructor(
    @InjectRepository(Recipient)
    private recipientRepository: Repository<Recipient>,
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

  async create(recipient: Recipient): Promise<Recipient> {
    const unsubscribeToken = generateUnsubscribeToken();
    const data = { ...recipient, unsubscribeToken };
    return this.recipientRepository.save(data);
  }

  async unsubscribe(unsubscribeToken: string): Promise<Recipient> {
    const recipient = await this.recipientRepository.findOne({
      where: { unsubscribeToken },
    });
    recipient.isSubscribed = false;
    return this.recipientRepository.save(recipient);
  }

  async subscribe(userId: string): Promise<Recipient> {
    const recipient = await this.recipientRepository.findOne({
      where: { userId },
    });
    recipient.isSubscribed = true;
    return this.recipientRepository.save(recipient);
  }
}
