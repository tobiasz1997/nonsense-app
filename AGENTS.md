# AGENTS.md

## Purpose

Instructions for AI coding agents working in this repository. Follow the existing codebase and these rules when implementing features, fixing bugs, refactoring, or writing tests. Prefer small, reviewable changes over broad rewrites.

## Mandatory user approval before any change (highest priority)

**The user must explicitly approve every proposed change before the agent makes it.** A request to implement a feature, fix a bug, refactor, or perform another task is **not** permission to edit files or modify the project.

1. **Inspect first (read-only).** You may read files, search the repository, and analyze the problem without approval, provided these actions do not modify files, project state, or external resources.
2. **Explain the proposed change before acting.** Tell the user what you want to change, why it is needed, and which files, configurations, dependencies, or other resources would be affected. Mention any commands that may alter project state.
3. **Ask for explicit approval and wait.** Ask a clear question such as: **"Czy zatwierdzasz wprowadzenie opisanych zmian?"** Do not start editing, generating files, installing packages, running auto-fix/format commands, or performing any other state-changing action before the user agrees.
4. **Approve changes individually.** Obtain approval for each distinct proposed change. A single response may approve multiple changes only when they were all clearly itemized beforehand and the user explicitly approved that entire list. Do not treat silence, an ambiguous reply, or a general request as approval.
5. **Stay within the approved scope.** If implementation reveals the need to modify additional files, change the approach, run a new state-changing command, or perform any unapproved work, stop, explain the new change, and ask again before proceeding.
6. **No exceptions for small edits.** The requirement also applies to trivial fixes, test updates, translations, configuration changes, dependency changes, formatting, generated files, and deletions.
7. **Report afterward.** Once approved changes are completed, summarize exactly what was modified and which checks were performed. Never claim that unapproved changes were made or that checks passed without running them.

Read-only diagnostics may be performed without prior approval only if they have no side effects. If a command may write files, modify caches, install dependencies, contact external systems with side effects, or otherwise change state, disclose it and obtain approval first. If uncertain whether an operation is read-only, treat it as state-changing.

**This approval rule overrides all implementation, verification, and workflow guidance elsewhere in this file.**

## Technology stack

- Framework: Next.js 16, React 19, React DOM 19.
- Language: TypeScript 7.
- Styling: Tailwind CSS 4, PostCSS, `@tailwindcss/forms`, `@tailwindcss/typography`, `@tailwindcss/line-clamp`, `classnames`.
- UI and animation: `@heroicons/react`, `framer-motion`.
- State and data: Redux Toolkit, React Redux, SWR, Axios.
- Forms: React Hook Form.
- Internationalization: `next-intl`.
- Documents and exports: `@react-pdf/renderer`, `xlsx`, `xlsx-js-style`.
- Utilities: `uuid`, `copy-to-clipboard`, `delay`.
- Testing: Vitest, Testing Library, `jest-dom`, `user-event`, jsdom.
- Component development: Storybook 10 with `@storybook/nextjs`.
- Quality tools: `oxlint`, `oxfmt`, `prettier-plugin-tailwindcss`.

Use the versions and conventions already installed in the project. Do not replace the existing stack or add overlapping libraries without a clear reason.

## Repository structure

This project uses the Next.js Pages Router. Preserve the existing structure.

- `src/pages/` — page routes, `_app.tsx`, and `_document.tsx`.
- `src/pages/api/` — server-side API endpoints.
- `src/components/ui/` — reusable UI primitives and form controls.
- `src/components/layouts/` — page layouts and layout selection.
- `src/components/features/` — feature-specific components and helpers, grouped by feature.
- `src/api/` — API clients, data hooks, async actions, and endpoint constants.
- `src/hooks/` — shared React hooks.
- `src/providers/` — locale, theme, and SWR providers.
- `src/store/` — Redux store, feature slices, and middleware.
- `src/interfaces/` — shared TypeScript types and interfaces.
- `src/routes/` — route definitions and navigation metadata.
- `src/const/` — shared constants, including storage keys.
- `src/crypto/` — encryption and decryption utilities.
- `src/utils/` — shared utilities, validators, generators, and option lists.
- `src/styles/` — global application styles.
- `messages/` — Polish and English translation files.
- `public/` — static assets, including the logo and language flags.
- `__tests__/` — component, feature, and utility tests, including snapshots.
- `__mocks__/` — shared test mocks.
- `stories/` — Storybook stories for components, features, and layouts.
- `.storybook/` — Storybook configuration and global decorators.
- `.github/workflows/` — CI workflows.

