# Repository Guidelines

## Project Structure & Module Organization

This repository contains `@abdulwaqar844/date-range-picker`, a React and TypeScript library providing `DatePicker`, `TimePicker`, `DateTimePicker`, `DateRangePicker`, and `DateTimeRangePicker`. It uses Day.js for date calculations and Floating UI for desktop popovers. React and React DOM are peer dependencies (React 18 or later).

- `src/components/<PickerName>/` contains picker implementations and barrel exports.
- `src/common/` contains shared triggers, calendar grids, headers, footers, presets, icons, and the mobile bottom sheet.
- `src/hooks/` contains calendar navigation, floating popover, and responsive viewport hooks.
- `src/utils/` contains date calculations and DOM helpers; `src/types/index.ts` defines public props and value types.
- `src/styles/` contains CSS with `adp-` classes and `--adp-*` theme variables; `index.css` imports the individual stylesheets.
- `src/index.ts` defines the package's public exports, including components, hooks, utilities, and types.
- `example/App.tsx` is the interactive showcase, loaded through `example/main.tsx` and the root `index.html`.
- `tests/` contains utility, rendering, and interaction regression tests. Root configuration files define TypeScript, tsup, Vite, and Vitest behavior.

Generated library output belongs in `dist/`, which is gitignored and should not be committed.

## Build, Test, and Development Commands

- Use a Node version supported by the locked development dependencies: Node 20.19+, Node 22.13+, or Node 24+. There is currently no `.nvmrc`, package `engines` field, or pinned npm version.
- After explicit approval to install dependencies, use `npm ci` to install from `package-lock.json` without updating it.
- `npm run dev` starts the Vite showcase on port 3000 (Vite may choose another port if occupied).
- `npm run lint` runs `tsc --noEmit`; it checks TypeScript under `src/`, not ESLint or formatting. The current tsconfig does not include `tests/` or `example/`.
- `npm test` runs `vitest run` with a jsdom environment and test globals enabled.
- `npm run build` runs tsup, cleans `dist/`, and generates CommonJS/ESM bundles, TypeScript declarations, source maps, and `style.css`. React and React DOM are externalized.

Additional release scripts: `npm run check` aliases the TypeScript check; `npm run pack:check` previews the npm tarball through `npm pack --dry-run`. The `prepack` lifecycle builds the library before packing/publishing, and `prepublishOnly` checks types and runs tests before publishing. Do not assume `start`, `preview`, `lint:fix`, or `prettier` scripts exist.

## Coding Style & Naming Conventions

Use TypeScript, ES modules, functional React components, and 2-space indentation. Follow the surrounding code's single quotes and semicolons; no ESLint or Prettier configuration is currently provided. Use PascalCase for component files (`DatePicker.tsx`), a `use` prefix for hooks (`useResponsive.ts`), and camelCase for utility modules (`dateUtils.ts`). TypeScript enables strict checking, unused-local/parameter checks, and switch fallthrough checks.

Keep picker-specific code in its component directory and shared UI in `src/common/`. Update public prop types and barrel exports when changing the API. Preserve the stylesheet export paths in `package.json` (`./style.css` and `./dist/style.css`). Keep visual styling in the existing CSS files and theme variables. The default mobile breakpoint is inclusive: viewport widths of 768px or less use the bottom sheet.

## Testing Guidelines

For changes, run `npm run check` (or `npm run lint`), `npm test`, and `npm run build`. For publishing changes, also run `npm run pack:check`. Report command failures or unavailable checks accurately. Vitest and React Testing Library are already configured; no coverage threshold is configured. Add regression tests under `tests/` using `*.test.ts` or `*.test.tsx`.

The suite covers date parsing/formatting, month matrices, decade years, range inclusion, initial rendering, and interaction regressions for mobile selection, clearing, and keyboard opening. These checks do not establish full interaction coverage. For behavior changes, test the affected selections, clearing, disabled values, callbacks, controlled/uncontrolled state, or range ordering as appropriate. Use fixed dates for deterministic calculations.

For UI changes, run `npm run dev` and exercise the affected pickers in the showcase, including opening/dismissal, date/time selection, range selection, confirmation, keyboard behavior, and desktop/mobile layouts. Check the 768px boundary and custom `mobileBreakpoint` values when changing responsive behavior. The showcase also provides color, border-radius, and dark-mode controls for styling checks.

## Commit & Pull Request Guidelines

Use concise, imperative Conventional Commit-style subjects with an appropriate prefix (`feat:`, `fix:`, `docs:`, `test:`, `chore:`, or `refactor:`). Keep commits focused. Pull requests should explain the user-visible change, list verification performed, link relevant issues, and include screenshots or recordings for UI changes. Call out public API, configuration, dependency, and stylesheet changes explicitly.

## Security & Configuration

The library and showcase currently require no environment variables. Vite's configuration does not add the legacy `REACT_APP_` prefix; its default browser-exposed prefix is `VITE_`. Never put secrets in browser-exposed values or commit credentials. Document any newly required configuration using safe placeholders. Keep React and React DOM as peer dependencies and obtain explicit approval before installing dependencies or publishing the package.

<!-- dev-agent-setup:begin -->
## Agent working agreement (dev-agent-setup)
- Examine existing code and tests before modifying files.
- Prefer minimal, reviewable changes; run tests and lint where available.
- Do not read or disclose .env files, credentials, tokens, private keys, or secrets.
- Request explicit approval before installing packages, publishing, pushing, changing infrastructure, or performing destructive operations.
- Never silently run destructive git operations or bypass sandbox/approval controls.
- Describe important changes and verification performed.
<!-- dev-agent-setup:end -->
