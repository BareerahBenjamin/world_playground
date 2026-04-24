# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm run dev        # Dev server on port 8080
npm run build      # Production build
npm run lint       # ESLint
npm run test       # Run tests once (Vitest)
npm run test:watch # Run tests in watch mode
```

## Architecture

**World · Playground** is a gamified personal growth React SPA. Users complete real-life quests, earn XP, and track progress on maps with an RPG/ink-aesthetic UI.

### Routing

Two zones in `App.tsx`:
- Standalone intro/narrative pages: `/intro/*`, `/letter`, `/login`, `/tower`
- Main app: all other routes wrapped in `AppLayout` (sticky header + 4-tab nav: Today / Goals / Map / Chronicle)

### Data Layer

All data lives in `src/data/` as static mock data — this is intentional and the designated swap point for a real backend:
- `world.ts` — core types (`Quest`, `JourneyRecord`, `MapPlace`) and mock player/map data
- `gamification.ts` — rarity, traits, titles, charms, fragments, combo system, weekly boss
- `goals.ts` — goals, milestones, friend quests, social quests
- `recordStore.ts` — the only real persistence: `localStorage` + `useUserRecords()` hook, broadcasts changes via custom DOM event `world-play:records-changed`

TanStack Query is set up but not yet heavily used — it's the intended wrapper when real API calls are added.

### Key Conventions

- Path alias `@/` maps to `src/`
- UI components use shadcn/ui (slate base, CSS variables) — add new primitives via `npx shadcn@latest add <component>`
- Tailwind dark mode is class-based (`next-themes` handles toggling)
- Icons: Lucide React for standard icons; `HandIcon.tsx` for custom hand-drawn SVG icons
- Forms: react-hook-form + zod
- Tests: Vitest + jsdom + @testing-library/react, setup file at `src/test/setup.ts`
