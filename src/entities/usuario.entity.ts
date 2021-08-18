import { Exclude } from 'class-transformer';
import { BaseEntity } from 'shared/base-entity';
import { Column, Entity, OneToMany } from 'typeorm';
import { Proposta } from './proposta.entity';

@Entity({ name: 'TB_USUARIO' })
export class Usuario extends BaseEntity {
  @Column({ type: 'uuid', unique: true })
  public public_id: string;

  @Column({ name: 'DS_NOME', type: 'varchar' })
  public name: string;

  @Column({ name: 'DS_EMAIL', type: 'varchar' })
  public email: string;

  @Exclude()
  @Column({ name: 'SENHA', type: 'varchar' })
  public senha: string;

  @OneToMany(() => Proposta, (proposta) => proposta.usuario)
  public propostas: Proposta[];
}
