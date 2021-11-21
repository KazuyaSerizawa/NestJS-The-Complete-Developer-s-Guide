import { Module } from '@nestjs/common';
import { MessagesController } from './messages.controller';
import { MessagesRepository } from './messages.repository';
import { MessagesSerivice } from './messages.service';

@Module({
  controllers: [MessagesController],
  providers: [MessagesSerivice, MessagesRepository],
})
export class MessagesModule {}
