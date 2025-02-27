import { Controller, Get} from '@nestjs/common';
import { TodoService } from './todo.service';
import { CreateTodoDto, FindOneParamsDto } from './dto/create-todo.dto';
import { UpdateTodoDto } from './dto/update-todo.dto';
import { Todo } from './entities/todo.entity';
import { GrpcMethod } from '@nestjs/microservices';
import { DeleteResult, UpdateResult } from 'typeorm';
import { Empty } from 'proto/colleague';
import { Observable } from 'rxjs';

@Controller('todos')
export class TodoController {
  constructor(private readonly todoService: TodoService) {}

  @GrpcMethod('TodoService', 'CreateTodo')
  create( payload: CreateTodoDto): Promise<Todo> {
    return this.todoService.create(payload);
  }

  @GrpcMethod('TodoService', 'GetTodos')
  findAll(): Promise<{ todos: Todo[] }> {
    return this.todoService.findAll();
  }

@GrpcMethod('TodoService', 'GetTodoById')
    getTodoById(params: FindOneParamsDto): Promise<Todo | null> {
        return this.todoService.findOne(params.id);
    }

    @GrpcMethod('TodoService', 'UpdateTodoById')
    updateTodoById(payload: UpdateTodoDto): Promise<UpdateResult> {
        const attr = { title: payload.title, completed: payload.completed };
        return this.todoService.updateById(payload.id, attr);
    }

    @GrpcMethod('TodoService', 'DeleteTodoById')
    deleteTodoById(params: FindOneParamsDto): Promise<DeleteResult> {
        return this.todoService.deleteById(params.id);
    }

    @Get('/colleague')
    getTodosFromColleague(_: Empty): Observable<{ todos: Todo[] }> {
        return this.todoService.getTodosFromColleague();
    }
}

