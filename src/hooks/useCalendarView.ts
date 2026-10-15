import { useState } from 'react';
import { dayjs, Dayjs } from '../utils/dateUtils';

export type CalendarViewMode = 'date' | 'month' | 'year';

export function useCalendarView(initialDate?: Dayjs | null) {
  const [viewDate, setViewDate] = useState<Dayjs>(() => initialDate || dayjs());
  const [viewMode, setViewMode] = useState<CalendarViewMode>('date');

  const prevMonth = () => setViewDate((d) => d.subtract(1, 'month'));
  const nextMonth = () => setViewDate((d) => d.add(1, 'month'));

  const prevYear = () => setViewDate((d) => d.subtract(1, 'year'));
  const nextYear = () => setViewDate((d) => d.add(1, 'year'));

  const prevDecade = () => setViewDate((d) => d.subtract(10, 'year'));
  const nextDecade = () => setViewDate((d) => d.add(10, 'year'));

  const selectMonth = (monthIndex: number) => {
    setViewDate((d) => d.month(monthIndex));
    setViewMode('date');
  };

  const selectYear = (year: number) => {
    setViewDate((d) => d.year(year));
    setViewMode('month');
  };

  return {
    viewDate,
    setViewDate,
    viewMode,
    setViewMode,
    prevMonth,
    nextMonth,
    prevYear,
    nextYear,
    prevDecade,
    nextDecade,
    selectMonth,
    selectYear,
  };
}
