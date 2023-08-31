import { User } from "src/user/models/user.entity";
import { BeforeInsert, Column, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { v4 as uuidv4 } from 'uuid';

@Entity('address')
export class Address{
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

    @BeforeInsert()
    addId() {
      if (!this.id) {
        this.id = uuidv4();
      }
    }

    @OneToOne(() => User, {cascade : true})
    @JoinColumn({ name: 'user_id'})
    user: User;
}