import { Injectable, OnModuleInit, Inject } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DeleteResult, Repository, UpdateResult } from 'typeorm';
import { Todo } from './entities/todo.entity';
import { CreateTodoDto } from './dto/create-todo.dto';
import { ClientGrpc } from '@nestjs/microservices';
import { COLLEAGUE_TODO_SERVICE_NAME, ColleagueTodoServiceClient, Empty } from 'proto/colleague';
import { map, Observable } from 'rxjs';
import { QueryDeepPartialEntity } from 'typeorm/query-builder/QueryPartialEntity';

@Injectable()
export class TodoService implements OnModuleInit{
  private colleagueTodoService: ColleagueTodoServiceClient

 constructor(
    @Inject('COLLEAGUE_TODO_PACKAGE') private readonly colleagueClient: ClientGrpc, 
    @InjectRepository(Todo) private readonly todoRepository: Repository<Todo>,
  ) {
 }

  onModuleInit() {
    this.colleagueTodoService = this.colleagueClient.getService<ColleagueTodoServiceClient>(COLLEAGUE_TODO_SERVICE_NAME);
  }

  async create(createTodoDto: CreateTodoDto): Promise<Todo> {
    const todo = this.todoRepository.create(createTodoDto);
    return await this.todoRepository.save(todo);
  }

  // Get all todos
async findAll(): Promise<{ todos: Todo[] }> {
    const todos = await this.todoRepository.find();
    return { todos };
  }

  // Get a specific todo
async findOne(id: string): Promise<Todo | null> {
    const parsedId = parseInt(id, 10);
    return this.todoRepository.findOneBy({ id:parsedId });
  }

  // Update a todo
 async updateById(id: string, attr: QueryDeepPartialEntity<Todo>): Promise<UpdateResult> {
    const parsedId = parseInt(id, 10);
    return this.todoRepository.update(parsedId, attr);
  }

  // Delete a todo
async deleteById(id: string): Promise<DeleteResult> {
    const parsedId = parseInt(id, 10);
    return this.todoRepository.delete(parsedId);
  }

 createTodoInColleagueService(title: string): Observable<Todo> {
    return this.colleagueTodoService.createTodo({ title }).pipe(
      map(todo => ({
        ...todo,
        id: Number(todo.id),
      })),
    );
  }
  

  getTodosFromColleague(): Observable<{ todos: Todo[] }> {
    
    return this.colleagueTodoService.getTodos({} as Empty).pipe(
      map(response => ({
        todos: response.todos.map(todo => ({
          ...todo,
          id: Number(todo.id),
        })),
      })),
    );
  }

  getTodoByIdFromColleague(id: string): Observable<Todo> {
    return this.colleagueTodoService.getTodoById({ id }).pipe(
      map(todo => ({
        ...todo,
        id: Number(todo.id),
      })),
    );
  }
  

  updateTodoByIdInColleague(id: string, title: string, completed: boolean): Observable<Empty> {
    return this.colleagueTodoService.updateTodoById({ id, title, completed });
  }

  deleteTodoByIdInColleague(id: string): Observable<Empty> {
    return this.colleagueTodoService.deleteTodoById({ id });
  } 
}