import { EntitySchema } from 'typeorm';
import { Recipient } from './recipient.entity';

export const RecipientSchema = new EntitySchema<Recipient>({
  name: 'Recipient',
  target: Recipient,
  columns: {
    userId: {
      primary: true,
      type: 'uuid',
      generated: 'uuid',
    },
    name: {
      type: String,
    },
    email: {
      type: String,
    },
    unsubscribeToken: {
      type: String,
      nullable: true,
    },
    isSubscribed: {
      type: Boolean,
      default: true,
    },
    tokenExpiration: {
      type: Date,
      nullable: true,
    },
  },
});
