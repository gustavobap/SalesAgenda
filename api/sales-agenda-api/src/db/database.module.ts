import { Module } from '@nestjs/common';
import { Client, ClientConfig } from 'pg'

const connectionParameters: ClientConfig = {
  host: process.env.DB_HOST,
  port: parseInt(process.env.DB_PORT || '5432'),
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME
};

@Module({
  providers: [
    {
      provide: 'DB_CLIENT',
      useFactory: async () => {
        const client = new Client(connectionParameters);
        await client.connect();
        return client;
      }
    }
  ],
  exports: ['DB_CLIENT']
})
export class DatabaseModule {}