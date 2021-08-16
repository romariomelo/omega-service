import { BaseEntity } from 'shared/base-entity';
import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';
import { Proposta } from './proposta.entity';

@Entity({ name: 'TB_CARGA' })
export class Carga extends BaseEntity {
  @ManyToOne(() => Proposta, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
    eager: true,
  })
  @JoinColumn()
  public proposta: number;

  @Column({ name: 'DS_NOME_EMPRESA', type: 'varchar' })
  public nome_empresa: string;

  @Column({ name: 'DS_CONSUMO', type: 'numeric', precision: 17, scale: 4 })
  public consumo: number;
}
