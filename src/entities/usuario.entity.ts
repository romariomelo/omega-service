import { BaseEntity } from 'shared/base-entity';
import {
  Column,
  Entity,
  JoinColumn,
  OneToMany,
} from 'typeorm';
import { Proposta } from './proposta.entity';

@Entity({ name: "DB_USUARIO" })
export class Usuario extends BaseEntity {
  @Column({ type: 'uuid', unique: true })
  public public_id: string;

  @Column({ name: "DS_NOME", type: 'text' })
  public name: string;

  @Column({ name: "DS_EMAIL", type: 'text' })
  public email: string;

  @OneToMany(() => Proposta, (proposta) => proposta.usuario,)
  public propostas: Proposta[];
}
