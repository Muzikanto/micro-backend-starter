import { Payload } from '@nestjs/microservices';
import { ValidationPipe } from '@nestjs/common';

export const Args = () =>
  Payload(
    new ValidationPipe({
      whitelist: true,
      transform: true,
      forbidNonWhitelisted: true,
    })
  );
