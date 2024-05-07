const books = require("../repositories/books");

const counter = require("./counter");

class Book {
    constructor({ id, title, description, authors, favorite, fileCover, fileName, fileBook }) {
        this.id = id;
        this.title = title;
        this.description = description;
        this.authors = authors;
        this.favorite = favorite;
        this.fileCover = fileCover;
        this.fileName = fileName;
        this.fileBook = fileBook;
    }
}

const select = async () => {
    const items = (await books.select()).map((item) => new Book(item));

    return Promise.all(items.map(async (item) => {
        const count = await counter.get(item.id);
        return { ...item, views: count };
    }));
}

const get = async (id, options = {}) => {
    const { incrCounter = false } = options;

    const book = new Book(await books.get(id));
    const count = incrCounter
        ? await counter.incr(book.id)
        : await counter.get(book.id);

    return { ...book, views: count };
}

const insert = async (book) => {
    return new Book(await books.insert(book));
}

const update = async (id, book) => {
    const newBook = new Book(await books.update(id, book));
    const count = await counter.get(id);

    return { ...newBook, views: count };
}

const remove = async (id) => {
    return await books.remove(id);
}

module.exports = {
    select,
    get,
    insert,
    update,
    remove,
};