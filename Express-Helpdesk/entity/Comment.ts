import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn } from "typeorm"

@Entity()
export class Comment {
    @PrimaryGeneratedColumn()
    CommentID!: number

    @Column()
    TicketID!: number

    @Column()
    UserID!: number

    @Column()
    CommentText!: string

    @CreateDateColumn()
    CommentDate!: Date

}