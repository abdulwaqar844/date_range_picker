import { describe, it, expect } from 'vitest';
import React from 'react';
import { render, screen } from '@testing-library/react';
import {
  DatePicker,
  TimePicker,
  DateTimePicker,
  DateRangePicker,
  DateTimeRangePicker,
  toDayjs,
  formatDayjs,
  generateMonthMatrix,
  generateDecadeYears,
  isDateInRange,
  dayjs,
} from '../src';

describe('Date & Utility Calculations', () => {
  it('correctly parses and formats dates', () => {
    const d = toDayjs('2026-10-15', 'YYYY-MM-DD');
    expect(d).not.toBeNull();
    expect(d?.year()).toBe(2026);
    expect(d?.month()).toBe(9); // 0-indexed October
    expect(d?.date()).toBe(15);
    expect(formatDayjs(d, 'YYYY/MM/DD')).toBe('2026/10/15');
  });

  it('generates 42 days for calendar month matrix', () => {
    const matrix = generateMonthMatrix(dayjs('2026-10-01'));
    expect(matrix.length).toBe(42);
    // At least one cell should be current month
    expect(matrix.some((c) => c.isCurrentMonth)).toBe(true);
  });

  it('generates 12 years for decade view', () => {
    const years = generateDecadeYears(2026);
    expect(years.length).toBe(12);
    expect(years.some((y) => y.year === 2026 && y.isCurrentDecade)).toBe(true);
  });

  it('calculates range inclusion accurately', () => {
    const start = dayjs('2026-10-01');
    const mid = dayjs('2026-10-05');
    const end = dayjs('2026-10-10');
    expect(isDateInRange(mid, start, end)).toBe(true);
    expect(isDateInRange(dayjs('2026-10-20'), start, end)).toBe(false);
  });
});

describe('Component Suite Rendering', () => {
  it('renders DatePicker with placeholder', () => {
    render(<DatePicker placeholder="Select a date" />);
    expect(screen.getByPlaceholderText('Select a date')).toBeDefined();
  });

  it('renders TimePicker with placeholder', () => {
    render(<TimePicker placeholder="Select a time" />);
    expect(screen.getByPlaceholderText('Select a time')).toBeDefined();
  });

  it('renders DateTimePicker with placeholder', () => {
    render(<DateTimePicker placeholder="Select date and time" />);
    expect(screen.getByPlaceholderText('Select date and time')).toBeDefined();
  });

  it('renders DateRangePicker with dual placeholders', () => {
    render(<DateRangePicker placeholder={['Check-in', 'Check-out']} />);
    expect(screen.getByPlaceholderText('Check-in')).toBeDefined();
    expect(screen.getByPlaceholderText('Check-out')).toBeDefined();
  });

  it('renders DateTimeRangePicker with dual placeholders', () => {
    render(<DateTimeRangePicker placeholder={['Depart', 'Arrive']} />);
    expect(screen.getByPlaceholderText('Depart')).toBeDefined();
    expect(screen.getByPlaceholderText('Arrive')).toBeDefined();
  });
});
