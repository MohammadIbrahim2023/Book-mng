import { HttpException } from '@nestjs/common';

export function catch_respone(err: any) {
  const prod: boolean = process.env.IS_PRODUCTION === 'true';
  console.log('ERROR', err);
  if (prod) throw new HttpException('Serve Error', 500);
  else throw new HttpException(err.message, 500);
}
