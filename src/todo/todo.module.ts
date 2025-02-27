import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TodoController } from './todo.controller';
import { TodoService } from './todo.service';
import { Todo } from './entities/todo.entity';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { join } from 'path';

@Module({
  imports: [TypeOrmModule.forFeature([Todo]) ,    
   ClientsModule.register([
        {
          name: 'COLLEAGUE_TODO_PACKAGE',
          transport: Transport.GRPC,
          options: {
            package: 'todo',
            protoPath: join(__dirname, '../../../proto/colleague.proto'),
            url: 'https://nest-grpc-s9ah.onrender.com:443', // CHANGE THIS TO YOUR COLLEAGUE'S SERVER
          },
        },
      ]),],
 
  controllers: [TodoController],
  providers: [TodoService],
})
export class TodoModule {}