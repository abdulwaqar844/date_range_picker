import React, { useState } from 'react';
import type { Dayjs } from 'dayjs';
import { CalendarHeader } from '../../common/CalendarHeader';
import { DayMatrix } from '../../common/DayMatrix';
import { MonthMatrix } from '../../common/MonthMatrix';
import { YearMatrix } from '../../common/YearMatrix';

export interface DualCalendarPanelProps {
  leftDate: Dayjs;
  rightDate: Dayjs;
  startDate?: Dayjs | null;
  endDate?: Dayjs | null;
  hoverDate?: Dayjs | null;
  onSelectDate: (date: Dayjs) => void;
  onHoverDate: (date: Dayjs | null) => void;
  onPrevMonth: () => void;
  onNextMonth: () => void;
  onPrevYear: () => void;
  onNextYear: () => void;
  disabledDate?: (currentDate: Dayjs, info: { from?: Dayjs }) => boolean;
  cellRender?: (current: Dayjs, info: { originNode: React.ReactNode; type: 'date' | 'month' | 'year' }) => React.ReactNode;
}

export const DualCalendarPanel: React.FC<DualCalendarPanelProps> = ({
  leftDate,
  rightDate,
  startDate,
  endDate,
  hoverDate,
  onSelectDate,
  onHoverDate,
  onPrevMonth,
  onNextMonth,
  onPrevYear,
  onNextYear,
  disabledDate,
  cellRender,
}) => {
  const [leftViewMode, setLeftViewMode] = useState<'date' | 'month' | 'year'>('date');
  const [rightViewMode, setRightViewMode] = useState<'date' | 'month' | 'year'>('date');

  const checkDisabled = (d: Dayjs) => {
    return disabledDate ? disabledDate(d, { from: startDate ?? undefined }) : false;
  };

  return (
    <div className="adp-range-panels">
      {/* Left Month Panel */}
      <div className="adp-range-panel-left">
        <CalendarHeader
          viewDate={leftDate}
          viewMode={leftViewMode}
          onPrevMonth={onPrevMonth}
          onPrevYear={onPrevYear}
          onViewModeChange={setLeftViewMode}
          hideNextMonth={leftViewMode === 'date'}
        />
        {leftViewMode === 'date' && (
          <DayMatrix
            viewDate={leftDate}
            startDate={startDate}
            endDate={endDate}
            hoverDate={hoverDate}
            onSelectDate={onSelectDate}
            onHoverDate={onHoverDate}
            disabledDate={checkDisabled}
            cellRender={cellRender}
          />
        )}
        {leftViewMode === 'month' && (
          <MonthMatrix
            viewDate={leftDate}
            selectedValue={startDate}
            onSelectMonth={() => setLeftViewMode('date')}
          />
        )}
        {leftViewMode === 'year' && (
          <YearMatrix
            viewDate={leftDate}
            selectedValue={startDate}
            onSelectYear={() => setLeftViewMode('month')}
          />
        )}
      </div>

      <div className="adp-range-panel-divider" />

      {/* Right Month Panel */}
      <div className="adp-range-panel-right">
        <CalendarHeader
          viewDate={rightDate}
          viewMode={rightViewMode}
          onNextMonth={onNextMonth}
          onNextYear={onNextYear}
          onViewModeChange={setRightViewMode}
          hidePrevMonth={rightViewMode === 'date'}
        />
        {rightViewMode === 'date' && (
          <DayMatrix
            viewDate={rightDate}
            startDate={startDate}
            endDate={endDate}
            hoverDate={hoverDate}
            onSelectDate={onSelectDate}
            onHoverDate={onHoverDate}
            disabledDate={checkDisabled}
            cellRender={cellRender}
          />
        )}
        {rightViewMode === 'month' && (
          <MonthMatrix
            viewDate={rightDate}
            selectedValue={endDate}
            onSelectMonth={() => setRightViewMode('date')}
          />
        )}
        {rightViewMode === 'year' && (
          <YearMatrix
            viewDate={rightDate}
            selectedValue={endDate}
            onSelectYear={() => setRightViewMode('month')}
          />
        )}
      </div>
    </div>
  );
};
