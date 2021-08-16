import { BaseEntity } from 'shared/base-entity';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToOne
} from 'typeorm';
import { FonteEnergia } from './fonteenergia.entity';
import { Submercado } from './submercado.entity';
import { Usuario } from './usuario.entity';

@Entity({ name: "TB_PROPOSTA" })
export class Proposta extends BaseEntity {
  @Column({ type: 'uuid', unique: true })
  public public_id: string;

  @Column({ name: "DT_INICIO", type: 'timestamp' })
  public data_inicio: Date;

  @Column({ name: "DT_FIM", type: 'timestamp' })
  public data_fim: Date;

  @OneToOne(() => FonteEnergia)
  @JoinColumn()
  public fonte_energia: FonteEnergia;

  @OneToOne(() => Submercado)
  @JoinColumn()
  public submercado: Submercado;

  @Column({ name: "VL_CONSUMO_TOTAL", type: 'numeric' })
  public consumo_total: number;

  @Column({ name: "BOOL_CONTRATADO", type: 'bool' })
  public contratado: boolean;

  @Column({ name: "VL_PROPOSTA", type: 'numeric' })
  public valor_proposta: number;

  @ManyToOne(() => Usuario, (usuario) => usuario.propostas, {
    onDelete: 'RESTRICT',
    onUpdate: 'RESTRICT',
    eager: true,
  })
  @JoinColumn()
  public usuario: Usuario;
}