Keep feature-specific helpers beside their feature. Put shared logic in
the appropriate shared directory. Follow the path aliases defined in
`tsconfig.json`.

Treat `node_modules/`, `.next/`, `.swc/`, and `coverage/` as generated
directories; do not edit their contents manually.

## Before changing code

Follow the mandatory approval procedure above before making any modification.

1. Read the relevant files, nearby components, and existing tests before making changes.
2. Inspect `package.json` scripts, the lockfile, and project configuration before running commands. Use the package manager indicated by the existing lockfile; do not assume npm, pnpm, Yarn, or Bun.
3. Identify whether the affected route uses the Next.js App Router (`app/` or `src/app/`) or Pages Router (`pages/` or `src/pages/`). Preserve its architecture and conventions.
4. Reuse existing components, hooks, types, API clients, utilities, translations, and patterns rather than duplicating them.
5. Do not reorganize directories, rename exports, or modify unrelated files unless necessary for the task.
6. If an important detail is missing, make the smallest reasonable assumption and clearly state it in the final summary.

## Next.js and React

- Prefer Server Components for noninteractive UI and server-side data access in the App Router.
- Add `'use client'` only when a component needs state, event handlers, effects, browser APIs, or client-only libraries. Keep client boundaries as small as practical.
- Never import server-only modules, secrets, or privileged API clients into Client Components.
- In Next.js 16 App Router code, account for asynchronous dynamic APIs such as `params` and `searchParams`; follow the installed Next.js API instead of copying older patterns.
- Use Next.js routing, layouts, loading/error boundaries, metadata APIs, and image/link primitives where appropriate to the existing router.
- In Next.js 16, prefer the `proxy.ts` convention for new request interception code rather than creating a new `middleware.ts`, unless the repository has a deliberate legacy pattern. Do not use Proxy as a substitute for backend authorization.
- Make caching explicit when behavior matters. Do not assume API responses are automatically cached; choose caching/revalidation according to freshness and authorization requirements.
- Avoid unnecessary `useEffect`, derived React state, prop drilling, and client-side fetching when a simpler server-rendered approach is available.
- Use stable keys for lists, semantic HTML, and accessible interactive elements.
- Be mindful of hydration differences and never access `window`, `document`, or `localStorage` during server rendering.

## Code structure and declaration order

Use a predictable declaration order when **creating new files or writing new components and custom hooks**. This is a convention for readability, not a reason to rearrange existing code.

### File-level order for new files

1. Next.js/React directives when required (for example, `'use client'`).
2. Imports, following the repository's established import groups and ordering.
3. Types and interfaces.
4. Constants and configuration values.
5. Public/exported components, hooks, and functions.
6. Private (non-exported) helper functions and utilities.

Keep required Next.js exports and file conventions intact. Avoid unnecessary wrappers and place shared helpers outside components when they do not need access to component scope.

### Order inside new React components and custom hooks

1. Props and arguments (including destructuring).
2. Translation and framework hooks, with `useTranslations` first among these when used; follow the translation rules below and assign its result to `t`.
3. State hooks (`useState`).
4. Reducer hooks (`useReducer`) and their associated state/dispatch bindings.
5. Ref hooks (`useRef`).
6. Other library hooks (for example, React Redux and React Hook Form hooks) and project-specific custom hooks, including data hooks such as `useSWR`; preserve any necessary dependencies between hooks.
7. Derived values and memoized computations (`useMemo`).
8. Memoized callbacks (`useCallback`).
9. Side effects (`useEffect`, `useLayoutEffect`), grouped after the other hooks.
10. Event handlers and action functions (for example, `handleClick`, `handleSubmit`).
11. Private local helper functions.
12. JSX `return` for components, or the returned value for custom hooks.

Additional conventions:

- Keep related `useState` calls together and related `useReducer` calls together. Use the project's existing naming and initialization patterns; do not switch between `useState` and `useReducer` just to satisfy ordering.
- Call `useTranslations` once per translating component or hook; use the variable `t` and the correct relative or fully qualified keys as specified in **Internationalization**.
- Place custom hooks after basic state/ref setup when their inputs depend on that setup. If a hook needs a derived value or callback first, preserve valid data dependencies instead of forcing the listed order.
- Follow React's Rules of Hooks: call hooks unconditionally and in a stable order, before conditional returns. Never move a hook across a conditional boundary or change its call order in a way that could alter behavior.
- Group `useEffect` declarations consistently, but do not create an effect solely to fit this structure. Respect dependency arrays and cleanup requirements.
- Name event handlers with the `handle` prefix where it matches existing conventions; prefer clear names for private helpers.

