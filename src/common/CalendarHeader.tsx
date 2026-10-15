import React from 'react';
import type { Dayjs } from 'dayjs';
import { MONTHS } from '../utils/dateUtils';
import {
  LeftChevron,
  RightChevron,
  DoubleLeftChevron,
  DoubleRightChevron,
} from './Icons';
import type { CalendarViewMode } from '../hooks/useCalendarView';

export interface CalendarHeaderProps {
  viewDate: Dayjs;
  viewMode: CalendarViewMode;
  onPrevMonth?: () => void;
  onNextMonth?: () => void;
  onPrevYear?: () => void;
  onNextYear?: () => void;
  onPrevDecade?: () => void;
  onNextDecade?: () => void;
  onViewModeChange?: (mode: CalendarViewMode) => void;
  hidePrevMonth?: boolean;
  hideNextMonth?: boolean;
}

export const CalendarHeader: React.FC<CalendarHeaderProps> = ({
  viewDate,
  viewMode,
  onPrevMonth,
  onNextMonth,
  onPrevYear,
  onNextYear,
  onPrevDecade,
  onNextDecade,
  onViewModeChange,
  hidePrevMonth = false,
  hideNextMonth = false,
}) => {
  const year = viewDate.year();
  const monthName = MONTHS[viewDate.month()];
  const decadeStart = Math.floor(year / 10) * 10;
  const decadeEnd = decadeStart + 9;

  return (
    <div className="adp-panel-header">
      {/* Prev buttons */}
      <div>
        {viewMode === 'date' && (
          <>
            <button
              type="button"
              className="adp-header-btn"
              onClick={onPrevYear}
              title="Previous year"
            >
              <DoubleLeftChevron />
            </button>
            {!hidePrevMonth && (
              <button
                type="button"
                className="adp-header-btn"
                onClick={onPrevMonth}
                title="Previous month"
              >
                <LeftChevron />
              </button>
            )}
          </>
        )}
        {viewMode === 'month' && (
          <button
            type="button"
            className="adp-header-btn"
            onClick={onPrevYear}
            title="Previous year"
          >
            <DoubleLeftChevron />
          </button>
        )}
        {viewMode === 'year' && (
          <button
            type="button"
            className="adp-header-btn"
            onClick={onPrevDecade}
            title="Previous decade"
          >
            <DoubleLeftChevron />
          </button>
        )}
      </div>

      {/* Center view title & toggle */}
      <div className="adp-header-view-selectors">
        {viewMode === 'date' && (
          <>
            <button
              type="button"
              className="adp-header-view-btn"
              onClick={() => onViewModeChange?.('month')}
            >
              {monthName}
            </button>
            <button
              type="button"
              className="adp-header-view-btn"
              onClick={() => onViewModeChange?.('year')}
            >
              {year}
            </button>
          </>
        )}
        {viewMode === 'month' && (
          <button
            type="button"
            className="adp-header-view-btn"
            onClick={() => onViewModeChange?.('year')}
          >
            {year}
          </button>
        )}
        {viewMode === 'year' && (
          <span className="adp-header-view-btn" style={{ cursor: 'default' }}>
            {decadeStart}-{decadeEnd}
          </span>
        )}
      </div>

      {/* Next buttons */}
      <div>
        {viewMode === 'date' && (
          <>
            {!hideNextMonth && (
              <button
                type="button"
                className="adp-header-btn"
                onClick={onNextMonth}
                title="Next month"
              >
                <RightChevron />
              </button>
            )}
            <button
              type="button"
              className="adp-header-btn"
              onClick={onNextYear}
              title="Next year"
            >
              <DoubleRightChevron />
            </button>
          </>
        )}
        {viewMode === 'month' && (
          <button
            type="button"
            className="adp-header-btn"
            onClick={onNextYear}
            title="Next year"
          >
            <DoubleRightChevron />
          </button>
        )}
        {viewMode === 'year' && (
          <button
            type="button"
            className="adp-header-btn"
            onClick={onNextDecade}
            title="Next decade"
          >
            <DoubleRightChevron />
          </button>
        )}
      </div>
    </div>
  );
};
