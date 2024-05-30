import { Injectable } from '@nestjs/common';
import { Book } from './book.dto';

@Injectable()
export class BooksService {
  protected books: Map<string, Book> = new Map();

  select() {
    return Array.from(this.books.values());
  }

  findById(id: string) {
    return this.books.get(id);
  }

  insert(book: Book) {
    book.id = String(this.books.size + 1);

    this.books.set(book.id, book);
  }

  update(id: string, book: Book) {
    if (!this.books.has(id)) {
      return;
    }

    book.id = id;

    this.books.set(book.id, book);
  }

  delete(id: string) {
    this.books.delete(id);
  }
}
