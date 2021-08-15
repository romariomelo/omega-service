import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { FonteEnergia } from './fonteenergia.entity';
import { Submercado } from './submercado.entity';
import { Usuario } from './usuario.entity';

@Entity()
export class Proposta {
  @PrimaryGeneratedColumn()
  private id: number;

  @Column({ type: 'uuid', unique: true })
  public public_id: string;

  @Column()
  public data_inicio: Date;

  @Column()
  public data_fim: Date;

  @OneToOne(() => FonteEnergia)
  @JoinColumn()
  public fonte_energia: FonteEnergia;

  @OneToOne(() => Submercado)
  @JoinColumn()
  public submercado: Submercado;

  @Column()
  public consumo_total: number;

  @Column()
  public contratado: boolean;

  @Column()
  public valor_proposta: number;

  @ManyToOne(() => Usuario, (usuario) => usuario.propostas, {
    onDelete: 'RESTRICT',
    onUpdate: 'RESTRICT',
    eager: true,
  })
  @JoinColumn()
  public usuario: Usuario;

  @Column({ default: () => 'CURRENT_TIMESTAMP' })
  public created_at: Date;
}
