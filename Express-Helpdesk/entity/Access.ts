import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn } from "typeorm"

@Entity()
export class Access {
    @PrimaryGeneratedColumn()
    ID!: number

    @Column()
    Role_ID_Array!: string

}