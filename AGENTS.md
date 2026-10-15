# Repository Guidelines

## Project Structure & Module Organization

This repository is a Vite-powered React dashboard built with Material UI. Application code lives in `src/`: route-level screens are in `src/pages`, reusable UI in `src/components`, feature compositions in `src/sections`, layouts in `src/layouts`, Redux state in `src/redux`, and shared helpers in `src/hooks` and `src/utils`. Theme configuration is under `src/theme`, authentication providers and guards are in `src/auth`, and translations live in `src/locales`. Static files served unchanged belong in `public/`; imported data and graphics belong in `src/assets`. Production output is generated in `dist/` and should not be committed.

## Build, Test, and Development Commands

- `npm install` installs the locked dependencies. Use Node 24 (`.nvmrc`) and npm 11.
- `npm run dev` starts the Vite development server; `npm start` is an alias.
- `npm run build` creates the production bundle in `dist/`.
- `npm run preview` serves the built bundle for local verification.
- `npm run lint` checks all JavaScript and JSX with ESLint.
- `npm run lint:fix` applies safe lint fixes; `npm run prettier` formats `src/**/*.{js,jsx}`.

## Coding Style & Naming Conventions

Use ES modules, functional React components, and 2-space indentation. Prettier enforces single quotes, trailing ES5 commas, and a 100-character line width. ESLint extends Airbnb, React Hooks, and Prettier rules. Name components and page files in PascalCase (`ProductDetailsSummary.jsx`), hooks with a `use` prefix (`useResponsive.js`), and utility modules in camelCase. Keep feature-specific code near its page or section; promote code to `src/components` only when it is genuinely reusable.

## Testing Guidelines

No automated test runner or coverage threshold is currently configured. For every change, run `npm run lint` and `npm run build`, then exercise affected routes with `npm run dev`. When introducing tests, colocate them with the implementation using `*.test.js` or `*.test.jsx`, and add the runner command to `package.json` and this guide.

## Commit & Pull Request Guidelines

Recent history primarily follows Conventional Commit-style subjects such as `chore: update dependencies`; use concise, imperative subjects with an appropriate prefix (`feat:`, `fix:`, `chore:`, or `refactor:`). Keep commits focused. Pull requests should explain the user-visible change, list verification performed, link relevant issues, and include screenshots or recordings for UI changes. Call out configuration, dependency, or environment-variable changes explicitly.

## Security & Configuration

Vite accepts both `VITE_` and legacy `REACT_APP_` environment variable prefixes. Never commit secrets: browser-exposed environment values are public by design. Document any new required variable and provide a safe placeholder rather than credentials.

<!-- dev-agent-setup:begin -->
## Agent working agreement (dev-agent-setup)
- Examine existing code and tests before modifying files.
- Prefer minimal, reviewable changes; run tests and lint where available.
- Do not read or disclose .env files, credentials, tokens, private keys, or secrets.
- Request explicit approval before installing packages, publishing, pushing, changing infrastructure, or performing destructive operations.
- Never silently run destructive git operations or bypass sandbox/approval controls.
- Describe important changes and verification performed.
<!-- dev-agent-setup:end -->
