# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

# Design Rules

- Use Shadcn/ui components for UI elements
- Black and Green color scheme, you can find primary color in `app/globals.css`

## Package Manager

Use Bun to install dependencies and run commands.

## Common Commands

- `bun run dev` - Start development server (runs on http://localhost:3000)
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
  - `particle-background.tsx` - Canvas-based particle animation with mouse interaction (repels/connects to particles)
  - `type-writer.tsx` - Animated typing effect with loop capability for dynamic text
  - `ui/` - Shadcn-style components (Badge, Button, Card)
- `lib/utils.ts` - `cn()` utility for merging Tailwind classes (clsx + tailwind-merge)

### Path Alias

- `@/*` maps to the project root (configured in `tsconfig.json`)

### Key Patterns

- All page components use `motion.*` from Framer Motion for scroll-triggered animations
- The particle background is an absolute positioned canvas that responds to mouse movement
- All cards are clickable and open external links in new tabs
- Dark mode is always enabled (`className="dark"` on html element)
