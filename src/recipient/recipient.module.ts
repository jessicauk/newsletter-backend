import { Module } from '@nestjs/common';
import { RecipientService } from './recipient.service';
import { RecipientController } from './recipient.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RecipientSchema } from './recipient.schema';
import { ConfigModule } from '@nestjs/config';
import { EmailModule } from 'src/email/email.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([RecipientSchema]),
    ConfigModule,
    EmailModule,
  ],
  providers: [RecipientService],
  controllers: [RecipientController],
  exports: [RecipientService],
})
export class RecipientModule {}
