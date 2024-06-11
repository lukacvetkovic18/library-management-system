import { BookRepository } from "./books.repo";

export default async (server) => {
    const bR = BookRepository;

    const getBooks = async (req, reply) => {
        try {
            return await bR.getBooks(req.query);
        }
        catch(e){
            return server.httpErrors.createError(500, e);
        }
    };

    const getBookById = async (req, reply) => {
        try {
            return await bR.getBookById(req.params.bookId);
        }
        catch(e){
            return server.httpErrors.createError(500, e);
        }
    };

    const addBook = async (req, reply) => {
        try {
            return await bR.addBook(req.body);
        }
        catch(e){
            return server.httpErrors.createError(500, e);
        }
    };

    const removeBook = async (req, reply) => {
        try {
            return await bR.removeBook(req.params.bookId);
        }
        catch(e){
            return server.httpErrors.createError(500, e);
        }
    };

    const updateBook = async (req, reply) => {
        try {
            return await bR.updateBook(req.body);
        }
        catch(e){
            return server.httpErrors.createError(500, e);
        }
    };

    return {
        getBooks,
        getBookById,
        addBook,
        removeBook,
        updateBook
    };
}