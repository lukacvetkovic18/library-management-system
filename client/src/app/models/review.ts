export interface Review {
    id: number;
    userId: number;
    bookId: number;
    bookName: string;
    bookAuthor: string;
    bookImage: string;
    username: string;
    userImage: string;
    reviewDate: Date;
    rating: number;
    comment: string;
}