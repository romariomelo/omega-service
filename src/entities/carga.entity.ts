import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Carga {
  @PrimaryGeneratedColumn()
  public id: number;

  @Column()
  public nome_empresa: string;

  @Column()
  public consumo: number;
}
