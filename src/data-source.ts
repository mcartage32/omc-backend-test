import 'dotenv/config';
import { DataSource } from 'typeorm';
import { Lead } from './leads/leads.entity';

export default new DataSource({
  type: 'postgres',
  host: process.env.DB_HOST,
  port: 5432,
  username: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  entities: [Lead],
  migrations: ['src/migrations/*.ts'],
});
