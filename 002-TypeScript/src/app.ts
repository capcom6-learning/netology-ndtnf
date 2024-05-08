interface Book {
    id: string;
    title: string;
    description: string;
    authors: string;
    favorite: boolean;
    fileCover?: string;
    fileName?: string;
}

abstract class BooksRepository {
    abstract createBook(book: Book): void;
    abstract getBook(id: string): Book;
    abstract getBooks(): Book[];
    abstract updateBook(id: string, book: Book): void;
    abstract deleteBook(id: string): void;
}

//
const book: Book = {
    id: "1",
    title: "War and Peace",
    description: "War and Peace is a novel by Leo Tolstoy",
    authors: "Leo Tolstoy",
    favorite: true,
    fileCover: "https://upload.wikimedia.org/wikipedia/commons/2/2a/T25-011.jpg",
    fileName: "War and Peace.txt"
};

console.log(book);
