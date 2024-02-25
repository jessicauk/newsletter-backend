import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class Recipient {
  @PrimaryGeneratedColumn('uuid')
  userId: string;

  @Column()
  name: string;

  @Column()
  email: string;

  @Column({ nullable: true })
  unsubscribeToken: string;

  @Column({ default: true })
  isSubscribed: boolean;

  @Column({ type: 'timestamp', nullable: true })
  tokenExpiration: Date;
}
