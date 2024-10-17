import { Injectable } from '@nestjs/common';
import { CreateBookDto } from './dto/create-book.dto';
import { UpdateBookDto } from './dto/update-book.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { PaginationDto } from 'src/dtos/paginateDto.dto';
import { UpdateUniqueValidator } from 'src/validators/updateUnique.validator';

@Injectable()
export class BooksService {
  constructor(private prisma: PrismaService) {}
  create = (dto: CreateBookDto) =>
    this.prisma.books
      .create({ data: { ...dto } })
      .then((res) => this.findOne(res?.id))
      .catch((err) => {
        console.log('Error:', err);
      });

  findAll = async (query: PaginationDto) => {
    const { page: offset, per_page: limit } = query;

    return await Promise.all([
      this.prisma.books.count(),
      this.prisma.books.findMany({
        skip: (offset - 1) * limit,
        take: limit,
        orderBy: { created_at: 'desc' },
        where: { deleted_at: null },
        include: { authors: { select: { name: true } } },
      }),
    ])
      .then(([total, data]) => ({
        result: data ? true : false,
        page: offset,
        per_page: limit,
        total,
        data,
      }))
      .catch((err) => {
        console.log('Error:', err);
      });
  };

  findOne = (id: number) =>
    this.prisma.books
      .findUnique({
        where: { id },
        include: { authors: { select: { name: true } } },
      })
      .then((data) => ({ result: data ? true : false, data }))
      .catch((err) => {
        console.log('ERROR:', err);
      });

  update = async (id: number, dto: UpdateBookDto) => {
    return await this.prisma.books
      .update({ where: { id }, data: { ...dto } })
      .then((res) => this.findOne(res?.id))
      .catch((err) => {
        console.log('Error:', err);
      });
  };

  remove = async (id: number) => {
    return await this.prisma.books
      .update({ where: { id }, data: { deleted_at: new Date() } })
      .then((res) => ({
        ...this.findOne(res?.id),
        message: 'Soft Deleted successfully.',
      }))
      .catch((err) => {
        console.log('Error:', err);
      });
  };

  delete = (id: number) =>
    this.prisma.books
      .delete({ where: { id } })
      .then((data) => ({
        message: 'Deleted successfully.',
        result: data ? true : false,
        data,
      }))
      .catch((err) => {
        console.log('Error:', err);
      });
}
