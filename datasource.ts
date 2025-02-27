import { DataSource } from 'typeorm';
import { Todo } from './src/todo/entities/todo.entity';

export const AppDataSource = new DataSource({
  type: 'mysql',
  host: 'localhost',
  port: 3306,
  username: 'root',
  password: 'Teddychuks',
  database: 'todo_db',
  entities: [Todo],
  migrations: ['src/migrations/*.ts'],
  synchronize: false,
});