### Never reorder existing code without a request

- **Do not change the current order of existing imports, types, constants, hooks, state declarations, reducers, translation calls, effects, callbacks, handlers, functions, exports, or JSX sections unless the user explicitly requests that reordering.**
- This restriction applies even when the existing order differs from the recommended structure, even during otherwise approved feature work or bug fixes, and even if a formatter or linter suggests a different order.
- When adding code to an existing file, follow its current organization as closely as possible and insert only what the approved task requires; leave unrelated declarations in their original positions.
- If a change appears to require reordering to work correctly, explain what must move and why, then request **separate explicit approval for that reordering** before doing it.
- The mandatory user-approval rule at the top of this document still applies to **all** changes, including additions that do not reorder anything.

## TypeScript and code style

- Write typed, readable code. Prefer `type`/`interface` definitions that match existing project conventions.
- Avoid `any`, unsafe casts, non-null assertions, and `@ts-ignore`. If an exception is unavoidable, explain why.
- Keep components and functions focused. Extract shared logic only when it is genuinely reused or significantly improves clarity.
- Prefer named exports where the repository does so; preserve default exports required by Next.js file conventions.
- Follow existing path aliases and import ordering; do not assume an `@/` alias exists without checking `tsconfig.json`.
- Prefer `async`/`await` with explicit error handling over deeply nested promise chains.
- Use the existing `classnames` package to compose conditional classes when needed.
- Follow configured `oxlint`, `oxfmt`, and Tailwind class formatting rules. Do not invent or impose a new formatter/linter configuration.
- Avoid adding a new dependency for a feature already covered by an installed package.

## Styling and UI

- Use Tailwind CSS 4 utilities and the project's existing tokens, theme, and global styles.
- Do not introduce Tailwind CSS 3-only configuration patterns by default. Respect the project's current Tailwind 4/PostCSS setup.
- Prefer reusable components and consistent spacing, typography, states, and responsive behavior.
- Use `@heroicons/react` for icons where appropriate; do not add another icon library without a reason.
- Use `framer-motion` only when animation improves UX. Respect reduced-motion preferences and avoid excessive animation.
- Ensure keyboard navigation, visible focus styles, accessible labels, sufficient contrast, and clear loading/empty/error states.
- Avoid inline styles and custom CSS when existing Tailwind utilities or design tokens solve the problem clearly.

## Data fetching and state management

- Prefer server-side data fetching for App Router content that does not require client-side live updates.
- Use SWR for client-side remote data, caching, revalidation, and request states when appropriate.
- Use Redux Toolkit / React Redux for genuinely shared client application state. Do not duplicate SWR-managed server data in Redux without a specific need.
- Keep transient local UI state in React component state rather than automatically putting it in Redux.
- Follow the existing Axios or `fetch` abstraction for API calls; do not create competing API clients.
- Handle loading, empty, error, and success states. Propagate useful errors without leaking sensitive information.
- Avoid exposing credentials and tokens to browser code. Do not keep a shared per-request user state in a server-side Redux singleton.
- Validate untrusted data at appropriate boundaries using the project's existing validation strategy; do not assume a validation package is installed.

## Forms

- Prefer React Hook Form for nontrivial forms.
- Define form values with TypeScript and provide sensible defaults.
- Reuse existing validation patterns; do not introduce `zod`, `yup`, or resolver packages unless requested or justified.
- Surface field-level errors accessibly, prevent unintended duplicate submissions, and handle server failures.
- Keep form logic separate from unrelated presentation concerns when doing so improves maintainability.

## Internationalization

- Follow the existing `next-intl` setup, routing configuration, locale conventions, and message file organization.
- Do not hardcode user-facing strings in localized screens. Add or update translation keys for every supported locale when changing visible copy.
- Reuse existing namespaces and keys where appropriate; avoid near-duplicate translations.
- Format dates, numbers, and currencies with locale-aware APIs; do not assume a single locale or timezone.
- Keep interpolation variables typed and avoid constructing translations by concatenating fragments.

### Translation hook and key conventions

- Use `next-intl` and always name the translation function `t`.
- Call `useTranslations` **exactly once** per component or custom hook that uses translations.
- If a file uses keys from only one top-level translation namespace, pass that namespace to `useTranslations` and use relative keys:

  ```tsx
  const t = useTranslations('common');
  t('yes');
  ```

