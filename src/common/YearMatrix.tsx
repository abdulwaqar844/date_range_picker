import React from 'react';
import type { Dayjs } from 'dayjs';
import { generateDecadeYears } from '../utils/dateUtils';
import { cn } from '../utils/domUtils';

export interface YearMatrixProps {
  viewDate: Dayjs;
  selectedValue?: Dayjs | null;
  onSelectYear: (year: number) => void;
}

export const YearMatrix: React.FC<YearMatrixProps> = ({
  viewDate,
  selectedValue,
  onSelectYear,
}) => {
  const years = generateDecadeYears(viewDate.year());
  const selectedYear = selectedValue?.year();

  return (
    <div className="adp-years-grid">
      {years.map(({ year, isCurrentDecade }) => {
        const isSelected = selectedYear === year;

        return (
          <div
            key={year}
            className={cn(
              'adp-year-cell',
              !isCurrentDecade && 'adp-cell-other-month',
              isSelected && 'adp-year-cell-selected'
            )}
            onClick={() => onSelectYear(year)}
          >
            {year}
          </div>
        );
      })}
    </div>
  );
};
