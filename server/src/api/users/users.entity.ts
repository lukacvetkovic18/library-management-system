import { Entity, Column, PrimaryGeneratedColumn, BeforeInsert, CreateDateColumn, BaseEntity, OneToMany, BeforeUpdate, AfterUpdate } from "typeorm"
import * as bcrypt from "bcryptjs";
import { Loan } from "../loans/loans.entity";
import { Review } from "../reviews/reviews.entity";

@Entity()
export class User extends BaseEntity {
    @PrimaryGeneratedColumn("increment")
    id: number;

    @OneToMany(() => Loan, (loan) => loan.user, { cascade: true })
    loans: Loan[];

    @OneToMany(() => Review, (review) => review.user, { cascade: true })
    reviews: Review[];

    // @OneToMany(() => Notification, (notification) => notification.user, { cascade: true })
    // notifications: Notification[];

    @Column("varchar")
    firstName: string;

    @Column("varchar")
    lastName: string;

    @Column("varchar", { unique: true })
    username: string;

    @Column("varchar", { unique: true })
    email: string;

    @Column("varchar")
    password: string;

    @Column("varchar", { nullable: true })
    phone: string;

    @Column("varchar", { nullable: true })
    address: string;

    @CreateDateColumn()
    registrationDate: Date;

    @Column("longtext", { default: null })
    imagePath: string;

    @Column("boolean", { default: false })
    isAdmin: boolean;

    @Column("int", { default: 3 })
    loansLeft: number;

    @BeforeInsert()
    async hashPassword(){
        if (this.password) {
            this.password = await bcrypt.hash(this.password, 10);
        }
    }
    async comparePassword(attempt: string) : Promise <boolean> {
        return await bcrypt.compare(attempt, this.password);
    }
}