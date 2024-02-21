import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { EmailService } from './email/email.service';
import { EmailController } from './email/email.controller';
import { EmailModule } from './email/email.module';

@Module({
  imports: [ConfigModule.forRoot(), EmailModule],
  controllers: [AppController, EmailController],
  providers: [AppService, EmailService],
})
export class AppModule {}
