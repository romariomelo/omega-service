import { Exclude } from 'class-transformer';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export abstract class BaseEntity {
  @Exclude()
  @PrimaryGeneratedColumn()
  public id: number;

  @Exclude()
  @Column({
    default: () => 'CURRENT_TIMESTAMP',
    name: 'DT_CREATED_AT',
    type: 'timestamp',
  })
  public created_at: Date;
}
