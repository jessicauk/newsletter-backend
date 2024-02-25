import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DataSource, Repository } from 'typeorm';
import { Recipient } from './recipient.entity';

@Injectable()
export class RecipientService {
  constructor(
    @InjectRepository(Recipient)
    private recipientRepository: Repository<Recipient>,
    private dataSource: DataSource,
  ) {}

  findAll(): Promise<Recipient[]> {
    return this.recipientRepository.find();
  }

  async remove(id: number): Promise<void> {
    await this.recipientRepository.delete(id);
  }
}
