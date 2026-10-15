import React from 'react';
import type { Dayjs } from 'dayjs';
import {
  generateMonthMatrix,
  WEEKDAYS,
  isSameDay,
  isDateInRange,
} from '../utils/dateUtils';
import { cn } from '../utils/domUtils';

export interface DayMatrixProps {
  viewDate: Dayjs;
  selectedValue?: Dayjs | null;
  startDate?: Dayjs | null;
  endDate?: Dayjs | null;
  hoverDate?: Dayjs | null;
  onSelectDate?: (date: Dayjs) => void;
  onHoverDate?: (date: Dayjs | null) => void;
  disabledDate?: (currentDate: Dayjs) => boolean;
  cellRender?: (current: Dayjs, info: { originNode: React.ReactNode; type: 'date' | 'month' | 'year' }) => React.ReactNode;
}

export const DayMatrix: React.FC<DayMatrixProps> = ({
  viewDate,
  selectedValue,
  startDate,
  endDate,
  hoverDate,
  onSelectDate,
  onHoverDate,
  disabledDate,
  cellRender,
}) => {
  const cells = generateMonthMatrix(viewDate);

  // Range calculations
  const effectiveEnd = endDate || hoverDate;
  const hasRange = Boolean(startDate && effectiveEnd);

  return (
    <div className="adp-panel-body" onMouseLeave={() => onHoverDate?.(null)}>
      {/* Weekday headers */}
      <div className="adp-weekdays-row">
        {WEEKDAYS.map((day) => (
          <span key={day}>{day}</span>
        ))}
      </div>

      {/* 42 days grid */}
      <div className="adp-days-grid">
        {cells.map(({ date, isCurrentMonth, isToday }, idx) => {
          const isDisabled = disabledDate ? disabledDate(date) : false;
          const isSelected = selectedValue ? isSameDay(date, selectedValue) : false;

          const isStart = startDate ? isSameDay(date, startDate) : false;
          const isEnd = endDate ? isSameDay(date, endDate) : false;
          const isInRange = hasRange && isDateInRange(date, startDate, effectiveEnd, false);
          const isHoverEnd = hoverDate && !endDate && isSameDay(date, hoverDate);

          const cellClass = cn(
            'adp-cell',
            !isCurrentMonth && 'adp-cell-other-month',
            isToday && 'adp-cell-today',
            (isSelected || isStart || isEnd) && 'adp-cell-selected',
            isInRange && 'adp-cell-in-range',
            isStart && 'adp-cell-range-start',
            (isEnd || isHoverEnd) && 'adp-cell-range-end',
            isDisabled && 'adp-cell-disabled'
          );

          const originNode = (
            <div className="adp-cell-inner">{date.date()}</div>
          );

          const node = cellRender
            ? cellRender(date, { originNode, type: 'date' })
            : originNode;

          return (
            <div
              key={idx}
              className={cellClass}
              onClick={() => {
                if (!isDisabled) {
                  onSelectDate?.(date);
                }
              }}
              onMouseEnter={() => {
                if (!isDisabled && onHoverDate) {
                  onHoverDate(date);
                }
              }}
            >
              {node}
            </div>
          );
        })}
      </div>
    </div>
  );
};
