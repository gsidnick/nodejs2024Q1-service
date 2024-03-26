import { parse } from 'yaml';
import { join } from 'path';
import { readFile } from 'fs/promises';
import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';
import { PORT } from './constants';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const filename = join(__dirname, '../doc/api.yaml');
  const config = await readFile(filename, 'utf-8');
  const document = parse(config);
  SwaggerModule.setup('doc', app, document);
  app.useGlobalPipes(new ValidationPipe());
  await app.listen(PORT);
}

bootstrap();
