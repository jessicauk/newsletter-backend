import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppService } from './app.service';
import { UploadModule } from './upload/upload.module';
import databaseConfig from './config/database.config';
import { RecipientModule } from './recipient/recipient.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRoot({ ...databaseConfig }),
    UploadModule,
    RecipientModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
