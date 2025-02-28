// Code generated by protoc-gen-ts_proto. DO NOT EDIT.
// versions:
//   protoc-gen-ts_proto  v2.6.1
//   protoc               v5.29.3
// source: proto/colleague.proto

/* eslint-disable */
import { GrpcMethod, GrpcStreamMethod } from "@nestjs/microservices";
import { Observable } from "rxjs";

export const protobufPackage = "todo";

export interface Empty {
}

export interface Todo {
  id: string;
  title: string;
  completed: boolean;
}

export interface CreateTodoDto {
  title: string;
}

export interface Todos {
  todos: Todo[];
}

export interface UpdateTodoDto {
  id: string;
  title: string;
  completed: boolean;
}

export interface TodoByIdDto {
  id: string;
}

export const TODO_PACKAGE_NAME = "todo";

export interface ColleagueTodoServiceClient {
  createTodo(request: CreateTodoDto): Observable<Todo>;

  getTodos(request: Empty): Observable<Todos>;

  getTodoById(request: TodoByIdDto): Observable<Todo>;

  updateTodoById(request: UpdateTodoDto): Observable<Empty>;

  deleteTodoById(request: TodoByIdDto): Observable<Empty>;
}

export interface ColleagueTodoServiceController {
  createTodo(request: CreateTodoDto): Promise<Todo> | Observable<Todo> | Todo;

  getTodos(request: Empty): Promise<Todos> | Observable<Todos> | Todos;

  getTodoById(request: TodoByIdDto): Promise<Todo> | Observable<Todo> | Todo;

  updateTodoById(request: UpdateTodoDto): Promise<Empty> | Observable<Empty> | Empty;

  deleteTodoById(request: TodoByIdDto): Promise<Empty> | Observable<Empty> | Empty;
}

export function ColleagueTodoServiceControllerMethods() {
  return function (constructor: Function) {
    const grpcMethods: string[] = ["createTodo", "getTodos", "getTodoById", "updateTodoById", "deleteTodoById"];
    for (const method of grpcMethods) {
      const descriptor: any = Reflect.getOwnPropertyDescriptor(constructor.prototype, method);
      GrpcMethod("ColleagueTodoService", method)(constructor.prototype[method], method, descriptor);
    }
    const grpcStreamMethods: string[] = [];
    for (const method of grpcStreamMethods) {
      const descriptor: any = Reflect.getOwnPropertyDescriptor(constructor.prototype, method);
      GrpcStreamMethod("ColleagueTodoService", method)(constructor.prototype[method], method, descriptor);
    }
  };
}

export const COLLEAGUE_TODO_SERVICE_NAME = "ColleagueTodoService";
