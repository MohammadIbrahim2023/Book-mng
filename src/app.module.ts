import { Module } from '@nestjs/common';
import { BooksModule } from './APIs/books/books.module';
import { PrismaModule } from './prisma/prisma.module';

@Module({
  imports: [BooksModule, PrismaModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
