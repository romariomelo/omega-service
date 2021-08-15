import {
  Column,
  Entity,
  JoinColumn,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Proposta } from './proposta.entity';

@Entity()
export class Usuario {
  @PrimaryGeneratedColumn()
  private id: number;

  @Column({ type: 'uuid', unique: true })
  public public_id: string;

  @Column()
  public name: string;

  @Column()
  public email: string;

  @Column({ default: () => 'CURRENT_TIMESTAMP' })
  public created_at: Date;

  @OneToMany(() => Proposta, (proposta) => proposta.usuario)
  public propostas: Proposta[];
}
