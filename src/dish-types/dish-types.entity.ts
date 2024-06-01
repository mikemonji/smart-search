import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity('dish-types')
export class DishType {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;
}
