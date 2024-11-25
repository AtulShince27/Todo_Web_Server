import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';
import * as dotenv from 'dotenv';
// import * as express from 'express';
// import { ExpressAdapter } from '@nestjs/platform-express';

// Load environment variables from .env file
dotenv.config();

const bootstrapLocal = async () => {
  const app = await NestFactory.create(AppModule);
  const configService = app.get(ConfigService);
  const port = configService.get('PORT');

  app.enableCors({
    origin: ['https://todo-web-app-zeta.vercel.app', 'http://localhost:3000'],
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
    credentials: true,
  });

  await app.listen(port);
  console.log(`Application is running on: ${await app.getUrl()}`);
};

bootstrapLocal();
