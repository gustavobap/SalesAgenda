import { Body, Controller, Get, HttpCode, Post } from '@nestjs/common';
import { QueryAvailableSlotsFiltersDTO } from './calendar.dto';
import { CalendarService } from './calendar.service';

@Controller('calendar')
export class CalendarController {

  constructor(private readonly calendarService: CalendarService) {}

  @Post('query')
  @HttpCode(200)
  async query(@Body() filters: QueryAvailableSlotsFiltersDTO) {
    return this.calendarService.queryAvailableSlots(filters);
  }
}
