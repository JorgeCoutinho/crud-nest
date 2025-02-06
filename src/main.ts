import { NestFactory } from '@nestjs/core';
import { AppModule } from './app/app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true, // remove chaves que não estão no DTO
      forbidNonWhitelisted: true, // retorna erro se tiver chaves não permitidas
      transform: false, // transforma os dados para o tipo especificado no DTO
    }),
  );

  await app.listen(process.env.PORT ?? 4000);
}
bootstrap();
