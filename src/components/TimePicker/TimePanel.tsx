import React, { useMemo } from 'react';
import { dayjs, Dayjs } from '../../utils/dateUtils';
import { TimeColumn, TimeColumnItem } from './TimeColumn';
import type { DisabledTimeConfig } from '../../types';

export interface TimePanelProps {
  value?: Dayjs | null;
  onChange: (time: Dayjs) => void;
  format?: string;
  use12Hours?: boolean;
  hourStep?: number;
  minuteStep?: number;
  secondStep?: number;
  disabledTime?: () => DisabledTimeConfig;
  hideDisabledOptions?: boolean;
}

export const TimePanel: React.FC<TimePanelProps> = ({
  value,
  onChange,
  format = 'HH:mm:ss',
  use12Hours = false,
  hourStep = 1,
  minuteStep = 1,
  secondStep = 1,
  disabledTime,
  hideDisabledOptions = false,
}) => {
  const currentTime = value || dayjs().hour(0).minute(0).second(0);

  const is12Hour = use12Hours || format.includes('a') || format.includes('A');
  const showSeconds = format.includes('s') || format.includes('ss');

  const disabledConfig = useMemo(() => {
    return disabledTime ? disabledTime() : {};
  }, [disabledTime]);

  const disabledHours = disabledConfig.disabledHours?.() || [];
  const disabledMinutes = disabledConfig.disabledMinutes?.(currentTime.hour()) || [];
  const disabledSeconds = disabledConfig.disabledSeconds?.(currentTime.hour(), currentTime.minute()) || [];

  // Generate Hours
  const hourItems: TimeColumnItem[] = useMemo(() => {
    const items: TimeColumnItem[] = [];
    const startHour = is12Hour ? 1 : 0;

    for (let h = startHour; h < (is12Hour ? 13 : 24); h += hourStep) {
      const isDisabled = disabledHours.includes(h);
      if (hideDisabledOptions && isDisabled) continue;
      items.push({
        label: String(h).padStart(2, '0'),
        value: h,
        disabled: isDisabled,
      });
    }
    return items;
  }, [is12Hour, hourStep, disabledHours, hideDisabledOptions]);

  // Generate Minutes
  const minuteItems: TimeColumnItem[] = useMemo(() => {
    const items: TimeColumnItem[] = [];
    for (let m = 0; m < 60; m += minuteStep) {
      const isDisabled = disabledMinutes.includes(m);
      if (hideDisabledOptions && isDisabled) continue;
      items.push({
        label: String(m).padStart(2, '0'),
        value: m,
        disabled: isDisabled,
      });
    }
    return items;
  }, [minuteStep, disabledMinutes, hideDisabledOptions]);

  // Generate Seconds
  const secondItems: TimeColumnItem[] = useMemo(() => {
    if (!showSeconds) return [];
    const items: TimeColumnItem[] = [];
    for (let s = 0; s < 60; s += secondStep) {
      const isDisabled = disabledSeconds.includes(s);
      if (hideDisabledOptions && isDisabled) continue;
      items.push({
        label: String(s).padStart(2, '0'),
        value: s,
        disabled: isDisabled,
      });
    }
    return items;
  }, [showSeconds, secondStep, disabledSeconds, hideDisabledOptions]);

  // Generate AM/PM
  const ampmItems: TimeColumnItem[] = useMemo(() => {
    if (!is12Hour) return [];
    return [
      { label: 'AM', value: 'AM' },
      { label: 'PM', value: 'PM' },
    ];
  }, [is12Hour]);

  // Value getters
  const selectedHour = is12Hour
    ? currentTime.hour() % 12 || 12
    : currentTime.hour();
  const selectedMinute = currentTime.minute();
  const selectedSecond = currentTime.second();
  const selectedAmPm = currentTime.hour() >= 12 ? 'PM' : 'AM';

  const handleHourSelect = (h: number | string) => {
    let hourNum = Number(h);
    if (is12Hour) {
      if (selectedAmPm === 'PM' && hourNum < 12) hourNum += 12;
      if (selectedAmPm === 'AM' && hourNum === 12) hourNum = 0;
    }
    onChange(currentTime.hour(hourNum));
  };

  const handleMinuteSelect = (m: number | string) => {
    onChange(currentTime.minute(Number(m)));
  };

  const handleSecondSelect = (s: number | string) => {
    onChange(currentTime.second(Number(s)));
  };

  const handleAmPmSelect = (val: number | string) => {
    let currentH = currentTime.hour();
    if (val === 'PM' && currentH < 12) currentH += 12;
    if (val === 'AM' && currentH >= 12) currentH -= 12;
    onChange(currentTime.hour(currentH));
  };

  return (
    <div className="adp-time-panel">
      <TimeColumn
        items={hourItems}
        selectedValue={selectedHour}
        onSelect={handleHourSelect}
      />
      <TimeColumn
        items={minuteItems}
        selectedValue={selectedMinute}
        onSelect={handleMinuteSelect}
      />
      {showSeconds && (
        <TimeColumn
          items={secondItems}
          selectedValue={selectedSecond}
          onSelect={handleSecondSelect}
        />
      )}
      {is12Hour && (
        <TimeColumn
          items={ampmItems}
          selectedValue={selectedAmPm}
          onSelect={handleAmPmSelect}
        />
      )}
    </div>
  );
};
