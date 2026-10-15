import React, { useState } from 'react';
import {
  DatePicker,
  TimePicker,
  DateTimePicker,
  DateRangePicker,
  DateTimeRangePicker,
  dayjs,
  Dayjs,
  RangeValue,
} from '../src';

export default function App() {
  const [themeColor, setThemeColor] = useState('#1677ff');
  const [borderRadius, setBorderRadius] = useState(6);
  const [isDark, setIsDark] = useState(false);

  // States for interactive demos
  const [singleDate, setSingleDate] = useState<Dayjs | null>(dayjs());
  const [singleTime, setSingleTime] = useState<Dayjs | null>(dayjs());
  const [singleDateTime, setSingleDateTime] = useState<Dayjs | null>(dayjs());
  const [dateRange, setDateRange] = useState<RangeValue>([
    dayjs().subtract(7, 'day'),
    dayjs(),
  ]);
  const [dateTimeRange, setDateTimeRange] = useState<RangeValue>([
    dayjs().subtract(3, 'day'),
    dayjs(),
  ]);

  const handleColorChange = (color: string) => {
    setThemeColor(color);
    document.documentElement.style.setProperty('--adp-primary-color', color);
    document.documentElement.style.setProperty('--adp-primary-hover', color + 'cc');
    document.documentElement.style.setProperty('--adp-border-focus', color);
  };

  const handleRadiusChange = (radius: number) => {
    setBorderRadius(radius);
    document.documentElement.style.setProperty('--adp-border-radius', `${radius}px`);
  };

  const toggleDark = () => {
    setIsDark(!isDark);
    if (!isDark) {
      document.documentElement.setAttribute('data-theme', 'dark');
    } else {
      document.documentElement.removeAttribute('data-theme');
    }
  };

  return (
    <div
      style={{
        minHeight: '100vh',
        background: isDark ? '#141414' : '#f5f5f5',
        color: isDark ? '#e6e6e6' : '#1f1f1f',
        fontFamily: "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
        padding: '32px 20px',
        transition: 'background 0.3s, color 0.3s',
      }}
    >
      <div style={{ maxWidth: 960, margin: '0 auto' }}>
        {/* Header */}
        <div style={{ marginBottom: 32, textAlign: 'center' }}>
          <div
            style={{
              display: 'inline-block',
              background: 'linear-gradient(135deg, #1677ff, #52c41a)',
              color: '#fff',
              fontSize: 12,
              fontWeight: 700,
              padding: '4px 12px',
              borderRadius: 20,
              marginBottom: 12,
              textTransform: 'uppercase',
              letterSpacing: 1,
            }}
          >
            Ant Design Inspired • Mobile Responsive • &lt; 15KB
          </div>
          <h1 style={{ margin: '0 0 8px 0', fontSize: 32, fontWeight: 700 }}>
            @abdulwaqar844/date-range-picker
          </h1>
          <p style={{ margin: 0, color: isDark ? '#8c8c8c' : '#666', fontSize: 16 }}>
            Production-ready React Date, Time, and Range Picker suite with zero heavy UI dependencies.
          </p>
        </div>

        {/* Live Theming Controller Bar */}
        <div
          style={{
            background: isDark ? '#1f1f1f' : '#fff',
            border: `1px solid ${isDark ? '#303030' : '#e8e8e8'}`,
            borderRadius: 12,
            padding: '16px 20px',
            marginBottom: 32,
            display: 'flex',
            flexWrap: 'wrap',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: 16,
            boxShadow: '0 2px 8px rgba(0,0,0,0.04)',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
            <span style={{ fontSize: 13, fontWeight: 600 }}>Brand Color:</span>
            <input
              type="color"
              value={themeColor}
              onChange={(e) => handleColorChange(e.target.value)}
              style={{
                width: 32,
                height: 32,
                border: 'none',
                borderRadius: 6,
                cursor: 'pointer',
              }}
            />
            <span style={{ fontSize: 13, color: '#888' }}>{themeColor}</span>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
            <span style={{ fontSize: 13, fontWeight: 600 }}>Border Radius:</span>
            <input
              type="range"
              min="0"
              max="16"
              value={borderRadius}
              onChange={(e) => handleRadiusChange(Number(e.target.value))}
              style={{ width: 100 }}
            />
            <span style={{ fontSize: 13, color: '#888' }}>{borderRadius}px</span>
          </div>

          <button
            onClick={toggleDark}
            style={{
              padding: '6px 14px',
              borderRadius: 6,
              border: `1px solid ${isDark ? '#434343' : '#d9d9d9'}`,
              background: isDark ? '#262626' : '#fff',
              color: isDark ? '#fff' : '#000',
              cursor: 'pointer',
              fontWeight: 500,
              fontSize: 13,
            }}
          >
            {isDark ? '☀️ Switch to Light' : '🌙 Switch to Dark'}
          </button>
        </div>

        {/* Component Demos Grid */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
          {/* 1. DatePicker */}
          <DemoCard
            title="1. Simple DatePicker"
            description="Single date selector with navigation controls, preset shortcuts, and disabled dates."
            isDark={isDark}
          >
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 20, alignItems: 'center' }}>
              <div>
                <div style={{ fontSize: 12, color: '#888', marginBottom: 6 }}>Default</div>
                <DatePicker
                  value={singleDate}
                  onChange={(d) => setSingleDate(d)}
                  placeholder="Select a date"
                />
              </div>

              <div>
                <div style={{ fontSize: 12, color: '#888', marginBottom: 6 }}>With Presets</div>
                <DatePicker
                  presets={[
                    { label: 'Today', value: dayjs() },
                    { label: 'Tomorrow', value: dayjs().add(1, 'day') },
                    { label: 'Next Week', value: dayjs().add(7, 'day') },
                  ]}
                  placeholder="Pick date with presets"
                />
              </div>

              <div>
                <div style={{ fontSize: 12, color: '#888', marginBottom: 6 }}>Sizes: Small & Large</div>
                <div style={{ display: 'flex', gap: 8 }}>
                  <DatePicker size="small" placeholder="Small" />
                  <DatePicker size="large" placeholder="Large" />
                </div>
              </div>
            </div>
            {singleDate && (
              <div style={{ marginTop: 12, fontSize: 13, color: 'var(--adp-primary-color)' }}>
                Selected: <strong>{singleDate.format('YYYY-MM-DD')}</strong>
              </div>
            )}
          </DemoCard>

          {/* 2. TimePicker */}
          <DemoCard
            title="2. Simple TimePicker"
            description="Column-scrolling time picker with 12h / 24h modes, custom step increments, and Now shortcut."
            isDark={isDark}
          >
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 20, alignItems: 'center' }}>
              <div>
                <div style={{ fontSize: 12, color: '#888', marginBottom: 6 }}>24-Hour Format</div>
                <TimePicker
                  value={singleTime}
                  onChange={(t) => setSingleTime(t)}
                  placeholder="Select time"
                />
              </div>

              <div>
                <div style={{ fontSize: 12, color: '#888', marginBottom: 6 }}>12-Hour (AM/PM)</div>
                <TimePicker
                  use12Hours
                  format="h:mm:ss A"
                  placeholder="12h AM/PM"
                />
              </div>

              <div>
                <div style={{ fontSize: 12, color: '#888', marginBottom: 6 }}>Custom Step (15 mins)</div>
                <TimePicker minuteStep={15} secondStep={30} placeholder="15-min step" />
              </div>
            </div>
            {singleTime && (
              <div style={{ marginTop: 12, fontSize: 13, color: 'var(--adp-primary-color)' }}>
                Selected: <strong>{singleTime.format('HH:mm:ss')}</strong>
              </div>
            )}
          </DemoCard>

          {/* 3. DateTimePicker */}
          <DemoCard
            title="3. Simple DateTimePicker"
            description="Combined calendar grid and time column scroller in a single unified view with OK confirmation."
            isDark={isDark}
          >
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 20, alignItems: 'center' }}>
              <DateTimePicker
                value={singleDateTime}
                onChange={(dt) => setSingleDateTime(dt)}
                onOk={(dt) => console.log('Confirmed datetime:', dt?.format())}
                placeholder="Select date & time"
              />
            </div>
            {singleDateTime && (
              <div style={{ marginTop: 12, fontSize: 13, color: 'var(--adp-primary-color)' }}>
                Selected: <strong>{singleDateTime.format('YYYY-MM-DD HH:mm:ss')}</strong>
              </div>
            )}
          </DemoCard>

          {/* 4. DateRangePicker */}
          <DemoCard
            title="4. DateRangePicker (Dual-Month)"
            description="Dual month side-by-side view with dynamic range hover highlights, unified dual input, and presets."
            isDark={isDark}
          >
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 20, alignItems: 'center' }}>
              <DateRangePicker
                value={dateRange}
                onChange={(r) => setDateRange(r)}
                presets={[
                  { label: 'Today', value: [dayjs(), dayjs()] },
                  { label: 'Last 7 Days', value: [dayjs().subtract(7, 'day'), dayjs()] },
                  { label: 'Last 30 Days', value: [dayjs().subtract(30, 'day'), dayjs()] },
                  { label: 'This Month', value: [dayjs().startOf('month'), dayjs().endOf('month')] },
                ]}
              />
            </div>
            {dateRange && dateRange[0] && dateRange[1] && (
              <div style={{ marginTop: 12, fontSize: 13, color: 'var(--adp-primary-color)' }}>
                Range: <strong>{dateRange[0].format('YYYY-MM-DD')}</strong> →{' '}
                <strong>{dateRange[1].format('YYYY-MM-DD')}</strong>
              </div>
            )}
          </DemoCard>

          {/* 5. DateTimeRangePicker */}
          <DemoCard
            title="5. DateTimeRangePicker"
            description="Dual month date range plus start time and end time scrollers with OK confirmation."
            isDark={isDark}
          >
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 20, alignItems: 'center' }}>
              <DateTimeRangePicker
                value={dateTimeRange}
                onChange={(r) => setDateTimeRange(r)}
                placeholder={['Start date & time', 'End date & time']}
              />
            </div>
            {dateTimeRange && dateTimeRange[0] && dateTimeRange[1] && (
              <div style={{ marginTop: 12, fontSize: 13, color: 'var(--adp-primary-color)' }}>
                Range: <strong>{dateTimeRange[0].format('YYYY-MM-DD HH:mm:ss')}</strong> →{' '}
                <strong>{dateTimeRange[1].format('YYYY-MM-DD HH:mm:ss')}</strong>
              </div>
            )}
          </DemoCard>
        </div>

        {/* Mobile Responsiveness Note */}
        <div
          style={{
            marginTop: 40,
            padding: '16px 20px',
            background: isDark ? '#1f1f1f' : '#e6f4ff',
            borderRadius: 8,
            border: `1px solid ${isDark ? '#303030' : '#91caff'}`,
            fontSize: 14,
            lineHeight: 1.6,
          }}
        >
          📱 <strong>Mobile Responsive Mode:</strong> Shrink your browser window to less than 768px (or inspect in Mobile Device mode in DevTools) and click any picker. It automatically transforms from a desktop floating popover into an easy-to-tap bottom sheet drawer!
        </div>
      </div>
    </div>
  );
}

function DemoCard({
  title,
  description,
  children,
  isDark,
}: {
  title: string;
  description: string;
  children: React.ReactNode;
  isDark: boolean;
}) {
  return (
    <div
      style={{
        background: isDark ? '#1f1f1f' : '#fff',
        border: `1px solid ${isDark ? '#303030' : '#e8e8e8'}`,
        borderRadius: 10,
        padding: '20px 24px',
        boxShadow: '0 2px 6px rgba(0,0,0,0.03)',
      }}
    >
      <h3 style={{ margin: '0 0 6px 0', fontSize: 18, fontWeight: 600 }}>{title}</h3>
      <p style={{ margin: '0 0 16px 0', color: isDark ? '#8c8c8c' : '#666', fontSize: 13 }}>
        {description}
      </p>
      {children}
    </div>
  );
}
