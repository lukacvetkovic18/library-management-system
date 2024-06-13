import { AppDataSource } from "../../data-source";
import { Book } from "./books.entity";

const _bR = AppDataSource.getRepository(Book);

export const BookRepository = AppDataSource.getRepository(Book).extend({

    async getBooks(query: {
        take: number | null,
        skip: number | null,
        categories: string[] | null,
        formats: string[] | null,
        namePart: string | null,
        authorPart: string | null,
        sort: string | null,
    }) {
        const take = query.take || 50
        const skip = query.skip || 0
        let books = await _bR.find();
        if(query.categories) {
            books = books.filter(b => query.categories.includes(b.category));
        }
        if(query.formats) {
            books = books.filter(b => query.formats.includes(b.format));
        }
        if(query.namePart) {
            const namePartLower = query.namePart.toLowerCase();
            books = books.filter(b => b.name.toLowerCase().includes(namePartLower));
        }
        if(query.authorPart) {
            const authorPartLower = query.authorPart.toLowerCase();
            books = books.filter(b => b.author.toLowerCase().includes(authorPartLower));
        }
        if (query.sort) {
            books = this.sortBooks(books, query.sort);
        }
        return books.slice(skip, skip + take);
    },

    sortBooks(books: Book[], sortKey: string): Book[] {
        switch (sortKey) {
            case 'A-Z':
                return books.sort((a, b) => a.name.localeCompare(b.name));
            case 'Z-A':
                return books.sort((a, b) => b.name.localeCompare(a.name));
            case 'Highest price':
                return books.sort((a, b) => b.price - a.price);
            case 'Lowest price':
                return books.sort((a, b) => a.price - b.price);
            case 'Highest book_depository_stars':
                return books.sort((a, b) => b.book_depository_stars - a.book_depository_stars);
            case 'Lowest book_depository_stars':
                return books.sort((a, b) => a.book_depository_stars - b.book_depository_stars);
            default:
                return books;
        }
    },

    async getBookNameSuggestions(namePart: string) {
        const books = await _bR.find();
        const namePartLower = namePart.toLowerCase();
        const suggestions = books
            .map(b => b.name)
            .filter(name => name.toLowerCase().includes(namePartLower));
        return [...new Set(suggestions)].slice(0, 10);
    },

    async getBookAuthorSuggestions(namePart: string) {
        const books = await _bR.find();
        const namePartLower = namePart.toLowerCase();
        const suggestions = books
            .map(b => b.author)
            .filter(author => author.toLowerCase().includes(namePartLower));
        return [...new Set(suggestions)].slice(0, 10);
    },

    async getBookById(bookId: number) {
        return await _bR.findOne({
            where: {
                id: bookId
            }
        });
    },

    async addBook(bookData: {
        name: string,
        author: string,
        format: string,
        book_depository_stars: number,
        price: number,
        isbn: string,
        category: string,
        img_paths: string
    }) {
        return await _bR.save(_bR.create(bookData));
    },
    
    async removeBook(bookId: number) {
        await AppDataSource
            .createQueryBuilder()
            .delete()
            .from(Book)
            .where("id = :id", { id: bookId })
            .execute()
        return { message: "Book successfuly removed."};
    },

    async updateBook(bookData) {
        return await _bR.save(bookData);
    },

    async getBookFormats() {
        const formats =  await _bR
            .createQueryBuilder("book")
            .select("DISTINCT(book.format)", "format")
            .orderBy("book.format", "ASC")
            .getRawMany();
            
        return formats.map(formatObj => formatObj.format);
    },

    async getBookCategories() {
        const categories =  await _bR
            .createQueryBuilder("book")
            .select("DISTINCT(book.category)", "category")
            .orderBy("book.category", "ASC")
            .getRawMany();
            
        return categories.map(categoryObj => categoryObj.category);
    },

});