import { Injectable } from '@nestjs/common';
import { BookDto } from './book.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Book } from './schemas/book.schema';

@Injectable()
export class BooksService {
  protected books: Map<string, BookDto>;

  constructor(
    @InjectModel('Book') private readonly bookModel: Model<Book>
  ) {
    this.books = new Map();
  }

  select() {
    return Array.from(this.books.values());
  }

  findById(id: string) {
    return this.books.get(id);
  }

  insert(book: BookDto) {
    book.id = String(this.books.size + 1);

    this.books.set(book.id, book);
  }

  update(id: string, book: BookDto) {
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
