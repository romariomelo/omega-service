import { BaseEntity } from 'shared/base-entity';
import { Column, Entity, JoinColumn, OneToMany } from 'typeorm';
import { Proposta } from './proposta.entity';

@Entity()
export class Usuario extends BaseEntity {
  @Column({ type: 'uuid', unique: true })
  public public_id: string;

  @Column({ type: 'text' })
  public name: string;

  @Column({ type: 'text' })
  public email: string;

  @Column()
  private password: string;

  @OneToMany(() => Proposta, (proposta) => proposta.usuario)
  public propostas: Proposta[];
}
