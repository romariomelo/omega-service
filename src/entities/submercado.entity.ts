import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Submercado {
  @PrimaryGeneratedColumn()
  public id: number;

  @Column()
  public descricao: string;

  @Column()
  public valor: number;
}
