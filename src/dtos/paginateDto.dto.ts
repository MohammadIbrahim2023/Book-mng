import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import { IsNumber, IsOptional } from 'class-validator';

interface ToNumberOptions {
  default?: number;
  min?: number;
  max?: number;
}

export function toNumber(value: string, opts: ToNumberOptions = {}): number {
  let newValue: number = Number.parseInt(value || String(opts.default), 10);

  if (Number.isNaN(newValue)) {
    newValue = opts.default;
  }

  if (opts.min) {
    if (newValue < opts.min) {
      newValue = opts.min;
    }
    if (newValue > opts.max) {
      newValue = opts.max;
    }
  }
  return newValue;
}

export class PaginationDto {
  @ApiProperty({ required: false, default: 10 })
  @IsNumber()
  @IsOptional()
  @Transform(({ value }) => toNumber(value, { default: 10, min: -1 }))
  per_page: number = 10;

  @ApiProperty({ required: false })
  @IsNumber()
  @Transform(({ value }) => toNumber(value, { default: 1, min: 1 }))
  @IsOptional()
  page: number = 1;
}
