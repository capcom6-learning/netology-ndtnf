import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { BookCommentsService } from './book-comments.service';
import { BooksController } from './books.controller';
import { BooksService } from './books.service';
import { BookComment } from './models/book-comment.model';
import { Book, BookModel } from './models/book.model';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Book.name, schema: BookModel },
      { name: BookComment.name, schema: BookComment },
    ])
  ],
  controllers: [BooksController],
  providers: [BooksService, BookCommentsService],
  exports: [],
})
export class BooksModule { }
