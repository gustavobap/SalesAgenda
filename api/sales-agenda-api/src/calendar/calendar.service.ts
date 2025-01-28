import { Inject, Injectable } from '@nestjs/common';
import { Client } from 'pg';
import { QueryAvailableSlotsFiltersDTO, QueryAvailableSlotsResultDTO } from './calendar.dto';

@Injectable()
export class CalendarService {

  constructor(
    @Inject('DB_CLIENT') private readonly client: Client,
  ) { }

  async queryAvailableSlots(filters: QueryAvailableSlotsFiltersDTO): Promise<QueryAvailableSlotsResultDTO> {

    const conditions = [
      'slots.booked = false',
      'slots.start_date >= $1',
      "slots.end_date < $1 + interval '1 day'"
    ]

    const params: Array<string | string[] | Date> = [filters.date]

    if (filters.products) {
      params.push(filters.products)
      conditions.push(`sales_managers.products @> $${params.length}`)
    }

    if (filters.language) {
      params.push(filters.language)
      conditions.push(`$${params.length}=ANY(sales_managers.languages)`)
    }

    if (filters.rating) {
      params.push(filters.rating)
      conditions.push(`$${params.length}=ANY(sales_managers.customer_ratings)`)
    }

    const query = `
      select slots.start_date, count(sales_managers.id)::INTEGER as available_count from slots 
      inner join sales_managers on slots.sales_manager_id = sales_managers.id
      where ${conditions.join(' and ')}
      and not exists (
        select 1 from slots as slots2 where 
        slots2.sales_manager_id = sales_managers.id and 
        slots2.booked = true and 
        slots.start_date < slots2.end_date and 
        slots2.start_date < slots.end_date 
      )
      group by (slots.start_date)
    `

    const result = await this.client.query(query, params);
    return result.rows as QueryAvailableSlotsResultDTO;
  }
}
