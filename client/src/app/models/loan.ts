export interface Loan {
    id: number;
    userId: number;
    bookId: number;
    name: string;
    author: string;
    img_paths: string;
    username: string;
    issueDate: Date;
    dueDate: Date;
    returnDate: Date | null;
    loanStatus: string;
}