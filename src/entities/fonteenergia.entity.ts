import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class FonteEnergia {
  @PrimaryGeneratedColumn()
  public id: number;

  @Column()
  public descricao: string;

  @Column()
  public valor: number;
}
