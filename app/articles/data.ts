export interface Article {
  id: string;
  title: string;
  date: string;
  excerpt: string;
  content: string;
  tags: string[];
}

export const articles: Article[] = [
  {
    id: "ai-agent-patterns",
    title: "Understanding AI Agent Design Patterns",
    date: "2025-12-15",
    excerpt: "Exploring common patterns and best practices in building AI agents.",
    content: "一个人不可能比一个AI更智能，更智能的AI才是未来。",
    tags: ["AI", "Agent", "Design Patterns"],
  },
  {
    id: "nextjs-performance",
    title: "Next.js Performance Optimization Techniques",
    date: "2025-11-20",
    excerpt: "Learn how to optimize your Next.js applications for better performance.",
    content: "Performance is crucial for modern web applications. In this article, we'll explore various techniques...",
    tags: ["Next.js", "Performance", "React"],
  },
  {
    id: "typescript-advanced",
    title: "Advanced TypeScript Types",
    date: "2025-10-10",
    excerpt: "Deep dive into advanced TypeScript type system features.",
    content: "TypeScript's type system is incredibly powerful. Let's explore some advanced features...",
    tags: ["TypeScript", "Programming"],
  },
];