- If a file uses keys from multiple top-level translation namespaces, call `useTranslations` without a namespace and use fully qualified keys:

  ```tsx
  const t = useTranslations();
  t('common.yes');
  t('generators.divider');
  ```

- Do not create additional translation functions or aliases such as `translate`, `tCommon`, or `tGenerator`.
- When adding or removing translation namespaces used by a file, update the `useTranslations` call and **all** translation keys in that file to follow the rules above.
- Keep the sets of translation keys **identical** in `messages/pl.json` and `messages/en.json`. Whenever a key is added, renamed, or removed, apply the same change to both files.

## PDF and spreadsheet exports

- Use `@react-pdf/renderer` for PDF generation according to existing application patterns.
- Use the installed SheetJS `xlsx` package for spreadsheet reading/writing and `xlsx-js-style` only where its styling functionality is required. Do not assume these packages are interchangeable.
- Generate downloads on the client or server deliberately based on data sensitivity, library compatibility, bundle size, and the existing architecture.
- Avoid importing heavyweight export libraries into unrelated client entry points; consider lazy loading for user-triggered exports.
- Handle malformed input, empty datasets, invalid values, and user-safe filenames.
- For exported data, protect against spreadsheet formula injection when cells may contain untrusted strings, and avoid exporting secrets.
- Preserve expected columns, formatting, sheet names, and document layouts when modifying an existing export.

## Testing and Storybook

- Use Vitest and Testing Library for unit and component tests. Prefer user-observable behavior over implementation details.
- Use `user-event` for realistic interaction tests and `jest-dom` matchers where configured.
- Use jsdom for browser-oriented component tests if the repository's test configuration requires it.
- Add or update regression tests for bug fixes and meaningful changes when practical.
- Mock network calls and external boundaries intentionally; avoid brittle snapshots and over-mocking internal components.
- Keep Storybook stories aligned with existing conventions. Cover important visual states such as default, loading, empty, error, and disabled when relevant.
- Test accessibility-sensitive interactions (labels, keyboard behavior, roles) where applicable.
- Do not claim tests passed unless they were actually executed.

## Security and performance

- Never commit `.env` secrets, credentials, tokens, private keys, or confidential data.
- Do not expose server-only environment variables through `NEXT_PUBLIC_` or Client Components.
- Enforce authorization on trusted server boundaries, not only through UI checks or Proxy redirects.
- Validate user input and treat API responses and uploaded files as untrusted.
- Avoid `dangerouslySetInnerHTML` unless absolutely necessary and properly sanitized.
- Keep client bundles lean: minimize `'use client'` scope, avoid duplicate dependencies, and lazy-load heavyweight interactive utilities when appropriate.
- Pay attention to unnecessary rerenders, large Redux state, over-fetching, and accidental repeated requests.

## Commands and verification

- Use only scripts that actually exist in `package.json`.
- After approval, run relevant available checks for the changed scope only when those checks are read-only or their side effects were separately disclosed and approved: type checking, linting, formatting verification, and tests. Run a production build only after approval because it generates files.
- If scripts are absent, use already-installed tools directly only after inspecting their configuration; do not invent project scripts.
- Do not regenerate the lockfile, upgrade dependencies, change package-manager versions, or install new packages unless the task requires it.
- Do not disable tests, lint rules, or TypeScript checks just to make a change pass.
- Do not run destructive commands or overwrite user changes without explicit authorization.

## Expected agent workflow

1. **Understand:** Inspect related source files, configuration, tests, and conventions.
2. **Plan:** Choose the smallest change that solves the request; identify exact files, actions, and side effects.
3. **Request approval:** Explain each proposed change, ask for explicit user approval, and wait before making any modification.
4. **Implement only approved changes:** Write maintainable, typed code using the installed stack. Seek new approval if scope changes.
5. **Verify:** Run authorized targeted checks and inspect the final diff for unrelated changes.
6. **Report:** Summarize what changed, which checks ran and their results, and any remaining risks or assumptions.

## Priorities

When instructions conflict, follow this order:

1. Applicable safety/security constraints and the mandatory explicit approval requirement above.
2. The user's explicitly approved scope of work.
3. Existing repository behavior, architecture, and documented conventions.
4. The remaining rules in this `AGENTS.md`.
5. General framework/library conventions.

If a rule in this document does not apply to the actual repository (for example, a Pages Router project or an unconfigured Storybook setup), do not force it into the codebase.
