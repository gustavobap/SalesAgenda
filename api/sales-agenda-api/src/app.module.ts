import { Module } from '@nestjs/common';
import { CalendarModule } from './calendar/calendar.module';

@Module({
  imports: [CalendarModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
