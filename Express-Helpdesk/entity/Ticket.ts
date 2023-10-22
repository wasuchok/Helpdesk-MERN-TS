import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn } from "typeorm"

@Entity()
export class Ticket {
    @PrimaryGeneratedColumn()
    TicketID!: number

    @Column()
    Title!: string

    @Column()
    Description!: string

    @Column()
    Status!: string

    @Column()
    Priority!: string

    @Column()
    Image!: string

    @Column()
    RequesterID!: number

    @Column()
    AssigneeID!: number

    @CreateDateColumn()
    CreatedDate!: Date;
  
    @UpdateDateColumn()
    UpdatedDate!: Date;
}