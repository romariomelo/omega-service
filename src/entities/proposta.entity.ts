import { BaseEntity } from 'shared/base-entity';
import {
  Column,
  Entity,
  JoinColumn,
  JoinTable,
  ManyToMany,
  ManyToOne,
} from 'typeorm';
import { Carga } from './carga.entity';
import { FonteEnergia } from './fonteenergia.entity';
import { Submercado } from './submercado.entity';
import { Usuario } from './usuario.entity';

@Entity({ name: 'TB_PROPOSTA' })
export class Proposta extends BaseEntity {
  @Column({ type: 'uuid', unique: true })
  public public_id: string;

  @Column({ name: 'DT_INICIO', type: 'timestamp' })
  public data_inicio: Date;

  @Column({ name: 'DT_FIM', type: 'timestamp' })
  public data_fim: Date;

  @ManyToOne(() => FonteEnergia, {
    onDelete: 'RESTRICT',
    onUpdate: 'RESTRICT',
    eager: true,
  })
  @JoinColumn()
  public fonte_energia: FonteEnergia;

  @ManyToOne(() => Submercado, {
    onDelete: 'RESTRICT',
    onUpdate: 'RESTRICT',
    eager: true,
  })
  @JoinColumn()
  public submercado: Submercado;

  @ManyToMany(() => Carga, (carga) => carga.propostas, {
    cascade: ['insert', 'update'],
    eager: true,
  })
  @JoinTable()
  public cargas: Carga[];

  @Column({
    name: 'VL_CONSUMO_TOTAL',
    type: 'numeric',
    precision: 17,
    scale: 4,
  })
  public consumo_total: number;

  @Column({ name: 'BOOL_CONTRATADO', type: 'bool' })
  public contratado: boolean;

  @Column({ name: 'VL_PROPOSTA', type: 'numeric', precision: 17, scale: 4 })
  public valor_proposta: number;

  @ManyToOne(() => Usuario, {
    onDelete: 'RESTRICT',
    onUpdate: 'RESTRICT',
    eager: true,
    cascade: ['insert', 'update'],
  })
  @JoinColumn()
  public usuario: Usuario;
}
