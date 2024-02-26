import {
  Controller,
  Get,
  Param,
  Post,
  Body,
  Res,
  ParseUUIDPipe,
  HttpStatus,
} from '@nestjs/common';
import { RecipientService } from './recipient.service';
import { Recipient } from './recipient.entity';
import { Response } from 'express';

@Controller('api/recipient')
export class RecipientController {
  constructor(private readonly recipientService: RecipientService) {}

  @Get()
  async getSubscribers(@Res() res: Response) {
    try {
      const result = await this.recipientService.findAll();
      return res.status(HttpStatus.OK).json(result);
    } catch (error) {
      return res
        .status(HttpStatus.BAD_REQUEST)
        .json({ message: error.message });
    }
  }

  @Get(':userId')
  async findOne(
    @Param('userId', ParseUUIDPipe) userId: string,
    @Res() res: Response,
  ) {
    try {
      const result = await this.recipientService.findOne(userId);
      console.log('result', result);
      return res.status(HttpStatus.OK).json(result);
    } catch (error) {
      return res
        .status(HttpStatus.BAD_REQUEST)
        .json({ message: error.message });
    }
  }

  @Get('unsubscribe/:unsubscribeToken')
  async unsubscribe(@Param('unsubscribeToken') unsubscribeToken: string) {
    return this.recipientService.unsubscribe(unsubscribeToken);
  }

  @Get('subscribe/:userId')
  async subscribe(@Param('userId', ParseUUIDPipe) userId: string) {
    return this.recipientService.subscribe(userId);
  }

  @Post()
  async create(@Body() recipient: Recipient, @Res() res: Response) {
    try {
      const result = await this.recipientService.create(recipient);
      return res
        .status(HttpStatus.OK)
        .json({ message: 'Recipient created', result });
    } catch (error) {
      return res
        .status(HttpStatus.BAD_REQUEST)
        .json({ message: error.message });
    }
  }
}
