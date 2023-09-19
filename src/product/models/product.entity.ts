import { BeforeInsert, Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { v4 as uuidv4 } from 'uuid';

@Entity('products')
export class Product{
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    title: string;

    @Column()
    description: string;

    @Column()
    image: string;

    @Column()
    price: number;
    
    @CreateDateColumn()
    created_at: string;

    @UpdateDateColumn()
    updated_at: string;

    @BeforeInsert()
    addId() {
      if (!this.id) {
        this.id = uuidv4();
      }
    }
}