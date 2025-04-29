import { DataSource } from 'typeorm';
import { User } from '../User/User.entity';

export const AppDataSource = new DataSource({
  type: 'sqlite',
  database: 'src/database/app.db',
  entities: [User],
  migrations: ['src/migrations/*.ts'],
  synchronize: false,
});
