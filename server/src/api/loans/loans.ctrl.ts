import { LoanRepository } from "./loans.repo";

export default async (server) => {
    const lR = LoanRepository;

    // Admin routes_________________________________________________________________________________________________________________________________
    const getAllLoans = async (req, reply) => {
        try {
            return await lR.getAllLoans(req.query);
        }
        catch(e){
            return server.httpErrors.createError(500, e);
        }
    };

    const getLoanById = async (req, reply) => {
        try {
            return await lR.getLoanById(req.params.loanId);
        }
        catch(e){
            return server.httpErrors.createError(500, e);
        }
    };

    const addLoan = async (req, reply) => {
        try {
            return await lR.addLoan(req.body);
        }
        catch(e){
            return server.httpErrors.createError(500, e);
        }
    };

    const removeLoan = async (req, reply) => {
        try {
            return await lR.removeLoan(req.params.loanId);
        }
        catch(e){
            return server.httpErrors.createError(500, e);
        }
    };

    const updateLoan = async (req, reply) => {
        try {
            return await lR.updateLoan(req.body);
        }
        catch(e){
            return server.httpErrors.createError(500, e);
        }
    };

    const changeLoanStatus = async (req, reply) => {
        try {
            return await lR.changeLoanStatus(req.body.loanId, req.body.loanStatus);
        }
        catch(e){
            return server.httpErrors.createError(500, e);
        }
    };

    // User routes_________________________________________________________________________________________________________________________________
    const getUsersLoans = async (req, reply) => {
        try {
            return await lR.getUsersLoans(req.user.id);
        }
        catch(e){
            return server.httpErrors.createError(500, e);
        }
    };

    const getUsersLoanById = async (req, reply) => {
        try {
            return await lR.getUsersLoanById(req.user.id, req.params.loanId);
        }
        catch(e){
            return server.httpErrors.createError(500, e);
        }
    };

    const loanBook = async (req, reply) => {
        try {
            return await lR.loanBook(req.user.id, req.body.bookId);
        }
        catch(e){
            return server.httpErrors.createError(500, e);
        }
    };

    const canLoanBook = async (req, reply) => {
        try {
            return await lR.canLoanBook(req.user.id, req.params.bookId);
        }
        catch(e){
            return server.httpErrors.createError(500, e);
        }
    };

    return {
        getAllLoans,
        getLoanById,
        addLoan,
        removeLoan,
        updateLoan,
        changeLoanStatus,
        getUsersLoans,
        getUsersLoanById,
        loanBook,
        canLoanBook
    };
}