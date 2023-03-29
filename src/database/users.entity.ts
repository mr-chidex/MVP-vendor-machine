import {
  BaseEntity,
  PrimaryGeneratedColumn,
  Entity,
  Column,
  Unique,
  OneToMany,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';

import { Product } from './products.entity';

export enum ROLE {
  BUYER = 'seller',
  SELLER = 'buyer',
}

@Entity('users')
@Unique(['username'])
export class User extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  username: string;

  @Column()
  password: string;

  @Column({ default: 0 })
  deposit: number;

  @Column()
  role: string;

  @OneToMany(() => Product, (product) => product.user, {
    eager: true,
    cascade: true,
  })
  products: Product[];

  @Column({ name: 'created_at' })
  @CreateDateColumn()
  createdAt: Date;

  @Column()
  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;
}
