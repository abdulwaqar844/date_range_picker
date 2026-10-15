# simple-daterange_picker

An ultra-lightweight, Ant Design-inspired, mobile-responsive Date & Time Picker suite for React.

Houses **DatePicker**, **TimePicker**, **DateTimePicker**, **DateRangePicker**, and **DateTimeRangePicker** in a single production-ready package with **zero heavy UI framework dependencies** (no Emotion, no Styled-Components, no MUI core).

[![npm version](https://img.shields.io/badge/npm-v1.0.0-blue.svg)](https://www.npmjs.com/package/simple-daterange_picker)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![Bundle Size](https://img.shields.io/badge/bundle%20size-%3C15KB%20gzip-brightgreen.svg)]()

---

## ✨ Why this package?

* 🪶 **Ultra Lightweight (< 15KB gzipped)**: 10x lighter than MUI X-Date-Pickers (~180KB). Built on top of `dayjs` (2KB core) and `@floating-ui/react`.
* 💎 **Ant Design Aesthetics**: Clean borders, unified range inputs, column-scrolling time selection, and range hover highlighting.
* 📱 **Mobile-First Adaptive UX**: Automatically transitions from a floating popover on desktop to an easy-to-tap **Bottom Sheet Drawer** on mobile screens (`< 768px`).
* 🆓 **100% Free & Open Source**: Full dual-month `DateRangePicker` and `DateTimeRangePicker` included under MIT (unlike MUI X Pro which locks range pickers behind a paid commercial license).
* 🎨 **Zero-Runtime Theming**: Fully customizable with CSS Variables (`--adp-*`) and clean classes compatible with Tailwind CSS and CSS Modules.
* 🛡️ **TypeScript & A11y Ready**: Complete TypeScript declarations, ARIA combobox/dialog roles, and keyboard navigation.

---

## 📦 Installation

```bash
npm install simple-daterange_picker dayjs
# or
pnpm add simple-daterange_picker dayjs
# or
yarn add simple-daterange_picker dayjs
```

### Import Styles
Import the stylesheet once in your app entrypoint (`App.tsx` or `main.tsx`):
```tsx
import 'simple-daterange_picker/dist/style.css';
```

---

## 🚀 Quick Start & Examples

### 1. Simple DatePicker
```tsx
import { DatePicker, dayjs } from 'simple-daterange_picker';
import 'simple-daterange_picker/dist/style.css';

export function Example() {
  return (
    <DatePicker
      placeholder="Select date"
      format="YYYY-MM-DD"
      onChange={(date, dateString) => console.log(date, dateString)}
      presets={[
        { label: 'Today', value: dayjs() },
        { label: 'Tomorrow', value: dayjs().add(1, 'day') },
      ]}
    />
  );
}
```

### 2. Simple TimePicker
```tsx
import { TimePicker } from 'simple-daterange_picker';

export function Example() {
  return (
    <TimePicker
      format="HH:mm:ss"
      placeholder="Select time"
      minuteStep={5}
      secondStep={10}
      showNow
      onChange={(time, timeString) => console.log(time, timeString)}
    />
  );
}
```

### 3. Simple DateTimePicker
```tsx
import { DateTimePicker } from 'simple-daterange_picker';

export function Example() {
  return (
    <DateTimePicker
      format="YYYY-MM-DD HH:mm:ss"
      placeholder="Select date & time"
      onOk={(date) => console.log('Confirmed:', date)}
    />
  );
}
```

### 4. DateRangePicker (Dual-Month)
```tsx
import { DateRangePicker, dayjs } from 'simple-daterange_picker';

export function Example() {
  return (
    <DateRangePicker
      placeholder={['Start date', 'End date']}
      presets={[
        { label: 'Last 7 Days', value: [dayjs().subtract(7, 'day'), dayjs()] },
        { label: 'Last 30 Days', value: [dayjs().subtract(30, 'day'), dayjs()] },
        { label: 'This Month', value: [dayjs().startOf('month'), dayjs().endOf('month')] },
      ]}
      onChange={(dates, dateStrings) => console.log('Range:', dates, dateStrings)}
    />
  );
}
```

### 5. DateTimeRangePicker
```tsx
import { DateTimeRangePicker } from 'simple-daterange_picker';

export function Example() {
  return (
    <DateTimeRangePicker
      format="YYYY-MM-DD HH:mm:ss"
      placeholder={['Start date & time', 'End date & time']}
      onOk={(dates) => console.log('Confirmed range:', dates)}
    />
  );
}
```

---

## 🎨 Theming & CSS Variables

You can easily customize the appearance using CSS variables globally or locally:

```css
:root {
  /* Brand color */
  --adp-primary-color: #1677ff;
  --adp-primary-hover: #4096ff;
  --adp-range-bg: #e6f4ff;

  /* Typography & Geometry */
  --adp-font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
  --adp-font-size: 14px;
  --adp-border-radius: 6px;
  --adp-border-color: #d9d9d9;
}

/* Instant Dark Mode Support */
[data-theme='dark'], .dark {
  --adp-text-color: rgba(255, 255, 255, 0.85);
  --adp-border-color: #424242;
  --adp-bg-color: #141414;
  --adp-panel-bg: #1f1f1f;
  --adp-range-bg: #111d2c;
}
```

---

## 📱 Mobile Responsiveness

The suite automatically monitors screen size and device touch capability:
* **Desktop (`> 768px`)**: Positions as a floating popover anchored to the input using `@floating-ui/react`.
* **Mobile (`<= 768px`)**: Automatically opens as a smooth bottom-sheet drawer with 44px touch-friendly targets, preventing viewport overflow.
* You can customize the breakpoint with the `mobileBreakpoint` prop (e.g. `mobileBreakpoint={640}`).

---

## 📊 Props Reference

| Prop | Type | Default | Description |
| :--- | :--- | :--- | :--- |
| `value` | `Dayjs \| string \| RangeValue` | `undefined` | Controlled value |
| `defaultValue` | `Dayjs \| string \| RangeValue` | `undefined` | Initial uncontrolled value |
| `onChange` | `Function` | `undefined` | Callback fired on value change |
| `format` | `string` | Component-specific | Date/time format token (`YYYY-MM-DD`) |
| `placeholder` | `string \| [string, string]` | `undefined` | Input placeholder(s) |
| `disabled` | `boolean \| [boolean, boolean]` | `false` | Disable input or range half |
| `allowClear` | `boolean` | `true` | Show clear ("X") button |
| `size` | `'small' \| 'middle' \| 'large'` | `'middle'` | Input height and font variant |
| `status` | `'error' \| 'warning'` | `undefined` | Validation outline status |
| `bordered` | `boolean` | `true` | Show border around trigger |
| `disabledDate` | `(currentDate: Dayjs) => boolean` | `undefined` | Disable specific calendar days |
| `presets` | `Array<{ label, value }>` | `[]` | Shortcut preset buttons |
| `renderExtraFooter`| `() => ReactNode` | `undefined` | Custom footer render slot |
| `mobileBreakpoint` | `number` | `768` | Width in px to trigger mobile bottom drawer |

---

## 🛠️ Development & Interactive Showcase

To run the interactive preview showcase locally:

```bash
# Start Vite development server
npm run dev

# Run unit tests
npm run test

# Build production bundle
npm run build
```

---

## Publishing to npm

Use Node 24 and npm 11.5.1 or later for the release workflow.

Before publishing, run:

```bash
npm run check
npm test
npm run pack:check
```

`check` runs the TypeScript check. `pack:check` builds the library through `prepack` and previews the files that npm would publish without uploading anything. The package includes `dist/`, `README.md`, `LICENSE`, and package metadata. `npm publish` also runs the checks/tests and rebuilds the library through its lifecycle scripts.

For an initial local publication, after verification passes:

```bash
npm login
npm publish
```

Make sure the package name is available or belongs to your npm account. Package metadata points to [abdulwaqar844/simple-daterange_picker](https://github.com/abdulwaqar844/simple-daterange_picker). Do not store npm credentials in the repository.

For subsequent GitHub Actions publications, configure the package's npm Trusted Publisher with GitHub owner `abdulwaqar844`, repository `simple-daterange_picker`, workflow filename `publish.yml`, and permission to publish directly using `npm publish`. The workflow uses OIDC with `id-token: write`; it does not require a committed npm token. See the [npm trusted publishing documentation](https://docs.npmjs.com/trusted-publishers/).

The workflow verifies pushes to `main`, pull requests, and manual runs. Publishing occurs only when a GitHub Release is published after verification succeeds. The release tag must match `v` plus the package version (currently `v1.0.0`). Increment the version in both package manifests before publishing later releases; npm does not allow reusing a published name/version combination.

---

## 📄 License
MIT © [Abdul Waqar](https://github.com/abdulwaqar844)
