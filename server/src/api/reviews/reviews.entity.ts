import { Entity, Column, PrimaryGeneratedColumn, BaseEntity, ManyToOne } from "typeorm"
import { User } from "../users/users.entity";
import { Book } from "../books/books.entity";

@Entity()
export class Review extends BaseEntity {
    @PrimaryGeneratedColumn("increment")
    id: number;

    @ManyToOne(() => User, (user) => user.reviews, { onDelete: "CASCADE" })
    user: User;

    @ManyToOne(() => Book, (book) => book.reviews, { onDelete: "CASCADE" })
    book: Book;

    @Column("bigint")
    reviewDate: number;

    @Column("int")
    rating: number;
    
    @Column("varchar")
    comment: string;
}