import { ApiProperty } from '@nestjs/swagger';

export class BookEntity {
  @ApiProperty()
  id: number;

  @ApiProperty()
  title: string;

  @ApiProperty()
  isbn: string;

  @ApiProperty()
  author_id: number;

  @ApiProperty()
  author: Author;
}

interface Author {
  id: number;
  name: string;
}

export class BookWithMsgEntity extends BookEntity {
  @ApiProperty({ required: true })
  message: string;
}
