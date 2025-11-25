# Repository Guidelines

- Spark Space – Writing Game for Fortnite Kids

Spark Space is a web app that turns school writing assignments into a game.  
Teachers assign “quests”, students write with help from an AI tutor cat (Sage), and everyone stays inside a focused, low-friction writing flow.

Audience: **middle–high school students who love Fortnite-style games but “hate writing.”**  
Inspiration: **Duolingo’s habit loop** + **Fortnite’s lobby / battle pass energy**.

## 1. Product Overview

**Goal:**  
Help students become better, more confident writers by wrapping teacher-assigned work in a fun, game-like experience that still feels respectful and not childish.

**High-level concept:**

- Teachers create / assign writing tasks.
- Students see a **game lobby of writing quests** instead of a boring list of homework.
- Each quest has:
  - A cover image
  - Difficulty / type (“Quick Write”, “Essay”)
  - Word goal
  - coin rewards

  ## 2. Core Design Pillars

1. **One clear action at a time**
   - Entry: read instructions → tap **“I’m ready”**.
   - In-quest: write + chat with Sage, not wander through menus.

2. **Fortnite energy, Duolingo clarity**
   - Bold colors, mascot, rewards, coins.
   - But UI feels **simple and legible**, not chaotic.

3. **Tutor > Tools**
   - Students should feel like they’re “writing with Sage”, not fighting a complex app.
   - Sage is visible, alive, and clearly different from any support chat.

4. **Progressive disclosure**
   - First sessions: minimal UI (editor + tutor + word goal).
   - After they’ve written and graded at least once, more advanced tools unlock.

   ### 6.1. Frontend

- **Framework:** Next.js 15 (React, App Router)
  - Pros: SSR/ISR for marketing pages, good DX, easy routing.
- **Language:** TypeScript
- **Styling:** Tailwind CSS + a small custom component library
- **State management:**
  - React Query / TanStack Query for API data.
  - Simple `useState`/`useReducer` for local UI.
- **UI behavior:**
  - Framer Motion for light animations (cards, modals).
  - 3D Graphics: Three.js or Spline 
  


## Project Structure & Module Organization
Vite bootstraps the app from `src/main.tsx`, which renders routes exported from `src/pages`. Shared primitives live under `src/components`, with shadcn UI layers in `src/components/ui` and higher-level widgets like `AssignmentCard.tsx`. Hooks go to `src/hooks`, reusable helpers to `src/lib`, and static media to `src/assets`. Public-facing files (favicons, manifest) stay in `public`, while project configuration (Tailwind, ESLint, tsconfig, Vite) sits at the repo root. Keep any generated artifacts out of source—`dist/` is ignored.

## Build, Test, and Development Commands
- `npm run dev` (or `bun dev`) launches Vite with hot reload on http://localhost:5173.
- `npm run build` outputs an optimized bundle in `dist/` and is the gate before deployment.
- `npm run build:dev` mirrors production build flags but keeps development mode toggles for debugging bundle issues.
- `npm run preview` serves the built assets to verify deployment parity.
- `npm run lint` runs ESLint with the shared TS/React config; fix issues or add comments explaining necessary escapes.

## Coding Style & Naming Conventions
Use TypeScript and React function components with hooks; prefer composition via the shadcn primitives already in `src/components/ui`. Files and components should be PascalCase (`Header.tsx`, `LearningStatsCard`), hooks stay camelCase with `use` prefixes, and utility modules use kebab-case filenames. Tailwind handles layout/styling—co-locate utility classes within JSX, but extract repeated patterns into class helpers in `src/lib`. ESLint (extends `@eslint/js` + `typescript-eslint` + React Hooks) enforces import order, hook rules, and bans unused vars, so run `npm run lint` before opening a PR. Keep indentation at two spaces and favor early returns over deeply nested conditionals for clarity.

## Testing Guidelines
There is no automated test runner yet; manual QA happens through `npm run dev` and `npm run preview`. When adding logic-heavy modules, pair them with colocated `*.test.ts` or `*.test.tsx` files (Vitest + React Testing Library integrates cleanly with Vite). Prefer descriptive test names (`it("renders completed assignment badge")`). Until automated coverage is added, describe manual verification steps in your PR (routes visited, components exercised).

## Commit & Pull Request Guidelines
Commits in this repo use short, imperative subjects (e.g., `Implement Spark Space UI`). Keep related changes batched and include a body when context is non-obvious. For pull requests, link the tracking issue, summarize the UI or API impact, drop screenshots or Loom links for visual tweaks, and list manual test notes plus lint/build status. Request review before merging; avoid force pushes once review starts unless you coordinate.
