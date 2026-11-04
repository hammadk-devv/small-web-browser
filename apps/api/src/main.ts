// apps/api/src/main.ts
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Enable CORS so our Next.js frontend (running on a different port) can call the API
  app.enableCors({
    origin: 'http://localhost:3000', // Next.js default port
    credentials: true,
  });

  const port = process.env.PORT || 3001;
  await app.listen(port);

  console.log(`🚀 API is running on: http://localhost:${port}`);
}

bootstrap();