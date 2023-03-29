import { Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const logger = new Logger('bootstrap');

  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix('api/v1');
  app.enableCors();

  const PORT = process.env.PORT || 3000;

  await app.listen(PORT);
  logger.log(`Application running on PORT::>> ${PORT}`);
}
bootstrap();
