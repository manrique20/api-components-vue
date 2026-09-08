import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import type { INestApplication } from '@nestjs/common';
import type { AbstractHttpAdapter } from '@nestjs/core';
import { AppModule } from './app.module.js';

// Config compartida entre el arranque local (main.ts, con app.listen()) y el
// handler serverless de Vercel (api/index.ts, que solo hace app.init()).
export async function createApp(httpAdapter?: AbstractHttpAdapter): Promise<INestApplication> {
  const app = httpAdapter
    ? await NestFactory.create(AppModule, httpAdapter)
    : await NestFactory.create(AppModule);

  app.enableCors({ origin: process.env.FRONTEND_URL ?? 'http://localhost:5173' });
  app.useGlobalPipes(new ValidationPipe({ whitelist: true }));

  return app;
}
