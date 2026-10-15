import React, { useState, useEffect } from 'react';
import { dayjs, toDayjs, formatDayjs, Dayjs } from '../../utils/dateUtils';
import { useFloatingPicker } from '../../hooks/useFloatingPicker';
import { useResponsive } from '../../hooks/useResponsive';
import { RangeTrigger } from '../../common/RangeTrigger';
import { DualCalendarPanel } from './DualCalendarPanel';
import { PresetsBar } from '../../common/PresetsBar';
import { PickerFooter } from '../../common/PickerFooter';
import { BottomSheet } from '../../common/BottomSheet';
import type { DateRangePickerProps, RangeValue, RangeStringValue } from '../../types';

export const DateRangePicker: React.FC<DateRangePickerProps> = (props) => {
  const {
    value,
    defaultValue,
    onChange,
    onCalendarChange,
    format = 'YYYY-MM-DD',
    placeholder = ['Start date', 'End date'],
    disabled = false,
    allowClear = true,
    size = 'middle',
    status,
    bordered = true,
    separator,
    className,
    style,
    popupClassName,
    popupStyle,
    placement = 'bottomLeft',
    mobileBreakpoint = 768,
    disabledDate,
    presets,
    renderExtraFooter,
    cellRender,
    open: controlledOpen,
    onOpenChange,
  } = props;

  const isMobile = useResponsive(mobileBreakpoint);

  // Range values
  const [range, setRange] = useState<RangeValue>(() => {
    if (value) {
      return [toDayjs(value[0], format), toDayjs(value[1], format)];
    }
    if (defaultValue) {
      return [toDayjs(defaultValue[0], format), toDayjs(defaultValue[1], format)];
    }
    return null;
  });

  const [activeTarget, setActiveTarget] = useState<'start' | 'end'>('start');
  const [hoverDate, setHoverDate] = useState<Dayjs | null>(null);

  // Month navigation: Left panel is leftMonth, right panel is leftMonth + 1
  const [leftMonth, setLeftMonth] = useState<Dayjs>(() => {
    return range?.[0] || dayjs();
  });
  const rightMonth = leftMonth.add(1, 'month');

  useEffect(() => {
    if (value !== undefined) {
      if (value) {
        const s = toDayjs(value[0], format);
        const e = toDayjs(value[1], format);
        setRange([s, e]);
        if (s) setLeftMonth(s);
      } else {
        setRange(null);
      }
    }
  }, [value, format]);

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
    disabled: Array.isArray(disabled) ? disabled[0] && disabled[1] : disabled,
  });

  const startDate = range?.[0] || null;
  const endDate = range?.[1] || null;

  const handleSelectDate = (date: Dayjs) => {
    if (activeTarget === 'start') {
      const nextRange: RangeValue = [date, null];
      setRange(nextRange);
      setActiveTarget('end');
      const dateStrings: RangeStringValue = [formatDayjs(date, format), ''];
      onCalendarChange?.(nextRange, dateStrings, { range: 'start' });
    } else {
      // Selecting end date
      let finalStart = startDate || date;
      let finalEnd = date;

      if (finalEnd.isBefore(finalStart)) {
        const temp = finalStart;
        finalStart = finalEnd;
        finalEnd = temp;
      }

      const finalRange: RangeValue = [finalStart, finalEnd];
      setRange(finalRange);
      setHoverDate(null);
      const dateStrings: RangeStringValue = [
        formatDayjs(finalStart, format),
        formatDayjs(finalEnd, format),
      ];

      onCalendarChange?.(finalRange, dateStrings, { range: 'end' });
      onChange?.(finalRange, dateStrings);
      setIsOpen(false);
      setActiveTarget('start');
    }
  };

  const handleSelectPreset = (presetRange: [Dayjs, Dayjs]) => {
    const [s, e] = presetRange;
    const finalRange: RangeValue = [s, e];
    setRange(finalRange);
    setLeftMonth(s);
    const dateStrings: RangeStringValue = [
      formatDayjs(s, format),
      formatDayjs(e, format),
    ];
    onChange?.(finalRange, dateStrings);
    setIsOpen(false);
  };

  const handleClear = () => {
    setRange(null);
    setHoverDate(null);
    setActiveTarget('start');
    onChange?.(null, ['', '']);
  };

  const startDisplay = startDate ? formatDayjs(startDate, format) : '';
  const endDisplay = endDate ? formatDayjs(endDate, format) : '';

  const calendarContent = (
    <div className="adp-panel-wrapper">
      {presets && presets.length > 0 && (
        <PresetsBar presets={presets} onSelectPreset={handleSelectPreset} />
      )}
      <div className="adp-panel-main">
        <DualCalendarPanel
          leftDate={leftMonth}
          rightDate={rightMonth}
          startDate={startDate}
          endDate={endDate}
          hoverDate={hoverDate}
          onSelectDate={handleSelectDate}
          onHoverDate={setHoverDate}
          onPrevMonth={() => setLeftMonth((d) => d.subtract(1, 'month'))}
          onNextMonth={() => setLeftMonth((d) => d.add(1, 'month'))}
          onPrevYear={() => setLeftMonth((d) => d.subtract(1, 'year'))}
          onNextYear={() => setLeftMonth((d) => d.add(1, 'year'))}
          disabledDate={disabledDate}
          cellRender={cellRender}
        />
        <PickerFooter renderExtraFooter={renderExtraFooter} />
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
        <RangeTrigger
          startValue={startDisplay}
          endValue={endDisplay}
          placeholder={placeholder}
          disabled={disabled}
          allowClear={allowClear}
          size={size}
          status={status}
          bordered={bordered}
          separator={separator}
          className={className}
          style={style}
          isOpen={isOpen}
          activeTarget={activeTarget}
          onStartClick={() => {
            setActiveTarget('start');
            setIsOpen(true);
          }}
          onEndClick={() => {
            setActiveTarget('end');
            setIsOpen(true);
          }}
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
          ref={refs.setFloating}
          isOpen={isOpen}
          onClose={() => setIsOpen(false)}
          title="Select Date Range"
        >
          {calendarContent}
        </BottomSheet>
      )}
    </>
  );
};
