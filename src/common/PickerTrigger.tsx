import React, { forwardRef, MouseEvent } from 'react';
import { cn } from '../utils/domUtils';
import { CalendarIcon, CloseCircleIcon } from './Icons';
import type { PickerSize, PickerStatus } from '../types';

export interface PickerTriggerProps {
  value?: string;
  placeholder?: string;
  disabled?: boolean;
  allowClear?: boolean;
  size?: PickerSize;
  status?: PickerStatus;
  bordered?: boolean;
  prefix?: React.ReactNode;
  suffixIcon?: React.ReactNode;
  clearIcon?: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
  isOpen?: boolean;
  onClear?: (e: MouseEvent<HTMLElement>) => void;
  onClick?: (e: MouseEvent<HTMLElement>) => void;
  id?: string;
}

export const PickerTrigger = forwardRef<HTMLDivElement, PickerTriggerProps>((props, ref) => {
  const {
    value = '',
    placeholder = 'Select date',
    disabled = false,
    allowClear = true,
    size = 'middle',
    status,
    bordered = true,
    prefix,
    suffixIcon = <CalendarIcon />,
    clearIcon = <CloseCircleIcon />,
    className,
    style,
    isOpen = false,
    onClear,
    onClick,
    id,
    ...rest
  } = props;

  const showClear = allowClear && !disabled && Boolean(value);

  const handleClearClick = (e: MouseEvent<HTMLElement>) => {
    e.stopPropagation();
    onClear?.(e);
  };

  return (
    <div
      ref={ref}
      id={id}
      onClick={!disabled ? onClick : undefined}
      style={style}
      className={cn(
        'adp-picker',
        size === 'small' && 'adp-picker-small',
        size === 'large' && 'adp-picker-large',
        status && `adp-picker-status-${status}`,
        !bordered && 'adp-picker-borderless',
        disabled && 'adp-picker-disabled',
        isOpen && 'adp-picker-focused',
        className
      )}
      {...rest}
    >
      {prefix && <span className="adp-picker-prefix">{prefix}</span>}
      <div className="adp-picker-input">
        <input
          readOnly
          disabled={disabled}
          placeholder={placeholder}
          value={value}
          tabIndex={0}
          onKeyDown={(e) => {
            if (['Enter', ' ', 'ArrowDown'].includes(e.key)) {
              e.preventDefault();
              if (!isOpen) e.currentTarget.click();
            }
          }}
        />
        {showClear && (
          <button
            type="button"
            className="adp-picker-clear adp-picker-clear-show"
            onClick={handleClearClick}
            title="Clear"
            aria-label="Clear"
          >
            {clearIcon}
          </button>
        )}
        <span className="adp-picker-suffix">{suffixIcon}</span>
      </div>
    </div>
  );
});

PickerTrigger.displayName = 'PickerTrigger';
