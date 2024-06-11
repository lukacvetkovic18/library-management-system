import { AppDataSource } from "../../data-source";
import loansCtrl from "./loans.ctrl";
import { addLoanSchema, changeLoanStatusSchema, getAllLoansSchema, getLoanByIdSchema, getUsersLoanByIdSchema, getUsersLoansSchema, loanBookSchema, removeLoanSchema, updateLoanSchema } from "./loans.schema";

export default async (fastify, opts) => {
    const loanController = loansCtrl(fastify);

    // Admin routes_________________________________________________________________________________________________________________________________
    fastify.route({
        method: "GET",
        url: "/api/admin/loans",
        preValidation: fastify.adminACL,
        handler: (await loanController).getAllLoans,
        schema: getAllLoansSchema
    });

    fastify.route({
        method: "GET",
        url: "/api/admin/loans/:loanId",
        preValidation: fastify.adminACL,
        handler: (await loanController).getLoanById,
        schema: getLoanByIdSchema
    });

    fastify.route({
        method: "POST",
        url: "/api/admin/loans",
        preValidation: fastify.adminACL,
        handler: (await loanController).addLoan,
        schema: addLoanSchema
    });

    fastify.route({
        method: "DELETE",
        url: "/api/admin/loans/:loanId",
        preValidation: fastify.adminACL,
        handler: (await loanController).removeLoan,
        schema: removeLoanSchema
    });

    fastify.route({
        method: "PUT",
        url: "/api/admin/loans",
        preValidation: fastify.adminACL,
        handler: (await loanController).updateLoan,
        schema: updateLoanSchema
    });

    fastify.route({
        method: "PUT",
        url: "/api/admin/loans/status",
        preValidation: fastify.adminACL,
        handler: (await loanController).changeLoanStatus,
        schema: changeLoanStatusSchema
    });

    // User routes_________________________________________________________________________________________________________________________________
    fastify.route({
        method: "GET",
        url: "/api/loans",
        preValidation: fastify.userACL,
        handler: (await loanController).getUsersLoans,
        schema: getUsersLoansSchema
    });

    fastify.route({
        method: "GET",
        url: "/api/loans/:loanId",
        preValidation: fastify.userACL,
        handler: (await loanController).getUsersLoanById,
        schema: getUsersLoanByIdSchema
    });

    fastify.route({
        method: "POST",
        url: "/api/loans",
        preValidation: fastify.userACL,
        handler: (await loanController).loanBook,
        schema: loanBookSchema
    });

}