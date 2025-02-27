import { DataSource } from 'typeorm';
import { Todo } from './src/todo/entities/todo.entity';

export const AppDataSource = new DataSource({
  type: 'mysql',
  host: 'mysql.railway.internal',
  port: 3306,
  username: 'root',
  password: 'kSXtAIvGqstMsgvJMCQEqgPlLmDLghHy',
  database: 'railway',
  entities: [Todo],
  migrations: ['src/migrations/*.ts'],
  synchronize: false,
});