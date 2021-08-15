import { BaseEntity } from 'shared/base-entity';
import { Entity, Column } from 'typeorm';

@Entity({ name: "DB_SUBMERCADO" })
export class Submercado extends BaseEntity {
  @Column({ name: "DS_DESCRICAO", type: 'text' })
  public descricao: string;

  @Column({ name: "VL_VALOR", type: 'numeric' })
  public valor: number;
}
