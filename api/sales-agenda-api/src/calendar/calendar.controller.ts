import { Controller, Get } from '@nestjs/common';
import { CalendarService, QueryAvailableSlotsFilters } from './calendar.service';

@Controller('calendar')
export class CalendarController {
  constructor(private readonly appService: CalendarService) {}

  @Get('query')
  async getHello() {

    const params: QueryAvailableSlotsFilters = {
      "date": new Date("2024-05-03"),
      "products": ["Heatpumps", "SolarPanels"],
      "language": "German",
      "rating": "Gold"
    }

    const availableSlots = await this.appService.queryAvailableSlots(params);

    return `<pre>${JSON.stringify(availableSlots, null, 2)}</pre>`;
  }
}
