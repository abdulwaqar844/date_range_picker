import type { ReactNode, CSSProperties } from 'react';
import type { Dayjs } from 'dayjs';

export type PickerSize = 'small' | 'middle' | 'large';
export type PickerStatus = 'error' | 'warning';
export type PickerPlacement = 'bottomLeft' | 'bottomRight' | 'topLeft' | 'topRight';

export interface DisabledTimeConfig {
  disabledHours?: () => number[];
  disabledMinutes?: (selectedHour: number) => number[];
  disabledSeconds?: (selectedHour: number, selectedMinute: number) => number[];
}

export type PresetValue<T> = T | (() => T);

export interface PresetItem<T> {
  label: ReactNode;
  value: PresetValue<T>;
}

export interface BasePickerProps {
  placeholder?: string;
  disabled?: boolean;
  allowClear?: boolean;
  autoFocus?: boolean;
  size?: PickerSize;
  status?: PickerStatus;
  bordered?: boolean;
  className?: string;
  style?: CSSProperties;
  popupClassName?: string;
  popupStyle?: CSSProperties;
  placement?: PickerPlacement;
  mobileBreakpoint?: number; // Screen width in px to switch to bottom drawer (default: 768)
  renderExtraFooter?: () => ReactNode;
  prefix?: ReactNode;
  suffixIcon?: ReactNode;
  clearIcon?: ReactNode;
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  id?: string;
  name?: string;
}

export interface DatePickerProps extends BasePickerProps {
  value?: Dayjs | string | null;
  defaultValue?: Dayjs | string | null;
  onChange?: (date: Dayjs | null, dateString: string) => void;
  format?: string;
  disabledDate?: (currentDate: Dayjs) => boolean;
  showToday?: boolean;
  presets?: PresetItem<Dayjs>[];
  cellRender?: (current: Dayjs, info: { originNode: ReactNode; type: 'date' | 'month' | 'year' }) => ReactNode;
}

export interface TimePickerProps extends BasePickerProps {
  value?: Dayjs | string | null;
  defaultValue?: Dayjs | string | null;
  onChange?: (time: Dayjs | null, timeString: string) => void;
  format?: string;
  use12Hours?: boolean;
  hourStep?: number;
  minuteStep?: number;
  secondStep?: number;
  showNow?: boolean;
  disabledTime?: () => DisabledTimeConfig;
  hideDisabledOptions?: boolean;
}

export interface DateTimePickerProps extends BasePickerProps {
  value?: Dayjs | string | null;
  defaultValue?: Dayjs | string | null;
  onChange?: (date: Dayjs | null, dateString: string) => void;
  onOk?: (date: Dayjs | null) => void;
  format?: string;
  disabledDate?: (currentDate: Dayjs) => boolean;
  disabledTime?: (currentDate: Dayjs | null) => DisabledTimeConfig;
  showTime?: boolean | Partial<TimePickerProps>;
  showNow?: boolean;
  presets?: PresetItem<Dayjs>[];
  cellRender?: (current: Dayjs, info: { originNode: ReactNode; type: 'date' | 'month' | 'year' }) => ReactNode;
}

export type RangeValue = [Dayjs | null, Dayjs | null] | null;
export type RangeStringValue = [string, string];

export interface BaseRangePickerProps extends Omit<BasePickerProps, 'placeholder' | 'disabled'> {
  placeholder?: [string, string];
  disabled?: boolean | [boolean, boolean];
  separator?: ReactNode;
}

export interface DateRangePickerProps extends BaseRangePickerProps {
  value?: RangeValue;
  defaultValue?: RangeValue;
  onChange?: (dates: RangeValue, dateStrings: RangeStringValue) => void;
  onCalendarChange?: (dates: RangeValue, dateStrings: RangeStringValue, info: { range: 'start' | 'end' }) => void;
  format?: string;
  disabledDate?: (currentDate: Dayjs, info: { from?: Dayjs }) => boolean;
  presets?: PresetItem<[Dayjs, Dayjs]>[];
  cellRender?: (current: Dayjs, info: { originNode: ReactNode; type: 'date' | 'month' | 'year' }) => ReactNode;
}

export interface DateTimeRangePickerProps extends BaseRangePickerProps {
  value?: RangeValue;
  defaultValue?: RangeValue;
  onChange?: (dates: RangeValue, dateStrings: RangeStringValue) => void;
  onOk?: (dates: RangeValue) => void;
  format?: string;
  disabledDate?: (currentDate: Dayjs, info: { from?: Dayjs }) => boolean;
  disabledTime?: (currentDate: Dayjs | null, type: 'start' | 'end') => DisabledTimeConfig;
  showTime?: boolean | Partial<TimePickerProps>;
  presets?: PresetItem<[Dayjs, Dayjs]>[];
  cellRender?: (current: Dayjs, info: { originNode: ReactNode; type: 'date' | 'month' | 'year' }) => ReactNode;
}
