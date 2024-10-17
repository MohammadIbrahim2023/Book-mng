import { Injectable } from '@nestjs/common';
import {
  ValidationArguments,
  ValidationOptions,
  ValidatorConstraint,
  ValidatorConstraintInterface,
  registerDecorator,
} from 'class-validator';

import { PrismaClient } from '@prisma/client';

export function UniqueConstraint(
  entity: string,
  isString: boolean = false,
  validationOptions?: ValidationOptions,
) {
  return function (object: any, propertyName: string) {
    registerDecorator({
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      validator: IsUniqueConstraint,
      constraints: [entity, isString],
    });
  };
}

@ValidatorConstraint({ name: 'isUnique', async: true })
@Injectable()
export class IsUniqueConstraint implements ValidatorConstraintInterface {
  prisma = new PrismaClient();
  async validate(value: string, args: ValidationArguments) {
    const entity = args.constraints[0];
    const isString = args.constraints[1];
    const property = args.property;

    if (value) {
      let q = `SELECT id FROM ${entity} WHERE ${property} = ${value} `;
      if (isString) {
        q = `SELECT id FROM ${entity} WHERE LOWER(${property}) = LOWER('${value}') `;
      }
      const rs: any[] = await this.prisma.$queryRawUnsafe(q);
      return rs.length > 0 ? false : true;
    }
  }

  defaultMessage() {
    return '$property $value is already exist';
  }
}
