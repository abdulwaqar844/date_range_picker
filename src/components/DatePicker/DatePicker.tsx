import React, { useState, useEffect } from 'react';
import { dayjs, toDayjs, formatDayjs, Dayjs } from '../../utils/dateUtils';
import { useFloatingPicker } from '../../hooks/useFloatingPicker';
import { useResponsive } from '../../hooks/useResponsive';
import { useCalendarView } from '../../hooks/useCalendarView';
import { PickerTrigger } from '../../common/PickerTrigger';
import { CalendarHeader } from '../../common/CalendarHeader';
import { DayMatrix } from '../../common/DayMatrix';
import { MonthMatrix } from '../../common/MonthMatrix';
import { YearMatrix } from '../../common/YearMatrix';
import { PresetsBar } from '../../common/PresetsBar';
import { PickerFooter } from '../../common/PickerFooter';
import { BottomSheet } from '../../common/BottomSheet';
import type { DatePickerProps } from '../../types';

export const DatePicker: React.FC<DatePickerProps> = (props) => {
  const {
    value,
    defaultValue,
    onChange,
    format = 'YYYY-MM-DD',
    placeholder = 'Select date',
    disabled = false,
    allowClear = true,
    size = 'middle',
    status,
    bordered = true,
    className,
    style,
    popupClassName,
    popupStyle,
    placement = 'bottomLeft',
    mobileBreakpoint = 768,
    disabledDate,
    showToday = true,
    presets,
    renderExtraFooter,
    cellRender,
    open: controlledOpen,
    onOpenChange,
  } = props;

  const isMobile = useResponsive(mobileBreakpoint);

  const [selectedDate, setSelectedDate] = useState<Dayjs | null>(() => {
    return toDayjs(value ?? defaultValue, format);
  });

  const {
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
  } = useCalendarView(selectedDate);

  useEffect(() => {
    if (value !== undefined) {
      const parsed = toDayjs(value, format);
      setSelectedDate(parsed);
      if (parsed) {
        setViewDate(parsed);
      }
    }
  }, [value, format, setViewDate]);

  const {
    isOpen,
    setIsOpen,
    refs,
    floatingStyles,
    getReferenceProps,
    getFloatingProps,
  } = useFloatingPicker({
    open: controlledOpen,
    onOpenChange,
    placement,
    disabled,
  });

  const handleSelectDate = (date: Dayjs) => {
    setSelectedDate(date);
    setViewDate(date);
    onChange?.(date, formatDayjs(date, format));
    setIsOpen(false);
  };

  const handleSelectToday = () => {
    const today = dayjs();
    setSelectedDate(today);
    setViewDate(today);
    onChange?.(today, formatDayjs(today, format));
    setIsOpen(false);
  };

  const handleClear = () => {
    setSelectedDate(null);
    onChange?.(null, '');
  };

  const handleSelectPreset = (presetDate: Dayjs) => {
    handleSelectDate(presetDate);
  };

  const formattedDisplay = selectedDate ? formatDayjs(selectedDate, format) : '';

  const calendarContent = (
    <div className="adp-panel-wrapper">
      {presets && presets.length > 0 && (
        <PresetsBar presets={presets} onSelectPreset={handleSelectPreset} />
      )}
      <div className="adp-panel-main">
        <CalendarHeader
          viewDate={viewDate}
          viewMode={viewMode}
          onPrevMonth={prevMonth}
          onNextMonth={nextMonth}
          onPrevYear={prevYear}
          onNextYear={nextYear}
          onPrevDecade={prevDecade}
          onNextDecade={nextDecade}
          onViewModeChange={setViewMode}
        />

        {viewMode === 'date' && (
          <DayMatrix
            viewDate={viewDate}
            selectedValue={selectedDate}
            onSelectDate={handleSelectDate}
            disabledDate={disabledDate}
            cellRender={cellRender}
          />
        )}

        {viewMode === 'month' && (
          <MonthMatrix
            viewDate={viewDate}
            selectedValue={selectedDate}
            onSelectMonth={selectMonth}
          />
        )}

        {viewMode === 'year' && (
          <YearMatrix
            viewDate={viewDate}
            selectedValue={selectedDate}
            onSelectYear={selectYear}
          />
        )}

        <PickerFooter
          renderExtraFooter={renderExtraFooter}
          showToday={showToday && viewMode === 'date'}
          onToday={handleSelectToday}
        />
      </div>
    </div>
  );

  return (
    <>
      <div
        ref={refs.setReference}
        {...getReferenceProps()}
        style={{ display: 'inline-block' }}
      >
        <PickerTrigger
          value={formattedDisplay}
          placeholder={placeholder}
          disabled={disabled}
          allowClear={allowClear}
          size={size}
          status={status}
          bordered={bordered}
          className={className}
          style={style}
          isOpen={isOpen}
          onClick={() => setIsOpen(!isOpen)}
          onClear={handleClear}
        />
      </div>

      {/* Desktop Floating Dropdown */}
      {!isMobile && isOpen && (
        <div
          ref={refs.setFloating}
          style={{ ...floatingStyles, ...popupStyle }}
          {...getFloatingProps()}
          className={`adp-dropdown ${popupClassName || ''}`}
        >
          {calendarContent}
        </div>
      )}

      {/* Mobile Bottom Sheet Drawer */}
      {isMobile && (
        <BottomSheet
          isOpen={isOpen}
          onClose={() => setIsOpen(false)}
          title="Select Date"
        >
          {calendarContent}
        </BottomSheet>
      )}
    </>
  );
};
