import { AppDataSource } from "../../data-source";
import { Book } from "../books/books.entity";
import { Loan } from "../loans/loans.entity";
import { User } from "../users/users.entity";
import { Review } from "./reviews.entity";

const _rR = AppDataSource.getRepository(Review);
const _uR = AppDataSource.getRepository(User);
const _bR = AppDataSource.getRepository(Book);
const _lR = AppDataSource.getRepository(Loan);

export const ReviewRepository = AppDataSource.getRepository(Review).extend({
    
    // Admin routes_________________________________________________________________________________________________________________________________
    async getAllReviews(query: {
        take: number | null,
        skip: number | null,
        usernamePart: string | null,
        bookNamePart: string | null,
        sort: string | null,
    }) {
        const take = query.take || 50
        const skip = query.skip || 0
        let reviews = await _rR.find({
            relations: {
                user: true,
                book: true
            },
        });
        
        if(query.usernamePart) {
            const usernamePartLower = query.usernamePart.toLowerCase();
            reviews = reviews.filter(r => r.user.username.toLowerCase().includes(usernamePartLower));
        }
        if(query.bookNamePart) {
            const bookNamePartLower = query.bookNamePart.toLowerCase();
            reviews = reviews.filter(r => r.book.name.toLowerCase().includes(bookNamePartLower));
        }
        if (query.sort) {
            reviews = this.sortReviews(reviews, query.sort);
        }
        return reviews.slice(skip, skip + take);
    },

    sortReviews(reviews: Review[], sortKey: string): Review[] {
        switch (sortKey) {
            case 'Newest Review Date':
                return reviews.sort((a, b) => b.reviewDate - a.reviewDate);
            case 'Oldest Review Date':
                return reviews.sort((a, b) => a.reviewDate - b.reviewDate);
            default:
                return reviews;
        }
    },

    async getReviewById(reviewId: number) {
        return await _rR.findOne({
            relations: {
                user: true,
                book: true
            },
            where: {
                id: reviewId
            }
        });
    },

    async addReview(reviewData: {
        userId: number,
        bookId: number,
        rating: number,
        comment: string,
    }) {
        const existingReview = await _rR.findOne({
            where: {
                user: {
                    id: reviewData.userId
                },
                book: {
                    id: reviewData.bookId
                }
            }
        })
        if(existingReview !== null) {
            throw new Error("Review for that user and book already exists.");
        }
        const user = await _uR.findOne({ where: { id: reviewData.userId }});
        const book = await _bR.findOne({ where: { id: reviewData.bookId }});
        await _bR.save(book);

        return await _rR.save(_rR.create({
            user: user,
            book: book,
            reviewDate: Date.now(),
            rating: reviewData.rating,
            comment: reviewData.comment
        }));
    },
    
    async removeReview(reviewId: number) {
        await AppDataSource
            .createQueryBuilder()
            .delete()
            .from(Review)
            .where("id = :id", { id: reviewId })
            .execute()
        return { message: "Review successfuly removed."};
    },

    async updateReview(reviewData) {
        if (reviewData.userId) {
            reviewData.user = await _uR.findOne({ where: { id: reviewData.userId }});
        }
        if (reviewData.bookId) {
            reviewData.book = await _bR.findOne({ where: { id: reviewData.bookId }});
        }
        return await _rR.save(reviewData);
    },

    // User routes_________________________________________________________________________________________________________________________________
    async getUsersReviews(userId: number) {
        return await _rR.find({
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
                reviewDate: 'DESC'
            }
        });
    },

    async getUsersReviewById(userId: number, reviewId: number) {
        return await _rR.findOne({
            relations: {
                user: true,
                book: true
            },
            where: {
                id: reviewId,
                user: {
                    id: userId
                } 
            }
        });
    },

    async reviewBook(
        userId: number, 
        reviewData: {
            bookId: number,
            rating: number,
            comment: string,
        }
    ) {
        const existingReview = await _rR.findOne({
            where: {
                user: {
                    id: userId
                },
                book: {
                    id: reviewData.bookId
                },
            }
        })
        if(existingReview !== null) {
            throw new Error("Review for that user and book already exists.");
        }
        const user = await _uR.findOne({ where: { id: userId }});
        const book = await _bR.findOne({ where: { id: reviewData.bookId }});

        return await _rR.save(_rR.create({
            user: user,
            book: book,
            reviewDate: Date.now(),
            rating: reviewData.rating,
            comment: reviewData.comment
        }));
    },

    async editBookReview(userId: number, reviewData) {
        const review = await _rR.findOne({
            where: {
                id: reviewData.id,
                user: {
                    id: userId
                }
            }
        });
        if(!review) {
            throw new Error("Review doesn't exist");
        }
        return await _rR.save(reviewData);
    },

    async removeBookReview(userId: number, reviewId: number) {
        const review = await _rR.findOne({
            where: {
                id: reviewId,
                user: {
                    id: userId
                }
            }
        });
        if(!review) {
            throw new Error("Review doesn't exist");
        }
        await _rR.remove(review);
        return { message: "Review successfuly removed." };
    },

    async getReviewsOfBook(bookId: number) {
        return await _rR.find({
            relations: {
                user: true,
                book: true
            },
            where: {
                book: {
                    id: bookId
                } 
            },
            order: {
                reviewDate: 'DESC'
            }
        });
    },

    async canReviewBook(userId: number, bookId: number) {
        const review = await _rR.findOne({
            where: {
                user: {
                    id: userId
                },
                book: {
                    id: bookId
                }
            }
        });
        if (review) {
            return {
                flag: false, 
                message: "You can't review the same book twice."
            };
        }
        const loan = await _lR.findOne({
            where: {
                user: {
                    id: userId
                },
                book: {
                    id: bookId
                }
            }
        });
        if (!loan) {
            return {
                flag: false, 
                message: "You can't review the book you haven't loaned yet."
            };
        }
        return {
            flag: true, 
            message: "You can review the book."
        };
    },
});