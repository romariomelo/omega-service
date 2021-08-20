import { BaseEntity } from 'shared/base-entity';
import { ColumnNumericTransformer } from 'shared/Transformers/column-numeric.transformer';
import { Entity, Column } from 'typeorm';

@Entity({ name: 'TB_SUBMERCADO' })
export class Submercado extends BaseEntity {
  @Column({ name: 'DS_DESCRICAO', type: 'varchar' })
  public descricao: string;

  @Column({
    name: 'VL_VALOR',
    type: 'numeric',
    precision: 17,
    scale: 4,
    transformer: new ColumnNumericTransformer(),
  })
  public valor: number;
}
