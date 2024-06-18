import { Entity, Column, PrimaryGeneratedColumn, BaseEntity, OneToMany } from "typeorm"
import { Loan } from "../loans/loans.entity";
import { Review } from "../reviews/reviews.entity";

@Entity()
export class Book extends BaseEntity {
    @PrimaryGeneratedColumn("increment")
    id: number;

    @OneToMany(() => Loan, (loan) => loan.book, { cascade: true })
    loans: Loan[];

    @OneToMany(() => Review, (review) => review.book, { cascade: true })
    reviews: Review[];

    @Column("varchar")
    name: string;

    @Column("varchar")
    author: string;

    @Column("varchar")
    format: string;

    @Column("float")
    book_depository_stars: number;

    @Column("float")
    price: number;

    @Column("varchar")
    isbn: string;

    @Column("varchar")
    category: string;

    @Column("varchar")
    img_paths: string;

    @Column("int", { default: 10 })
    totalCopies: number;

    @Column("int", { default: 10 })
    availableCopies: number;
}