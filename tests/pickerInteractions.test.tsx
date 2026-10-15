import React from 'react';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { cleanup, fireEvent, render, screen, within } from '@testing-library/react';
import { DatePicker, TimePicker, DateTimePicker, DateRangePicker, DateTimeRangePicker, dayjs } from '../src';

const initialDate = dayjs('2026-10-15T14:30:00');
const originalWidth = window.innerWidth;
const originalScrollTo = Object.getOwnPropertyDescriptor(HTMLElement.prototype, 'scrollTo');

beforeEach(() => {
  Object.defineProperty(HTMLElement.prototype, 'scrollTo', { configurable: true, value: vi.fn() });
  Object.defineProperty(window, 'innerWidth', { configurable: true, value: 1024 });
});

afterEach(() => {
  cleanup();
  if (originalScrollTo) {
    Object.defineProperty(HTMLElement.prototype, 'scrollTo', originalScrollTo);
  } else {
    Reflect.deleteProperty(HTMLElement.prototype, 'scrollTo');
  }
  Object.defineProperty(window, 'innerWidth', { configurable: true, value: originalWidth });
});

function tap(element: Element) {
  fireEvent.pointerDown(element, { pointerType: 'touch' });
  fireEvent.click(element);
}

function selectDay(day: number) {
  const cells = within(screen.getByRole('dialog')).getAllByText(String(day), {
    selector: '.adp-cell-inner',
  });
  tap(cells[0]);
}

describe('Picker interaction regressions', () => {
  it.each(['Enter', ' ', 'ArrowDown'])('opens by keyboard with %s and dismisses with Escape', (key) => {
    render(<DatePicker placeholder="Date" />);
    const input = screen.getByPlaceholderText('Date');
    fireEvent.keyDown(input, { key });
    expect(screen.getByRole('dialog')).toBeDefined();
    fireEvent.keyDown(input, { key: 'Escape' });
    expect(screen.queryByRole('dialog')).toBeNull();
  });

  it('opens the end of a range by keyboard and keeps it open when clicked again', () => {
    render(<DateRangePicker defaultValue={[initialDate, initialDate.add(2, 'day')]} />);
    const endInput = screen.getByPlaceholderText('End date');
    fireEvent.keyDown(endInput, { key: 'Enter' });
    expect(screen.getByRole('dialog')).toBeDefined();
    fireEvent.click(endInput);
    expect(screen.getByRole('dialog')).toBeDefined();
    selectDay(20);
    expect((endInput as HTMLInputElement).value).toBe('2026-10-20');
  });

  it('does not open a disabled picker with the keyboard', () => {
    const onOpenChange = vi.fn();
    render(<DatePicker disabled placeholder="Date" onOpenChange={onOpenChange} />);
    fireEvent.keyDown(screen.getByPlaceholderText('Date'), { key: 'Enter' });
    expect(screen.queryByRole('dialog')).toBeNull();
    expect(onOpenChange).not.toHaveBeenCalled();
  });

  it.each([DatePicker, TimePicker, DateTimePicker])('clears a single picker without opening it', (Picker) => {
    const onChange = vi.fn();
    render(<Picker defaultValue={initialDate} onChange={onChange} placeholder="Value" />);
    const clear = screen.getByRole('button', { name: 'Clear' });
    expect(clear.tagName).toBe('BUTTON');
    fireEvent.click(clear);
    expect((screen.getByPlaceholderText('Value') as HTMLInputElement).value).toBe('');
    expect(onChange).toHaveBeenCalledWith(null, '');
    expect(screen.queryByRole('dialog')).toBeNull();
  });

  it.each([DateRangePicker, DateTimeRangePicker])('clears both range endpoints without opening', (Picker) => {
    const onChange = vi.fn();
    render(<Picker defaultValue={[initialDate, initialDate.add(2, 'day')]} onChange={onChange} placeholder={['Start', 'End']} />);
    fireEvent.click(screen.getByRole('button', { name: 'Clear' }));
    expect((screen.getByPlaceholderText('Start') as HTMLInputElement).value).toBe('');
    expect((screen.getByPlaceholderText('End') as HTMLInputElement).value).toBe('');
    expect(onChange).toHaveBeenCalledWith(null, ['', '']);
    expect(screen.queryByRole('dialog')).toBeNull();
  });

  it('commits a mobile date selection instead of dismissing on pointerdown', () => {
    Object.defineProperty(window, 'innerWidth', { configurable: true, value: 390 });
    const onChange = vi.fn();
    render(<DatePicker defaultValue={initialDate} onChange={onChange} placeholder="Date" />);
    fireEvent.click(screen.getByPlaceholderText('Date'));
    selectDay(20);
    expect(onChange).toHaveBeenCalledWith(expect.anything(), '2026-10-20');
    expect(screen.queryByRole('dialog')).toBeNull();
  });

  it('keeps mobile datetime selection open until confirmation', () => {
    Object.defineProperty(window, 'innerWidth', { configurable: true, value: 390 });
    const onChange = vi.fn();
    render(<DateTimePicker defaultValue={initialDate} onChange={onChange} placeholder="DateTime" />);
    fireEvent.click(screen.getByPlaceholderText('DateTime'));
    selectDay(20);
    expect(screen.getByRole('dialog')).toBeDefined();
    fireEvent.click(screen.getByRole('button', { name: 'OK' }));
    expect(onChange).toHaveBeenCalledWith(expect.anything(), '2026-10-20 14:30:00');
    expect(screen.queryByRole('dialog')).toBeNull();
  });

  it('keeps mobile time selection open until confirmation', () => {
    Object.defineProperty(window, 'innerWidth', { configurable: true, value: 390 });
    render(<TimePicker defaultValue={initialDate} placeholder="Time" />);
    fireEvent.click(screen.getByPlaceholderText('Time'));
    tap(within(screen.getByRole('dialog')).getAllByText('08')[0]);
    expect((screen.getByPlaceholderText('Time') as HTMLInputElement).value).toBe('08:30:00');
    fireEvent.click(screen.getByRole('button', { name: 'OK' }));
    expect(screen.queryByRole('dialog')).toBeNull();
  });

  it.each([DateRangePicker, DateTimeRangePicker])('allows selecting both dates inside a mobile range sheet', (Picker) => {
    Object.defineProperty(window, 'innerWidth', { configurable: true, value: 390 });
    const onChange = vi.fn();
    render(<Picker defaultValue={[initialDate, initialDate.add(2, 'day')]} onChange={onChange} placeholder={['Start', 'End']} />);
    fireEvent.click(screen.getByPlaceholderText('Start'));
    selectDay(20);
    expect(screen.getByRole('dialog')).toBeDefined();
    selectDay(25);
    const ok = screen.queryByRole('button', { name: 'OK' });
    if (ok) fireEvent.click(ok);
    expect(onChange).toHaveBeenCalled();
    expect((screen.getByPlaceholderText('Start') as HTMLInputElement).value).toContain('2026-10-20');
    expect((screen.getByPlaceholderText('End') as HTMLInputElement).value).toContain('2026-10-25');
    expect(screen.queryByRole('dialog')).toBeNull();
  });
});
