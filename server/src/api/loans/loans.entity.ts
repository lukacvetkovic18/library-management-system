import { Entity, Column, PrimaryGeneratedColumn, BaseEntity, ManyToOne } from "typeorm"
import { User } from "../users/users.entity";
import { Book } from "../books/books.entity";

export enum LoanStatus {
    PENDING = 'pending',
    ACTIVE = 'active',
    COMPLETED = 'completed',
    CANCEL = 'canceled',
    OVERDUE = 'overdue',
}

@Entity()
export class Loan extends BaseEntity {
    @PrimaryGeneratedColumn("increment")
    id: number;

    @ManyToOne(() => User, (user) => user.loans, { onDelete: "CASCADE" })
    user: User;

    @ManyToOne(() => Book, (book) => book.loans, { onDelete: "CASCADE" })
    book: Book;

    @Column("bigint")
    issueDate: number;
    
    @Column("bigint")
    dueDate: number;

    @Column("bigint", { nullable: true })
    returnDate: number;

    @Column({
        type: 'enum',
        enum: LoanStatus,
        default: LoanStatus.PENDING,
    })
    loanStatus: LoanStatus;
}