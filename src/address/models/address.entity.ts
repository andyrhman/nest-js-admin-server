import { User } from "src/user/models/user.entity";
import { BeforeInsert, Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { v4 as uuidv4 } from 'uuid';

@Entity('address')
export class Address {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  street: string;

  @Column()
  city: string;

  @Column()
  province: string;

  @Column()
  zip: string;

  @Column()
  country: string;

  @Column()
  phone: number;

  @Column({ name: 'user_id' })  // Explicit column for the foreign key
  userId: string;

  @BeforeInsert()
  addId() {
    if (!this.id) {
      this.id = uuidv4();
    }
  }

  @ManyToOne(() => User, (user) => user.address)
  @JoinColumn({ name: 'user_id' })
  user: User;
}