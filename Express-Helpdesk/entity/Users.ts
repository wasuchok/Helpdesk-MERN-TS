import { Entity, PrimaryGeneratedColumn, Column } from "typeorm"

@Entity()
export class Users {
    @PrimaryGeneratedColumn()
    UserID!: number

    @Column()
    Username!: string

    @Column()
    Password!: string

    @Column()
    Email!: string

    @Column()
    Role!: number
    
}