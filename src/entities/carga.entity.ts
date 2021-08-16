import { BaseEntity } from 'shared/base-entity';
import { Column, Entity } from 'typeorm';

@Entity()
export class Carga extends BaseEntity {
  @Column({ name: 'DS_NOME_EMPRESA', type: 'text' })
  public nome_empresa: string;

  @Column({ name: 'DS_CONSUMO', type: 'numeric' })
  public consumo: number;
}
