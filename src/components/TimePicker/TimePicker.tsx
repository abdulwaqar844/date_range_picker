import React, { useState, useEffect } from 'react';
import { dayjs, toDayjs, formatDayjs, Dayjs } from '../../utils/dateUtils';
import { useFloatingPicker } from '../../hooks/useFloatingPicker';
import { useResponsive } from '../../hooks/useResponsive';
import { PickerTrigger } from '../../common/PickerTrigger';
import { ClockIcon } from '../../common/Icons';
import { TimePanel } from './TimePanel';
import { PickerFooter } from '../../common/PickerFooter';
import { BottomSheet } from '../../common/BottomSheet';
import type { TimePickerProps } from '../../types';

export const TimePicker: React.FC<TimePickerProps> = (props) => {
  const {
    value,
    defaultValue,
    onChange,
    format = 'HH:mm:ss',
    placeholder = 'Select time',
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
    use12Hours = false,
    hourStep = 1,
    minuteStep = 1,
    secondStep = 1,
    showNow = true,
    disabledTime,
    hideDisabledOptions = false,
    renderExtraFooter,
    open: controlledOpen,
    onOpenChange,
  } = props;

  const isMobile = useResponsive(mobileBreakpoint);

  const [selectedTime, setSelectedTime] = useState<Dayjs | null>(() => {
    return toDayjs(value ?? defaultValue, format);
  });

  useEffect(() => {
    if (value !== undefined) {
      setSelectedTime(toDayjs(value, format));
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
    disabled,
  });

  const handleTimeChange = (newTime: Dayjs) => {
    setSelectedTime(newTime);
    onChange?.(newTime, formatDayjs(newTime, format));
  };

  const handleNow = () => {
    const now = dayjs();
    setSelectedTime(now);
    onChange?.(now, formatDayjs(now, format));
    setIsOpen(false);
  };

  const handleOk = () => {
    setIsOpen(false);
  };

  const handleClear = () => {
    setSelectedTime(null);
    onChange?.(null, '');
  };

  const formattedDisplay = selectedTime ? formatDayjs(selectedTime, format) : '';

  const panelContent = (
    <div className="adp-time-panel-container">
      <TimePanel
        value={selectedTime}
        onChange={handleTimeChange}
        format={format}
        use12Hours={use12Hours}
        hourStep={hourStep}
        minuteStep={minuteStep}
        secondStep={secondStep}
        disabledTime={disabledTime}
        hideDisabledOptions={hideDisabledOptions}
      />
      <PickerFooter
        renderExtraFooter={renderExtraFooter}
        showNow={showNow}
        showOk={true}
        onNow={handleNow}
        onOk={handleOk}
      />
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
          suffixIcon={<ClockIcon />}
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
          {panelContent}
        </div>
      )}

      {/* Mobile Bottom Sheet Drawer */}
      {isMobile && (
        <BottomSheet
          ref={refs.setFloating}
          isOpen={isOpen}
          onClose={() => setIsOpen(false)}
          title="Select Time"
        >
          {panelContent}
        </BottomSheet>
      )}
    </>
  );
};
