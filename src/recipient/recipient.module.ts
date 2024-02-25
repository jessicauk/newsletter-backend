import { Module } from '@nestjs/common';
import { RecipientService } from './recipient.service';
import { RecipientController } from './recipient.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RecipientSchema } from './recipient.schema';

@Module({
  imports: [TypeOrmModule.forFeature([RecipientSchema])],
  providers: [RecipientService],
  controllers: [RecipientController],
})
export class RecipientModule {}
