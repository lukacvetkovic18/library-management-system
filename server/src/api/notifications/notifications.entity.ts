import { Entity, Column, PrimaryGeneratedColumn, BaseEntity, ManyToOne } from "typeorm"
import { User } from "../users/users.entity";
import { Book } from "../books/books.entity";

@Entity()
export class Notification extends BaseEntity {
    @PrimaryGeneratedColumn("increment")
    id: number;

    @ManyToOne(() => User, (user) => user.notifications, { onDelete: "CASCADE" })
    user: User;

    @Column("bigint")
    notificationDate: number;

    @Column("varchar")
    title: string;

    @Column("varchar")
    content: string;

    @Column("boolean", { default: false })
    isRead: boolean;
}