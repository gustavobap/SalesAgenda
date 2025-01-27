import { Inject, Injectable } from '@nestjs/common';
import { Client } from 'pg';

export interface QueryAvailableSlotsFilters {
  date: Date,
  products: Array<"Heatpumps" | "SolarPanels">,
  language: "German" | "English",
  rating: "Gold" | "Silver" | "Bronze"
}

export type QueryAvailableSlotsResult = Array<{
  start_date: string,
  available_count: number
}>

@Injectable()
export class CalendarService {
  
  constructor(
    @Inject('DB_CLIENT') private readonly client: Client,
  ) {}

  async queryAvailableSlots(params: QueryAvailableSlotsFilters): Promise<QueryAvailableSlotsResult> {

    const query = `
      select slots.start_date, count(sales_managers.id) as available_count from slots 
      inner join sales_managers on slots.sales_manager_id = sales_managers.id
      where 
        slots.booked = false and
        slots.start_date >= $1 and
        slots.end_date < $1 + interval '1 day' and
        sales_managers.products @> $2 and
        $3=ANY(sales_managers.languages) and
        $4=ANY(sales_managers.customer_ratings)
      group by (slots.start_date)
    `

    const result = await this.client.query(query, [params.date, params.products, params.language, params.rating]);
    return result.rows as QueryAvailableSlotsResult;
  }
}
