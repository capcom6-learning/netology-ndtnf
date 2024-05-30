import {
  BadRequestException,
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  NotFoundException,
  Param,
  Patch,
  Post,
  Put,
  Res,
} from '@nestjs/common';
import { BooksService } from './books.service';
import { BookDto, CreateBookDto, ReplaceBookDto, UpdateBookDto } from './book.dto';
import { Response } from 'express';
import mongoose from 'mongoose';

@Controller('books')
export class BooksController {
  constructor(private readonly booksService: BooksService) { }

  @Get()
  async select() {
    return await this.booksService.select();
  }

  @Get(':id')
  async findById(@Param('id') id: string) {
    const book = await this.booksService.findById(id);
    if (!book) {
      throw new NotFoundException('Book not found');
    }

    return book
  }

  @Post()
  @HttpCode(201)
  async insert(@Body() book: CreateBookDto) {
    try {
      return await this.booksService.insert(book);
    } catch (error) {
      if (error instanceof mongoose.Error.ValidationError) {
        throw new BadRequestException(error);
      }

      throw error;
    }
  }

  @Put(':id')
  async replace(@Param('id') id: string, @Body() book: ReplaceBookDto) {
    try {
      const newBook = await this.booksService.replace(id, book);
      if (!newBook) {
        throw new NotFoundException('Book not found');
      }
      return newBook;
    } catch (error) {
      if (error instanceof mongoose.Error.ValidationError) {
        throw new BadRequestException(error);
      }

      throw error;
    }
  }

  @Delete(':id')
  @HttpCode(204)
  async delete(@Param('id') id: string) {
    await this.booksService.delete(id);
  }
}
