import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity('diets')
export class Diet {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;
}
