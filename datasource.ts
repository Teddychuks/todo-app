import { DataSource } from 'typeorm';
import { Todo } from './src/todo/entities/todo.entity';
import 'dotenv/config';


export const AppDataSource = new DataSource({
  type: 'mysql',
  host: process.env.MYSQLHOST,
  port: parseInt(process.env.MYSQLPORT || '3306'),
  username: process.env.MYSQLUSER,
  password: process.env.MYSQLPASSWORD,
  database: process.env.MYSQLDATABASE,
  entities: [Todo],
  migrations: ['src/migrations/*.ts'],
  synchronize: true,
});