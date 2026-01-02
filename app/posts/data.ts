export interface Article {
  id: string;
  title: string;
  date: string;
  excerpt: string;
  content: string;
  tags: string[];
}

export const posts: Article[] = [
  {
    id: "ai-agent-patterns",
    title: "Understanding AI Agent Design Patterns",
    date: "2025-12-15",
    excerpt: "Exploring common patterns and best practices in building AI agents.",
    content: `
# AI Agent Design Patterns

AI agents are becoming increasingly sophisticated. Let's explore the key patterns that make them effective.

## Core Patterns

### 1. ReAct Pattern

[ReAct Pattern](https://arxiv.org/abs/2210.03629)

The **ReAct** (Reasoning + Acting) pattern combines:
- **Reasoning**: The agent thinks about what to do
- **Acting**: The agent takes action based on reasoning
- **Observing**: The agent observes the results

\`\`\`typescript
// define the ReActAgent interface
interface ReActAgent {
  reason(observation: string): string;
  act(reasoning: string): Action;
  observe(action: Action): string;
}
\`\`\`

### 2. Chain of Thought

> "Breaking down complex problems into simpler steps leads to better reasoning."

This pattern involves:
1. Decompose the problem
2. Solve each sub-problem
3. Combine the solutions

## Key Takeaways

- Agents need clear **mental models**
- Tools should be \`composable\` and \`reusable\`
- State management is critical

---

一个人不可能比一个AI更智能，更智能的AI才是未来。
`,
    tags: ["AI", "Agent", "Design Patterns"],
  },
  {
    id: "nextjs-performance",
    title: "Next.js Performance Optimization Techniques",
    date: "2025-11-20",
    excerpt: "Learn how to optimize your Next.js applications for better performance.",
    content: `
# Next.js Performance Optimization

Performance is **crucial** for modern web applications. Let's dive into techniques that can dramatically improve your Next.js app.

## Image Optimization

Next.js provides the \`<Image>\` component with automatic optimization:

\`\`\`jsx
import Image from 'next/image'

export function Hero() {
  return (
    <Image
      src="/hero.jpg"
      alt="Hero"
      width={1200}
      height={600}
      priority
    />
  )
}
\`\`\`

### Benefits:
- Automatic format optimization (WebP, AVIF)
- Lazy loading by default
- Responsive images
- Blur placeholder support

## Code Splitting Strategies

| Strategy | Use Case | Performance Impact |
|----------|----------|-------------------|
| Dynamic Imports | Large components | High |
| Route-based | Default Next.js | Medium |
| Component-level | Heavy libraries | High |

### Example Dynamic Import:

\`\`\`typescript
import dynamic from 'next/dynamic'

const HeavyComponent = dynamic(() => import('./HeavyComponent'), {
  loading: () => <Skeleton />,
  ssr: false
})
\`\`\`

## Caching Strategies

> Cache what's expensive, invalidate what's changed.

1. **Static Generation** - Pre-render at build time
2. **ISR** - Regenerate static pages periodically
3. **Client-side Cache** - React Query, SWR

---

*Performance optimization is an ongoing process, not a one-time task.*
`,
    tags: ["Next.js", "Performance", "React"],
  },
  {
    id: "typescript-advanced",
    title: "Advanced TypeScript Types",
    date: "2025-10-10",
    excerpt: "Deep dive into advanced TypeScript type system features.",
    content: `
# Advanced TypeScript Types

TypeScript's type system is incredibly powerful. Let's explore advanced features that make your code more type-safe and maintainable.

## Mapped Types

Transform existing types into new types:

\`\`\`typescript
type Readonly<T> = {
  readonly [P in keyof T]: T[P];
}

type Partial<T> = {
  [P in keyof T]?: T[P];
}
\`\`\`

## Conditional Types

Create types that depend on conditions:

\`\`\`typescript
type IsString<T> = T extends string ? true : false;

type A = IsString<"hello">; // true
type B = IsString<42>;      // false
\`\`\`

## Template Literal Types

Build types from string patterns:

\`\`\`typescript
type EventName = \`on\${Capitalize<string>}\`;
// "onClick", "onHover", etc.

type CSSProperty = \`--\${string}\`;
// "--primary-color", "--font-size", etc.
\`\`\`

## Utility Types in Practice

Here's a real-world example:

\`\`\`typescript
interface User {
  id: string;
  name: string;
  email: string;
  password: string;
}

// Public user data (exclude password)
type PublicUser = Omit<User, 'password'>;

// User update data (all optional except id)
type UserUpdate = Partial<User> & Pick<User, 'id'>;
\`\`\`

### Key Benefits:
- **Type Safety**: Catch errors at compile time
- **Intellisense**: Better IDE support
- **Refactoring**: Safe code changes
- **Documentation**: Types as documentation

---

> "TypeScript doesn't just catch bugs, it prevents them from being written."

一个好的类型系统可以让代码更加健壮和易于维护。
`,
    tags: ["TypeScript", "Programming"],
  },
];
