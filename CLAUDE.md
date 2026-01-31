# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

# Design Rules

- Style is PIXEL and simulate old computer screen
- Use Shadcn/ui components for UI elements and tailwindcss for styling

## Package Manager

Use Bun to install dependencies and run commands.

## Common Commands

- `bun run dev` - Start development server (No need to run this command after claude code work, I will check it by myself)
- `bun run build` - Build for production
- `bun run start` - Start production server
- `bun run lint` - Run ESLint

## Architecture

This is a personal portfolio website built as a single-page Next.js application with:

### Tech Stack

- **Next.js 16** with App Router (`app/` directory)
- **React 19** with TypeScript
- **Tailwind CSS 4** using the new `@tailwindcss/postcss` plugin
- **Framer Motion** for animations
- **Shadcn/ui** components for UI elements
- **Next.js Fonts**: Geist Sans, Geist Mono, and Jersey 10

### Project Structure

- `app/page.tsx` - Main page component with sections for hero, tags, work experience, projects, and recent learning
- `app/constants.tsx` - Content data (tags, experiences, projects, recentLearning)
- `app/layout.tsx` - Root layout with font configuration (dark mode forced)
- `app/globals.css` - Global styles with Tailwind CSS
- `components/` - Reusable components
  - `ui/` - Shadcn-style components (Badge, Button, Card)
  - `*` - Other common components
- `lib/utils.ts` - Utility functions (e.g., `cn()`)

### Path Alias

- `@/*` maps to the project root (configured in `tsconfig.json`)

### Key Patterns

- All page components use `motion.*` from Framer Motion for scroll-triggered animations
- All cards are clickable and open external links in new tabs
- Use kebab case for file names and component names
