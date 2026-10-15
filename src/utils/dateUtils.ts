import dayjs, { Dayjs } from 'dayjs';
import customParseFormat from 'dayjs/plugin/customParseFormat';
import isSameOrBefore from 'dayjs/plugin/isSameOrBefore';
import isSameOrAfter from 'dayjs/plugin/isSameOrAfter';

dayjs.extend(customParseFormat);
dayjs.extend(isSameOrBefore);
dayjs.extend(isSameOrAfter);

export { dayjs, Dayjs };

export const WEEKDAYS = ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'];

export const MONTHS = [
  'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
  'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'
];

export interface CalendarCell {
  date: Dayjs;
  isCurrentMonth: boolean;
  isToday: boolean;
}

/**
 * Safely parses a value into a Dayjs instance.
 */
export function toDayjs(val?: Dayjs | string | number | Date | null, format?: string): Dayjs | null {
  if (!val) return null;
  if (dayjs.isDayjs(val)) return val.isValid() ? val : null;
  const parsed = format ? dayjs(val, format) : dayjs(val);
  return parsed.isValid() ? parsed : null;
}

/**
 * Formats a Dayjs instance.
 */
export function formatDayjs(val?: Dayjs | null, format: string = 'YYYY-MM-DD'): string {
  if (!val || !val.isValid()) return '';
  return val.format(format);
}

/**
 * Generates 42 days (6 weeks) for a given month view, including overflow from prev/next months.
 */
export function generateMonthMatrix(viewDate: Dayjs): CalendarCell[] {
  const startOfMonth = viewDate.startOf('month');
  const startDayOfWeek = startOfMonth.day(); // 0 is Sunday
  const startDate = startOfMonth.subtract(startDayOfWeek, 'day');
  const today = dayjs();

  const cells: CalendarCell[] = [];
  for (let i = 0; i < 42; i++) {
    const current = startDate.add(i, 'day');
    cells.push({
      date: current,
      isCurrentMonth: current.month() === viewDate.month(),
      isToday: current.isSame(today, 'day'),
    });
  }

  return cells;
}

/**
 * Generates a 12-year window around a given year (1 year before decade, 10 years in decade, 1 year after).
 */
export function generateDecadeYears(year: number): { year: number; isCurrentDecade: boolean }[] {
  const decadeStart = Math.floor(year / 10) * 10;
  const start = decadeStart - 1;
  const years = [];

  for (let i = 0; i < 12; i++) {
    const currentYear = start + i;
    years.push({
      year: currentYear,
      isCurrentDecade: currentYear >= decadeStart && currentYear < decadeStart + 10,
    });
  }

  return years;
}

/**
 * Range checking utilities
 */
export function isSameDay(d1?: Dayjs | null, d2?: Dayjs | null): boolean {
  if (!d1 || !d2) return false;
  return d1.isSame(d2, 'day');
}

export function isDateInRange(
  date: Dayjs,
  start?: Dayjs | null,
  end?: Dayjs | null,
  includeEnds = true
): boolean {
  if (!start || !end) return false;
  const [s, e] = start.isAfter(end) ? [end, start] : [start, end];

  if (includeEnds) {
    return date.isSameOrAfter(s, 'day') && date.isSameOrBefore(e, 'day');
  }
  return date.isAfter(s, 'day') && date.isBefore(e, 'day');
}
