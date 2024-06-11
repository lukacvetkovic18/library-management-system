import booksCtrl from "./books.ctrl";
import { addBookSchema, getBooksSchema, getBookByIdSchema, removeBookSchema, updateBookSchema } from "./books.schema";

export default async (fastify, opts) => {
    const bookController = booksCtrl(fastify);

    fastify.route({
        method: "GET",
        url: "/api/books",
        // preValidation: fastify.userACL,
        handler: (await bookController).getBooks,
        schema: getBooksSchema
    });

    fastify.route({
        method: "GET",
        url: "/api/books/:bookId",
        // preValidation: fastify.userACL,
        handler: (await bookController).getBookById,
        schema: getBookByIdSchema
    });

    fastify.route({
        method: "POST",
        url: "/api/books",
        // preValidation: fastify.userACL,
        handler: (await bookController).addBook,
        schema: addBookSchema
    });

    fastify.route({
        method: "DELETE",
        url: "/api/books/:bookId",
        // preValidation: fastify.userACL,
        handler: (await bookController).removeBook,
        schema: removeBookSchema
    });

    fastify.route({
        method: "PUT",
        url: "/api/books",
        // preValidation: fastify.userACL,
        handler: (await bookController).updateBook,
        schema: updateBookSchema
    });
}