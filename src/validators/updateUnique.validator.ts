import { BadRequestException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
export const UpdateUniqueValidator = async (
  ids: number,
  entity: string,
  properties: {},
) => {
  const prisma = new PrismaService();
  const result: any[] = [];
  for (const p in properties) {
    const uniques = await prisma[entity].findUnique({
      where: { [p]: properties[p] },
    });
    if (uniques != null && uniques?.id !== ids) {
      result.push(`${p} ${properties[p]} already exist.`);
    }
  }
  if (result.length > 0) {
    throw new BadRequestException({
      statusCode: 400,
      message: result,
      error: 'Bad Request',
    });
  }
};
