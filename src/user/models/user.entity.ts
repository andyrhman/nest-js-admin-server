// user.entity.ts
import { Exclude } from 'class-transformer';
import { Column, Entity, PrimaryGeneratedColumn, BeforeInsert } from 'typeorm';
import { v4 as uuidv4 } from 'uuid';

@Entity('users')
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  username: string;

  @Column({ unique: true })
  email: string;

  @Column()
  @Exclude()
  password: string;

  @BeforeInsert()
  addId() {
    if (!this.id) {
      this.id = uuidv4();
    }
  }
}