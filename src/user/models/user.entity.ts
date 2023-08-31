// user.entity.ts
import { Exclude } from 'class-transformer';
import { Address } from 'src/address/models/address.entity';
import { Role } from 'src/role/models/role.entity';
import { Column, Entity, PrimaryGeneratedColumn, BeforeInsert, ManyToOne, JoinColumn, OneToMany } from 'typeorm';
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

  // Role (Many) to User (one) relationship
  // That means One user has many roles
  @ManyToOne(() => Role)
  @JoinColumn({name: "role_id"})
  role: Role;

  @OneToMany(() => Address, (address) => address.user)
  address: Address[]
}