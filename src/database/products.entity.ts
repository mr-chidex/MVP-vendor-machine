import {
  BaseEntity,
  PrimaryGeneratedColumn,
  Entity,
  Column,
  ManyToOne,
  JoinColumn,
  UpdateDateColumn,
  CreateDateColumn,
} from 'typeorm';
import { User } from './users.entity';

@Entity('products')
export class Product extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  amountAvailable: number;

  @Column()
  cost: number;

  @Column()
  productName: string;

  @Column()
  sellerId: number;

  @ManyToOne(() => User, (user) => user.products, {
    eager: false,
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'sellerId' })
  user: User;

  @Column()
  @CreateDateColumn()
  createdAt: Date;

  @Column()
  @UpdateDateColumn()
  updatedAt: Date;
}
