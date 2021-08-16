import { Column, Entity, PrimaryColumn } from 'typeorm'

@Entity()
export abstract class BaseEntity {
    @PrimaryColumn({ name: "ID", type: 'uidd' })
    public id: string

    @Column({ default: () => 'CURRENT_TIMESTAMP', name: "DT_CREATED_AT", type: 'timestamp' })
    public created_at: Date;
}