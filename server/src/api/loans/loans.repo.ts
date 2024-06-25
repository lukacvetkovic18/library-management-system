import { AppDataSource } from "../../data-source";
import { Book } from "../books/books.entity";
import { Notification } from "../notifications/notifications.entity";
import { User } from "../users/users.entity";
import { Loan, LoanStatus } from "./loans.entity";

const _lR = AppDataSource.getRepository(Loan);
const _uR = AppDataSource.getRepository(User);
const _bR = AppDataSource.getRepository(Book);
const _nR = AppDataSource.getRepository(Notification);

export const LoanRepository = AppDataSource.getRepository(Loan).extend({
    
    // Admin routes_________________________________________________________________________________________________________________________________
    async getAllLoans(query: {
        take: number | null,
        skip: number | null,
        namePart: string | null,
        loanStatus: string | null,
        sort: string | null,
    }) {
        const take = query.take || 50
        const skip = query.skip || 0
        let loans = await _lR.find({
            relations: {
                user: true,
                book: true
            },
        });
        const statuses = ["overdue", "active", "completed", "canceled"];

        loans.sort((a, b) => {
            return statuses.indexOf(a.loanStatus) - statuses.indexOf(b.loanStatus);
        });
        
        if(query.namePart) {
            const namePartLower = query.namePart.toLowerCase();
            loans = loans.filter(l => l.user.username.toLowerCase().includes(namePartLower));
        }
        if(query.loanStatus) {
            loans = loans.filter(l => query.loanStatus === l.loanStatus);
        }
        if (query.sort) {
            loans = this.sortLoans(loans, query.sort);
        }
        return loans.slice(skip, skip + take);
    },

    sortLoans(loans: Loan[], sortKey: string): Loan[] {
        switch (sortKey) {
            case 'Newest Issue Date':
                return loans.sort((a, b) => b.issueDate - a.issueDate);
            case 'Oldest Issue Date':
                return loans.sort((a, b) => a.issueDate - b.issueDate);
            default:
                return loans;
        }
    },

    async getLoanById(loanId: number) {
        return await _lR.findOne({
            relations: {
                user: true,
                book: true
            },
            where: {
                id: loanId
            }
        });
    },

    async addLoan(loanData: {
        userId: number,
        bookId: number,
        issueDate: number,
        dueDate: number
    }) {
        const existingLoan = await _lR.findOne({
            where: {
                user: {
                    id: loanData.userId
                },
                book: {
                    id: loanData.bookId
                },
                loanStatus: LoanStatus.ACTIVE
            }
        })
        if(existingLoan !== null) {
            throw new Error("Loan for that user and book already exists.");
        }
        let user = await _uR.findOne({ where: { id: loanData.userId }});
        let book = await _bR.findOne({ where: { id: loanData.bookId }});
        book.availableCopies--;
        await _bR.save(book);
        user.loansLeft--;
        await _uR.save(user);

        return await _lR.save(_lR.create({
            user: user,
            book: book,
            issueDate: loanData.issueDate,
            dueDate: loanData.dueDate
        }));
    },
    
    async removeLoan(loanId: number) {
        await AppDataSource
            .createQueryBuilder()
            .delete()
            .from(Loan)
            .where("id = :id", { id: loanId })
            .execute()
        return { message: "Loan successfuly removed."};
    },

    async updateLoan(loanData) {
        if (loanData.userId) {
            loanData.user = await _uR.findOne({ where: { id: loanData.userId }});
        }
        if (loanData.bookId) {
            loanData.book = await _bR.findOne({ where: { id: loanData.bookId }});
        }
        return await _lR.save(loanData);
    },

    async changeLoanStatus(loanId: number, loanStatus) {
        let loan = await _lR.findOne({
            relations: {
                book: true,
                user: true
            },
            where: {
                id: loanId
            }});
        let book = await _bR.findOne({ where: { id: loan.book.id }})
        let user = await _uR.findOne({ where: { id: loan.user.id }})
        if(loanStatus === "completed") {
            loan.returnDate = new Date().getTime();
        }
        if(loanStatus === "completed" || loanStatus === "canceled") {
            book.availableCopies++;
            user.loansLeft++;
            await _bR.save(book);
            await _uR.save(user);
            await _nR.save(_nR.create({
                user: user,
                notificationDate: new Date().getTime(),
                title: `Loan ${loanStatus}`,
                content: `Your loan for book ${book.name} has been ${loanStatus}.`
            }));
        }
        if(loanStatus === "overdue") {
            await _nR.save(_nR.create({
                user: user,
                notificationDate: new Date().getTime(),
                title: `Loan marked as ${loanStatus}`,
                content: `Your loan for book ${book.name} has been marekd as ${loanStatus}. Please contact the administrator to settle overdue costs.`
            }));
        }
        loan.loanStatus = loanStatus;
        return await _lR.save(loan);
    },

    // User routes_________________________________________________________________________________________________________________________________
    async getUsersLoans(userId: number) {
        return await _lR.find({
            relations: {
                user: true,
                book: true
            },
            where: {
                user: {
                    id: userId
                } 
            },
            order: {
                issueDate: 'DESC'
            }
        });
    },

    async getUsersLoanById(userId: number, loanId: number) {
        return await _lR.findOne({
            relations: {
                user: true,
                book: true
            },
            where: {
                id: loanId,
                user: {
                    id: userId
                } 
            }
        });
    },

    async loanBook(userId: number, bookId: number) {
        const existingLoan = await _lR.findOne({
            where: {
                user: {
                    id: userId
                },
                book: {
                    id: bookId
                },
                loanStatus: LoanStatus.ACTIVE
            }
        })
        if(existingLoan !== null) {
            throw new Error("Loan for that user and book already exists.");
        }
        let user = await _uR.findOne({ where: { id: userId }});
        let book = await _bR.findOne({ where: { id: bookId }});

        const issueDate = new Date();
        const dueDate = new Date(issueDate);
        dueDate.setDate(dueDate.getDate() + 30);
        
        book.availableCopies--;
        await _bR.save(book);
        user.loansLeft--;
        await _uR.save(user);
        await _nR.save(_nR.create({
            user: user,
            notificationDate: new Date().getTime(),
            title: `Loan successful`,
            content: `Your loan for book ${book.name} has been activated. Please return the book to the library in 30 days from now.`
        }));

        return await _lR.save(_lR.create({
            user: user,
            book: book,
            issueDate: issueDate.getTime(),
            dueDate: dueDate.getTime()
        }));
    },

    async canLoanBook(userId: number, bookId: number) {
        const loan = await _lR.findOne({
            where: {
                user: {
                    id: userId
                },
                book: {
                    id: bookId
                },
                loanStatus: LoanStatus.ACTIVE
            }
        });
        if (loan) {
            return {
                flag: false, 
                message: "You already have an active loan for this book."
            };
        }
        const user = await _uR.findOne({ where: { id: userId }});
        if (user.loansLeft <= 0) {
            return {
                flag: false, 
                message: "You can't loan more than 3 books at the time."
            };
        }
        const overdueLoan = await _lR.findOne({
            where: {
                user: {
                    id: userId
                },
                loanStatus: LoanStatus.OVERDUE
            }
        });
        if (overdueLoan) {
            return {
                flag: false, 
                message: "You can't loan a book until you settle overdue loans."
            };
        }
        return {
            flag: true, 
            message: "You can loan the book."
        };
    },

});