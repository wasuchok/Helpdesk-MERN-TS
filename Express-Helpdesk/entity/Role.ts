import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn } from "typeorm"

@Entity()
export class Role {
    @PrimaryGeneratedColumn()
    RoleID!: number

    @Column()
    RoleName!: string

}