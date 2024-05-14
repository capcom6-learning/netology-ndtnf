import { BooksRepository } from "../repositories/books";

import container from "../container";
const books = container.get(BooksRepository);

import { CounterService } from "./counter";

export interface Book {
    title: string;
    description: string;
    authors: string;
    favorite: boolean;
    fileCover?: string;
    fileName?: string;
    fileBook?: string;
}

export interface SavedBook extends Book {
    id: string;
}

export interface BookWithViews extends SavedBook {
    views: number;
}

// class Book {
//     constructor({ id, title, description, authors, favorite, fileCover, fileName, fileBook }) {
//         this.id = id;
//         this.title = title;
//         this.description = description;
//         this.authors = authors;
//         this.favorite = favorite;
//         this.fileCover = fileCover;
//         this.fileName = fileName;
//         this.fileBook = fileBook;
//     }
// }

const select = async (): Promise<BookWithViews[]> => {
    const items = await books.select();

    return Promise.all(items.map(async (book) => {
        const count = await CounterService.get(book.id);
        return {
            id: book._id,
            title: book.title,
            description: book.description,
            authors: book.authors,
            favorite: book.favorite,
            fileCover: book.fileCover,
            fileName: book.fileName,
            fileBook: book.fileBook,
            views: count,
        };
    }));
}

export interface GetOptions {
    incrCounter?: boolean;
}

const get = async (id: string, options: GetOptions = {}): Promise<BookWithViews> => {
    const { incrCounter = false } = options;

    const book = await books.get(id);
    if (!book) {
        throw new Error("Book not found");
    }

    const count = incrCounter
        ? await CounterService.incr(book.id)
        : await CounterService.get(book.id);

    return {
        id: book._id,
        title: book.title,
        description: book.description,
        authors: book.authors,
        favorite: book.favorite,
        fileCover: book.fileCover,
        fileName: book.fileName,
        fileBook: book.fileBook,
        views: count,
    };
}

const insert = async (book: Book): Promise<BookWithViews> => {
    const savedBook = await books.insert(book);
    return { ...savedBook, id: savedBook._id, views: 0 };
}

const update = async (id: string, book: Book): Promise<BookWithViews> => {
    const newBook = await books.update(id, book);
    const count = await CounterService.get(id);

    return { ...newBook, views: count, id: newBook._id };
}

const remove = async (id: string) => {
    return await books.remove(id);
}

export const BooksService = {
    select: select,
    get: get,
    insert: insert,
    update: update,
    remove: remove,
}