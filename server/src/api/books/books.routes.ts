import booksCtrl from "./books.ctrl";
import { addBookSchema, getBooksSchema, getBookByIdSchema, removeBookSchema, updateBookSchema, getBookAttributesSchema, getBookSuggestionsSchema } from "./books.schema";

export default async (fastify, opts) => {
    const bookController = booksCtrl(fastify);

    fastify.route({
        method: "GET",
        url: "/api/books",
        preValidation: fastify.userACL,
        handler: (await bookController).getBooks,
        schema: getBooksSchema
    });

    fastify.route({
        method: "GET",
        url: "/api/books/name-suggestions",
        preValidation: fastify.userACL,
        handler: (await bookController).getBookNameSuggestions,
        schema: getBookSuggestionsSchema
    });

    fastify.route({
        method: "GET",
        url: "/api/books/author-suggestions",
        preValidation: fastify.userACL,
        handler: (await bookController).getBookAuthorSuggestions,
        schema: getBookSuggestionsSchema
    });

    fastify.route({
        method: "GET",
        url: "/api/books/:bookId",
        preValidation: fastify.userACL,
        handler: (await bookController).getBookById,
        schema: getBookByIdSchema
    });

    fastify.route({
        method: "POST",
        url: "/api/admin/books",
        preValidation: fastify.adminACL,
        handler: (await bookController).addBook,
        schema: addBookSchema
    });

    fastify.route({
        method: "DELETE",
        url: "/api/admin/books/:bookId",
        preValidation: fastify.adminACL,
        handler: (await bookController).removeBook,
        schema: removeBookSchema
    });

    fastify.route({
        method: "PUT",
        url: "/api/admin/books",
        preValidation: fastify.adminACL,
        handler: (await bookController).updateBook,
        schema: updateBookSchema
    });

    fastify.route({
        method: "GET",
        url: "/api/books/formats",
        preValidation: fastify.userACL,
        handler: (await bookController).getBookFormats,
        schema: getBookAttributesSchema
    });

    fastify.route({
        method: "GET",
        url: "/api/books/categories",
        preValidation: fastify.userACL,
        handler: (await bookController).getBookCategories,
        schema: getBookAttributesSchema
    });
}