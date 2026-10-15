import React from 'react';
import type { Dayjs } from 'dayjs';
import { MONTHS } from '../utils/dateUtils';
import { cn } from '../utils/domUtils';

export interface MonthMatrixProps {
  viewDate: Dayjs;
  selectedValue?: Dayjs | null;
  onSelectMonth: (monthIndex: number) => void;
}

export const MonthMatrix: React.FC<MonthMatrixProps> = ({
  viewDate,
  selectedValue,
  onSelectMonth,
}) => {
  const selectedYear = selectedValue?.year();
  const selectedMonth = selectedValue?.month();

  return (
    <div className="adp-months-grid">
      {MONTHS.map((month, idx) => {
        const isSelected =
          selectedValue &&
          selectedYear === viewDate.year() &&
          selectedMonth === idx;

        return (
          <div
            key={month}
            className={cn(
              'adp-month-cell',
              isSelected && 'adp-month-cell-selected'
            )}
            onClick={() => onSelectMonth(idx)}
          >
            {month}
          </div>
        );
      })}
    </div>
  );
};
