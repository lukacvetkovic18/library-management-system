import { AppDataSource } from "../../data-source";
import { Book } from "../books/books.entity";
import { User } from "../users/users.entity";
import { Loan, LoanStatus } from "./loans.entity";

const _lR = AppDataSource.getRepository(Loan);
const _uR = AppDataSource.getRepository(User);
const _bR = AppDataSource.getRepository(Book);

export const LoanRepository = AppDataSource.getRepository(Loan).extend({
    
    // Admin routes_________________________________________________________________________________________________________________________________
    async getAllLoans(query) {
        const take = query.take || 50
        const skip = query.skip || 0
        return await _lR.find({
            relations: {
                user: true,
                book: true
            },
            take: take,
            skip: skip
        });
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
        const user = await _uR.findOne({ where: { id: loanData.userId }});
        let book = await _bR.findOne({ where: { id: loanData.bookId }});
        book.availableCopies--;
        await _bR.save(book);

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
            },
            where: {
                id: loanId
            }});
        let book = await _bR.findOne({ where: { id: loan.book.id }})
        if(loanStatus === "completed") {
            loan.returnDate = new Date().getTime();
        }
        if(loanStatus === "completed" || loanStatus === "canceled") {
            book.availableCopies++;
            await _bR.save(book);
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
        const user = await _uR.findOne({ where: { id: userId }});
        let book = await _bR.findOne({ where: { id: bookId }});

        const issueDate = new Date();
        const dueDate = new Date(issueDate);
        dueDate.setDate(dueDate.getDate() + 30);
        
        book.availableCopies--;
        await _bR.save(book);

        return await _lR.save(_lR.create({
            user: user,
            book: book,
            issueDate: issueDate.getTime(),
            dueDate: dueDate.getTime()
        }));
    },

});