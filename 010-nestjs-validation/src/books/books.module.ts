import { Module } from '@nestjs/common';
import { BooksController } from './books.controller';
import { BooksService } from './books.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Book, BookModel } from './models/book.model';

@Module({
  imports: [MongooseModule.forFeature([{ name: Book.name, schema: BookModel }])],
  controllers: [BooksController],
  providers: [BooksService],
  exports: [],
})
export class BooksModule { }
