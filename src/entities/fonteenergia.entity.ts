import { BaseEntity } from 'shared/base-entity';
import { Column, Entity } from 'typeorm';

@Entity({ name: 'TB_FONTE_ENERGIA' })
export class FonteEnergia extends BaseEntity {
  @Column({ name: 'DS_DESCRICAO', type: 'varchar' })
  public descricao: string;

  @Column({ name: 'VL_VALOR', type: 'numeric', precision: 17, scale: 2 })
  public valor: number;
}
