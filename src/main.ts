import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { join } from 'path';

async function bootstrap() {
  const HTTP_PORT = process.env.HTTP_PORT || 3000;  
  const GRPC_PORT = process.env.GRPC_PORT || 50052; 

  // Create REST API server
  const app = await NestFactory.create(AppModule);
  app.enableCors();
  await app.listen(HTTP_PORT);

  // Create gRPC microservice
  const grpcApp = await NestFactory.createMicroservice<MicroserviceOptions>(AppModule, {
    transport: Transport.GRPC,
    options: {
      package: 'todo',
      protoPath: join(__dirname, '../../proto/todo.proto'),
      url: `localhost:${GRPC_PORT}`, 
    },
  });

  await grpcApp.listen();
}
bootstrap();