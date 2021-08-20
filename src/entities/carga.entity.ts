import { BaseEntity } from 'shared/base-entity';
import { ColumnNumericTransformer } from 'shared/Transformers/column-numeric.transformer';
import { Column, Entity, ManyToMany } from 'typeorm';
import { Proposta } from './proposta.entity';

@Entity({ name: 'TB_CARGA' })
export class Carga extends BaseEntity {
  @ManyToMany(() => Proposta, (proposta) => proposta.cargas, {
    cascade: ['insert', 'update'],
  })
  public propostas: number;

  @Column({ name: 'DS_NOME_EMPRESA', type: 'varchar' })
  public nome_empresa: string;

  @Column({
    name: 'DS_CONSUMO',
    type: 'numeric',
    precision: 17,
    scale: 4,
    transformer: new ColumnNumericTransformer(),
  })
  public consumo: number;
}
