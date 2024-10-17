import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import { IsNotEmpty, IsNumber, IsString } from 'class-validator';
import { ForeignKeyExist } from 'src/validators/foreignKey.validator';
import { UniqueConstraint } from 'src/validators/unique.validator';

export class CreateBookDto {
  @ApiProperty({ required: true })
  @IsNotEmpty()
  @IsString()
  @Transform(({ value }) => value.trim())
  title: string;

  @ApiProperty({ required: true })
  @IsNotEmpty()
  @IsString()
  @Transform(({ value }) => value.trim())
  @UniqueConstraint('books', true)
  isbn: string;

  @ApiProperty({ required: true })
  @IsNotEmpty()
  @IsNumber()
  @Transform(({ value }) => +value)
  @ForeignKeyExist('authors', 'id')
  author_id: number;
}
