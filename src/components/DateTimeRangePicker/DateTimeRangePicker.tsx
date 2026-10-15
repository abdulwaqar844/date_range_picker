import React, { useState, useEffect } from 'react';
import { dayjs, toDayjs, formatDayjs, Dayjs } from '../../utils/dateUtils';
import { useFloatingPicker } from '../../hooks/useFloatingPicker';
import { useResponsive } from '../../hooks/useResponsive';
import { RangeTrigger } from '../../common/RangeTrigger';
import { DualCalendarPanel } from '../DateRangePicker/DualCalendarPanel';
import { TimePanel } from '../TimePicker/TimePanel';
import { PresetsBar } from '../../common/PresetsBar';
import { PickerFooter } from '../../common/PickerFooter';
import { BottomSheet } from '../../common/BottomSheet';
import type { DateTimeRangePickerProps, RangeValue, RangeStringValue } from '../../types';

export const DateTimeRangePicker: React.FC<DateTimeRangePickerProps> = (props) => {
  const {
    value,
    defaultValue,
    onChange,
    onOk,
    format = 'YYYY-MM-DD HH:mm:ss',
    placeholder = ['Start date & time', 'End date & time'],
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
    disabledTime,
    showTime = true,
    presets,
    renderExtraFooter,
    cellRender,
    open: controlledOpen,
    onOpenChange,
  } = props;

  const isMobile = useResponsive(mobileBreakpoint);

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

  const timeProps = typeof showTime === 'object' ? showTime : {};

  const handleSelectDate = (date: Dayjs) => {
    if (activeTarget === 'start') {
      const prevStart = startDate || dayjs();
      const updatedStart = date
        .hour(prevStart.hour())
        .minute(prevStart.minute())
        .second(prevStart.second());

      setRange([updatedStart, endDate]);
      setActiveTarget('end');
    } else {
      const prevEnd = endDate || dayjs();
      let finalStart = startDate || date;
      let finalEnd = date
        .hour(prevEnd.hour())
        .minute(prevEnd.minute())
        .second(prevEnd.second());

      if (finalEnd.isBefore(finalStart)) {
        const temp = finalStart;
        finalStart = finalEnd;
        finalEnd = temp;
      }

      setRange([finalStart, finalEnd]);
      setHoverDate(null);
    }
  };

  const handleTimeChange = (time: Dayjs) => {
    if (activeTarget === 'start') {
      const currentStart = startDate || dayjs();
      const updatedStart = currentStart
        .hour(time.hour())
        .minute(time.minute())
        .second(time.second());
      setRange([updatedStart, endDate]);
    } else {
      const currentEnd = endDate || dayjs();
      const updatedEnd = currentEnd
        .hour(time.hour())
        .minute(time.minute())
        .second(time.second());
      setRange([startDate, updatedEnd]);
    }
  };

  const handleOk = () => {
    if (range) {
      const dateStrings: RangeStringValue = [
        formatDayjs(range[0], format),
        formatDayjs(range[1], format),
      ];
      onChange?.(range, dateStrings);
      onOk?.(range);
    }
    setIsOpen(false);
  };

  const handleClear = () => {
    setRange(null);
    setHoverDate(null);
    setActiveTarget('start');
    onChange?.(null, ['', '']);
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

  const startDisplay = startDate ? formatDayjs(startDate, format) : '';
  const endDisplay = endDate ? formatDayjs(endDate, format) : '';

  const currentTimeValue = activeTarget === 'start' ? startDate : endDate;

  const content = (
    <div className="adp-panel-wrapper">
      {presets && presets.length > 0 && (
        <PresetsBar presets={presets} onSelectPreset={handleSelectPreset} />
      )}
      <div className="adp-panel-main">
        <div className="adp-datetime-wrapper">
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

          {Boolean(showTime) && (
            <>
              <div className="adp-datetime-divider" />
              <div style={{ display: 'flex', flexDirection: 'column' }}>
                <div
                  style={{
                    padding: '8px',
                    textAlign: 'center',
                    fontWeight: 600,
                    fontSize: '12px',
                    borderBottom: '1px solid var(--adp-border-color)',
                    color: 'var(--adp-primary-color)',
                  }}
                >
                  {activeTarget === 'start' ? 'Start Time' : 'End Time'}
                </div>
                <TimePanel
                  value={currentTimeValue}
                  onChange={handleTimeChange}
                  format={timeProps.format || 'HH:mm:ss'}
                  use12Hours={timeProps.use12Hours}
                  hourStep={timeProps.hourStep}
                  minuteStep={timeProps.minuteStep}
                  secondStep={timeProps.secondStep}
                  disabledTime={() =>
                    disabledTime ? disabledTime(currentTimeValue, activeTarget) : {}
                  }
                />
              </div>
            </>
          )}
        </div>

        <PickerFooter
          renderExtraFooter={renderExtraFooter}
          showOk={true}
          okDisabled={!startDate || !endDate}
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
          {content}
        </div>
      )}

      {/* Mobile Bottom Sheet Drawer */}
      {isMobile && (
        <BottomSheet
          ref={refs.setFloating}
          isOpen={isOpen}
          onClose={() => setIsOpen(false)}
          title="Select Date & Time Range"
        >
          {content}
        </BottomSheet>
      )}
    </>
  );
};
