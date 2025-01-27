import { Inject, Injectable } from '@nestjs/common';
import { Client } from 'pg';

@Injectable()
export class AppService {
  
  constructor(
    @Inject('DB_CLIENT') private readonly client: Client,
  ) {}

  async getHello() {
    const result = await this.client.query("select * from sales_managers");
    return `<pre>${JSON.stringify(result.rows, null, 2)}</pre>`;
  }
}
