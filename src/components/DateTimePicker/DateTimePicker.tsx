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
import { TimePanel } from '../TimePicker/TimePanel';
import { PresetsBar } from '../../common/PresetsBar';
import { PickerFooter } from '../../common/PickerFooter';
import { BottomSheet } from '../../common/BottomSheet';
import type { DateTimePickerProps } from '../../types';

export const DateTimePicker: React.FC<DateTimePickerProps> = (props) => {
  const {
    value,
    defaultValue,
    onChange,
    onOk,
    format = 'YYYY-MM-DD HH:mm:ss',
    placeholder = 'Select date & time',
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
    disabledTime,
    showTime = true,
    showNow = true,
    presets,
    renderExtraFooter,
    cellRender,
    open: controlledOpen,
    onOpenChange,
  } = props;

  const isMobile = useResponsive(mobileBreakpoint);

  const [selectedDateTime, setSelectedDateTime] = useState<Dayjs | null>(() => {
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
  } = useCalendarView(selectedDateTime);

  useEffect(() => {
    if (value !== undefined) {
      const parsed = toDayjs(value, format);
      setSelectedDateTime(parsed);
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

  const timeProps = typeof showTime === 'object' ? showTime : {};

  const handleSelectDate = (date: Dayjs) => {
    const current = selectedDateTime || dayjs();
    const updated = date
      .hour(current.hour())
      .minute(current.minute())
      .second(current.second());

    setSelectedDateTime(updated);
    setViewDate(updated);
    onChange?.(updated, formatDayjs(updated, format));
  };

  const handleTimeChange = (time: Dayjs) => {
    const current = selectedDateTime || dayjs();
    const updated = current
      .hour(time.hour())
      .minute(time.minute())
      .second(time.second());

    setSelectedDateTime(updated);
    onChange?.(updated, formatDayjs(updated, format));
  };

  const handleNow = () => {
    const now = dayjs();
    setSelectedDateTime(now);
    setViewDate(now);
    onChange?.(now, formatDayjs(now, format));
    setIsOpen(false);
  };

  const handleOk = () => {
    onOk?.(selectedDateTime);
    setIsOpen(false);
  };

  const handleClear = () => {
    setSelectedDateTime(null);
    onChange?.(null, '');
  };

  const handleSelectPreset = (presetDate: Dayjs) => {
    setSelectedDateTime(presetDate);
    setViewDate(presetDate);
    onChange?.(presetDate, formatDayjs(presetDate, format));
  };

  const formattedDisplay = selectedDateTime
    ? formatDayjs(selectedDateTime, format)
    : '';

  const calendarAndDateContent = (
    <div className="adp-panel-wrapper">
      {presets && presets.length > 0 && (
        <PresetsBar presets={presets} onSelectPreset={handleSelectPreset} />
      )}
      <div className="adp-panel-main">
        <div className="adp-datetime-wrapper">
          {/* Calendar side */}
          <div className="adp-datetime-calendar">
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
                selectedValue={selectedDateTime}
                onSelectDate={handleSelectDate}
                disabledDate={disabledDate}
                cellRender={cellRender}
              />
            )}

            {viewMode === 'month' && (
              <MonthMatrix
                viewDate={viewDate}
                selectedValue={selectedDateTime}
                onSelectMonth={selectMonth}
              />
            )}

            {viewMode === 'year' && (
              <YearMatrix
                viewDate={viewDate}
                selectedValue={selectedDateTime}
                onSelectYear={selectYear}
              />
            )}
          </div>

          {/* Time side */}
          {Boolean(showTime) && (
            <>
              <div className="adp-datetime-divider" />
              <TimePanel
                value={selectedDateTime}
                onChange={handleTimeChange}
                format={timeProps.format || 'HH:mm:ss'}
                use12Hours={timeProps.use12Hours}
                hourStep={timeProps.hourStep}
                minuteStep={timeProps.minuteStep}
                secondStep={timeProps.secondStep}
                disabledTime={() =>
                  disabledTime ? disabledTime(selectedDateTime) : {}
                }
              />
            </>
          )}
        </div>

        <PickerFooter
          renderExtraFooter={renderExtraFooter}
          showNow={showNow}
          showOk={true}
          okDisabled={!selectedDateTime}
          onNow={handleNow}
          onOk={handleOk}
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
          {calendarAndDateContent}
        </div>
      )}

      {/* Mobile Bottom Sheet Drawer */}
      {isMobile && (
        <BottomSheet
          isOpen={isOpen}
          onClose={() => setIsOpen(false)}
          title="Select Date & Time"
        >
          {calendarAndDateContent}
        </BottomSheet>
      )}
    </>
  );
};
