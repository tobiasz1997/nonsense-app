<div align="center">

<img src="public/logo.svg" alt="Nonsense App logo" width="96" height="96" />

# Nonsense App

**A handcrafted playground for ideas that don't have to make sense.**

A little curiosity. A new obsession. Another reason to write some code :)

<p>
  <img src="https://img.shields.io/badge/Next.js-183a1d?style=flat-square&amp;logo=nextdotjs&amp;logoColor=e1eedd" alt="Next.js" />
  <img src="https://img.shields.io/badge/React-183a1d?style=flat-square&amp;logo=react&amp;logoColor=e1eedd" alt="React" />
  <img src="https://img.shields.io/badge/TypeScript-183a1d?style=flat-square&amp;logo=typescript&amp;logoColor=e1eedd" alt="TypeScript" />
  <img src="https://img.shields.io/badge/Tailwind_CSS-183a1d?style=flat-square&amp;logo=tailwindcss&amp;logoColor=e1eedd" alt="Tailwind CSS" />
  <img src="https://img.shields.io/badge/Vitest-183a1d?style=flat-square&amp;logo=vitest&amp;logoColor=e1eedd" alt="Vitest" />
  <img src="https://img.shields.io/badge/Storybook-183a1d?style=flat-square&amp;logo=storybook&amp;logoColor=e1eedd" alt="Storybook" />
</p>

[About](#about) · [Features](#features) · [Stack](#stack) · [Getting started](#getting-started) · [TODO](#todo)

</div>

---

## About

My personal playground for whatever I feel like building, learning, or getting
excited about. Some ideas are useful, some are experiments, and some make no sense
at all. That's the point of Nonsense App :)

> **Handcrafted, with a little help.**
> I write and shape the application code myself, especially in `src/`, with AI as a
> supporting tool when I need help. The ideas, implementation, decisions, and
> ownership stay with me.

## Features

|                      | What you can play with                                                                                                    |
| -------------------- | ------------------------------------------------------------------------------------------------------------------------- |
| ✅ **Task list**     | Add, complete, delete, sort, and reorder tasks. Saved locally between visits.                                             |
| 🧮 **Algorithms**    | Fibonacci, binary search, insertion sort, and selection sort.                                                             |
| 👥 **Users table**   | API-backed user data with pagination and loading placeholders.                                                            |
| 🛠️ **Generators**    | PESEL, NIP, REGON, number arrays, and Lorem ipsum text, with configurable options and copying.                            |
| 🃏 **Blackjack**     | Hit, stand, double the bet, and track coins and results using the Deck of Cards API.                                      |
| 🎡 **Picker wheel**  | Manage options, colors, and active entries. Save locally, export/import through tokens, and download the winner as a PNG. |
| 📅 **Work schedule** | Build weekday-based schedules with projects, hours, and description templates. Export to PDF or XLSX.                     |
| 💬 **Random jokes**  | An API-powered joke waiting on the home page.                                                                             |

**Across the app:** Polish and English UI · Light and dark themes · Responsive layouts

## Stack

| Area                            | Main tools                                                   |
| ------------------------------- | ------------------------------------------------------------ |
| Application                     | **Next.js** with the Pages Router, **React**, **TypeScript** |
| State & data                    | **Redux Toolkit**, **React Redux**, **SWR**, **Axios**       |
| Forms & languages               | **React Hook Form**, **next-intl**                           |
| UI & motion                     | **Tailwind CSS**, **Framer Motion**, **Heroicons**           |
| Testing & component development | **Vitest**, **React Testing Library**, **Storybook**         |
| Code quality                    | **Oxlint**, **Oxfmt**                                        |

<details>
<summary><strong>A few more pieces under the hood</strong></summary>

- **@react-pdf/renderer** — PDF documents.
- **xlsx / xlsx-js-style** — spreadsheet exports and formatting.
- **classnames** — conditional CSS classes.
- **user-event / jest-dom** — user interactions and DOM assertions in tests.
- **Storybook controls and play functions** — interactive component examples.

</details>

## Getting started

Use **Node.js 24.x** with npm. The Node version is recorded in `.nvmrc` and is
also used by CI. If you use nvm, run `nvm use` (or select Node 24 manually).

Install the dependencies:

```bash
npm install
```

Copy [`.env.example`](.env.example) to `.env.local`. Generate your own secret:

```bash
node -e "console.log(require('node:crypto').randomBytes(32).toString('hex'))"
```

Set `JSON_SECRET_KEY` in `.env.local` to the generated value. This server-side key
is needed for picker wheel token export/import; the rest of the app can run
without it. Keep the same key to import previously generated tokens.
`NEXT_PUBLIC_APP_VERSION` is read automatically from `package.json`.

Only `.env.example` belongs in the repository; `.env.local` and other environment
files are ignored by Git.

Start the development server:

```bash
npm run dev
```

Open [localhost:3000](http://localhost:3000) and pick something to play with.

To explore components in isolation:

```bash
npm run storybook
```

Storybook runs at [localhost:6006](http://localhost:6006).

### Commit checks

Installing dependencies also sets up Git hooks through Husky. Before each commit,
the hooks check linting, formatting, TypeScript types, and run the full test suite.
They also validate the commit message against Conventional Commits. A failed
check stops the commit; files are not automatically fixed.

Use messages such as `fix(button): handle asynchronous clicks` or
`docs: update setup instructions`. See [AGENTS.md](AGENTS.md) for the conventions.

## TODO

- [ ] Add descriptions explaining the external APIs used by the app.
- [ ] Fix blackjack scoring, including recalculating an ace from 11 to 1 when a
      later card would otherwise push the hand over 21.
- [ ] Add Storybook accessibility checks with `@storybook/addon-a11y` and
      interaction tests for keyboard navigation, focus, and accessible names.
- [ ] Add `docs/architecture.md` covering routing, directory responsibilities,
      Redux vs SWR, translations, and the test/snapshot layout.
- [ ] Add an application screenshot or a feature collage to this README.

---

<div align="center">

Built out of curiosity. Occasionally useful. Always a playground.

</div>
