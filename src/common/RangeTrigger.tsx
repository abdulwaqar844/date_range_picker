import React, { forwardRef, MouseEvent } from 'react';
import { cn } from '../utils/domUtils';
import { CalendarIcon, CloseCircleIcon, SwapRightIcon } from './Icons';
import type { PickerSize, PickerStatus } from '../types';

export interface RangeTriggerProps {
  startValue?: string;
  endValue?: string;
  placeholder?: [string, string];
  disabled?: boolean | [boolean, boolean];
  allowClear?: boolean;
  size?: PickerSize;
  status?: PickerStatus;
  bordered?: boolean;
  separator?: React.ReactNode;
  suffixIcon?: React.ReactNode;
  clearIcon?: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
  isOpen?: boolean;
  activeTarget?: 'start' | 'end';
  onClear?: (e: MouseEvent<HTMLElement>) => void;
  onStartClick?: (e: MouseEvent<HTMLElement>) => void;
  onEndClick?: (e: MouseEvent<HTMLElement>) => void;
  onClick?: (e: MouseEvent<HTMLElement>) => void;
  id?: string;
}

export const RangeTrigger = forwardRef<HTMLDivElement, RangeTriggerProps>((props, ref) => {
  const {
    startValue = '',
    endValue = '',
    placeholder = ['Start date', 'End date'],
    disabled = false,
    allowClear = true,
    size = 'middle',
    status,
    bordered = true,
    separator = <SwapRightIcon />,
    suffixIcon = <CalendarIcon />,
    clearIcon = <CloseCircleIcon />,
    className,
    style,
    isOpen = false,
    activeTarget = 'start',
    onClear,
    onStartClick,
    onEndClick,
    onClick,
    id,
    ...rest
  } = props;

  const isStartDisabled = Array.isArray(disabled) ? disabled[0] : disabled;
  const isEndDisabled = Array.isArray(disabled) ? disabled[1] : disabled;
  const isAllDisabled = isStartDisabled && isEndDisabled;

  const hasValue = Boolean(startValue || endValue);
  const showClear = allowClear && !isAllDisabled && hasValue;

  const handleClearClick = (e: MouseEvent<HTMLElement>) => {
    e.stopPropagation();
    onClear?.(e);
  };

  return (
    <div
      ref={ref}
      id={id}
      onClick={!isAllDisabled ? onClick : undefined}
      style={style}
      className={cn(
        'adp-range-picker',
        size === 'small' && 'adp-picker-small',
        size === 'large' && 'adp-picker-large',
        status && `adp-picker-status-${status}`,
        !bordered && 'adp-picker-borderless',
        isAllDisabled && 'adp-picker-disabled',
        isOpen && 'adp-picker-focused',
        className
      )}
      {...rest}
    >
      <div
        className={cn('adp-picker-input', activeTarget === 'start' && isOpen && 'adp-picker-input-active')}
        onClick={!isStartDisabled ? (e) => {
          if (onStartClick) {
            e.stopPropagation();
            onStartClick(e);
          }
        } : undefined}
      >
        <input
          readOnly
          disabled={isStartDisabled}
          placeholder={placeholder[0]}
          value={startValue}
          tabIndex={0}
          onKeyDown={(e) => {
            if (['Enter', ' ', 'ArrowDown'].includes(e.key)) {
              e.preventDefault();
              if (!isOpen) e.currentTarget.click();
            }
          }}
        />
      </div>

      <span className="adp-range-separator">{separator}</span>

      <div
        className={cn('adp-picker-input', activeTarget === 'end' && isOpen && 'adp-picker-input-active')}
        onClick={!isEndDisabled ? (e) => {
          if (onEndClick) {
            e.stopPropagation();
            onEndClick(e);
          }
        } : undefined}
      >
        <input
          readOnly
          disabled={isEndDisabled}
          placeholder={placeholder[1]}
          value={endValue}
          tabIndex={0}
          onKeyDown={(e) => {
            if (['Enter', ' ', 'ArrowDown'].includes(e.key)) {
              e.preventDefault();
              if (!isOpen) e.currentTarget.click();
            }
          }}
        />
      </div>

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
  );
});

RangeTrigger.displayName = 'RangeTrigger';
