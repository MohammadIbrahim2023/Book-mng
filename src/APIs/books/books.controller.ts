import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Put,
  Query,
} from '@nestjs/common';
import { BooksService } from './books.service';
import { CreateBookDto } from './dto/create-book.dto';
import { UpdateBookDto } from './dto/update-book.dto';
import { ApiResponse, ApiTags, getSchemaPath, ApiBody } from '@nestjs/swagger';
import { PaginationDto } from 'src/dtos/paginateDto.dto';
import { catch_respone } from 'src/helpers/response.helper';
import { BookEntity, BookWithMsgEntity } from './entities/book.entity';

@Controller('books')
@Controller('books')
@ApiTags('Books')
export class BooksController {
  constructor(private readonly booksService: BooksService) {}

  @ApiBody({
    type: CreateBookDto,
    description: 'Store book structure',
  })
  @ApiResponse({
    status: 200,
    type: BookEntity,
  })
  @Post()
  create(@Body() createBookDto: CreateBookDto) {
    try {
      return this.booksService.create(createBookDto);
    } catch (err) {
      catch_respone(err);
    }
  }

  @ApiResponse({
    status: 200,
    type: [BookEntity],
  })
  @Get()
  findAll(@Query() query: PaginationDto) {
    try {
      return this.booksService.findAll(query);
    } catch (err) {
      catch_respone(err);
    }
  }

  @ApiResponse({
    status: 200,
    type: BookEntity,
  })
  @Get(':id')
  findOne(@Param('id') id: string) {
    try {
      return this.booksService.findOne(+id);
    } catch (err) {
      catch_respone(err);
    }
  }

  @ApiResponse({
    status: 200,
    type: BookEntity,
  })
  @Put(':id')
  update(@Param('id') id: string, @Body() updateBookDto: UpdateBookDto) {
    try {
      return this.booksService.update(+id, updateBookDto);
    } catch (err) {
      catch_respone(err);
    }
  }

  @ApiResponse({
    status: 200,
    type: BookWithMsgEntity,
  })
  @Delete('softDelete/:id')
  remove(@Param('id') id: string) {
    try {
      return this.booksService.remove(+id);
    } catch (err) {
      catch_respone(err);
    }
  }

  @ApiResponse({
    status: 200,
    type: BookWithMsgEntity,
  })
  @Delete(':id')
  delete(@Param('id') id: string) {
    try {
      return this.booksService.delete(+id);
    } catch (err) {
      catch_respone(err);
    }
  }
}
