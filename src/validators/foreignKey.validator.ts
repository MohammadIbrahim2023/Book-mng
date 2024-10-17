import { Injectable } from '@nestjs/common';
import {
  ValidationArguments,
  ValidationOptions,
  ValidatorConstraint,
  ValidatorConstraintInterface,
  registerDecorator,
} from 'class-validator';
import { PrismaClient } from '@prisma/client';

export function ForeignKeyExist(
  entity: string,
  property: string,
  validationOptions?: ValidationOptions,
) {
  return function (object: any, propertyName: string) {
    registerDecorator({
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      validator: IsForeignKeyExistConstraint,
      constraints: [entity, property],
    });
  };
}

@ValidatorConstraint({ name: 'isForeignKeyExist', async: true })
@Injectable()
export class IsForeignKeyExistConstraint
  implements ValidatorConstraintInterface
{
  prisma = new PrismaClient();

  async validate(value: string, args: ValidationArguments) {
    const entity = args.constraints[0];
    const property = args.constraints[1];
    if (value) {
      const user = await this.prisma.$executeRawUnsafe(
        `SELECT id FROM ${entity} WHERE ${property} = ${value}`,
      );
      return user ? true : false;
    }
  }

  defaultMessage() {
    return '$property does not exist';
  }
}
