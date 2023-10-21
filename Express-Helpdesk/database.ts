
import { createConnection } from 'typeorm';

export const connectDatabase = async () => {
  await createConnection({
    type: 'mysql',
    host: 'localhost',
    port: 3306,
    username: 'root',
    password: '',
    database: 'helpdesk',
    entities: ['entity/*.ts'],
    synchronize: true, // Set to false in production
  });
};
