import { BaseEntity } from 'shared/base-entity';
import { Column, Entity } from 'typeorm';

@Entity()
export class FonteEnergia extends BaseEntity {
  @Column({ name: 'DS_DESCRICAO', type: 'text' })
  public descricao: string;

  @Column({ name: 'VL_VALOR', type: 'number' })
  public valor: number;
}
