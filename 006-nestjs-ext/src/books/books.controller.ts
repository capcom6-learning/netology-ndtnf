import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Res,
} from '@nestjs/common';
import { BooksService } from './books.service';
import { Book } from './book.dto';
import { Response } from 'express';

@Controller('books')
export class BooksController {
  constructor(private readonly booksService: BooksService) {}

  @Get()
  select() {
    return this.booksService.select();
  }

  @Get(':id')
  findById(@Param('id') id: string, @Res() res: Response) {
    const book = this.booksService.findById(id);
    if (!book) {
      res.status(404).end();
      return;
    }

    res.json(book).end();
  }

  @Post()
  insert(@Body() book: Book) {
    return this.booksService.insert(book);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() book: Book) {
    return this.booksService.update(id, book);
  }

  @Delete(':id')
  delete(@Param('id') id: string) {
    return this.booksService.delete(id);
  }
}
