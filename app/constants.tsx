import { SiShopee, SiTencentqq, SiTiktok } from "react-icons/si";

const tags = [
  { name: "TypeScript", category: "Technology" },
  { name: "React", category: "Technology" },
  { name: "Node.js", category: "Technology" },
  { name: "⚽️ Man City", category: "Hobby" },
  { name: "🎮 LOL", category: "Hobby" },
  { name: "🎤 Singing", category: "Hobby" },
  { name: "🚴 Bicycling", category: "Hobby" },
];

const experiences = [
  {
    company: "Tencent",
    icon: <SiTencentqq />,
    position: "Frontend Engineer",
    department: "CDG-AMS",
    period: "2024.06 - Present",
    description:
      "In charge of the low-code platform, PC Advertising SDK, and other related business.",
  },
  {
    company: "ByteDance",
    icon: <SiTiktok />,
    position: "Frontend Engineer",
    department: "Customer Service Platform",
    period: "2022.10 - 2024.06",
    description:
      "Support Douyin's customer service. As a member of the FE arch team, responsible for Hi CLI.",
  },
  {
    company: "Shopee",
    icon: <SiShopee />,
    position: "Frontend Engineer",
    department: "APP Performance",
    period: "2022.07 - 2022.09",
    description: "Laid off as a fresh graduate.",
  },
];

const projects = [
  {
    name: "Chat Desktop App Boilerplate",
    description: "A full-stack AI chatbot desktop app boilerplate",
    tech: ["React", "Bun", "Hono", "PostgreSQL"],
    link: "https://github.com/miownag/chat-desktop-app-boilerplate",
    image: undefined, // Optional: Add image URL here
  },
  {
    name: "Ink Markdown ES",
    description: "A lib for ink to render markdown in TUI",
    tech: ["Ink", "Marked", "highlight.js"],
    link: "https://github.com/miownag/ink-markdown-es",
    image: undefined, // Optional: Add image URL here
  },
  {
    name: "Code Agent Lite",
    description: "Just like Claude Code, but lite",
    tech: ["Ink", "Bun", "LangChain", "deepagents"],
    link: "https://github.com/miownag/code-agent-lite",
    image: undefined, // Optional: Add image URL here
  },
  {
    name: "Billionaire CLI Framework",
    description:
      "A File-based Conventional CLI Framework built on commander.js",
    tech: ["Node.js", "TypeScript", "commander.js"],
    link: "https://github.com/miownag/bn-cli-framework",
    image: undefined, // Optional: Add image URL here
  },
  {
    name: "3Domension",
    description: "3Domension is a lib that can trans DOM into 3 dimension",
    tech: ["CSS3"],
    link: "https://github.com/miownag/three-domension",
    image: undefined, // Optional: Add image URL here
  },
  {
    name: "Open Source Projects",
    description: "Contribute to open source projects and learn from others 😊",
    tech: ["Ant Design", "TDesign", "..."],
    link: "https://github.com/miownag?tab=repositories",
    image: undefined, // Optional: Add image URL here
  },
];

const photographs = [
  {
    id: 1,
    src: "/avatar.jpeg",
    alt: "Portrait photography",
    title: "Urban Portrait",
    description: "A candid portrait captured in the streets of the city.",
    span: "normal" as const,
    aspectRatio: "1/1", // 原图宽高比，用于 Dialog 展示
  },
  {
    id: 2,
    src: "/avatar.jpeg",
    alt: "Street photography",
    title: "City Life",
    description: "Exploring the rhythm and flow of urban environments.",
    span: "tall" as const,
    aspectRatio: "2/3", // 竖版照片
  },
  {
    id: 3,
    src: "/avatar.jpeg",
    alt: "Architecture photography",
    title: "Modern Lines",
    description: "The beauty of contemporary architecture and geometric forms.",
    span: "normal" as const,
    aspectRatio: "4/3", // 横版照片
  },
  {
    id: 4,
    src: "/avatar.jpeg",
    alt: "Landscape photography",
    title: "Golden Hour",
    description: "Capturing the magical light of sunset over the horizon.",
    span: "normal" as const,
    aspectRatio: "16/9", // 宽屏风景
  },
  {
    id: 5,
    src: "/avatar.jpeg",
    alt: "Nature photography",
    title: "Natural Beauty",
    description: "Finding peace and inspiration in natural landscapes.",
    span: "normal" as const,
    aspectRatio: "1/1",
  },
  {
    id: 6,
    src: "/avatar.jpeg",
    alt: "Travel photography",
    title: "Journey",
    description: "Moments captured during travels and adventures.",
    span: "tall" as const,
    aspectRatio: "3/4", // 竖版
  },
  {
    id: 7,
    src: "/avatar.jpeg",
    alt: "Night photography",
    title: "Night Lights",
    description: "The city comes alive after dark with neon and shadows.",
    span: "normal" as const,
    aspectRatio: "4/3",
  },
  {
    id: 8,
    src: "/avatar.jpeg",
    alt: "Minimalist photography",
    title: "Less is More",
    description: "Finding beauty in simplicity and negative space.",
    span: "normal" as const,
    aspectRatio: "1/1",
  },
];

const recentLearning = [
  {
    title: "Signs of introspection in large language models",
    source: "Anthropic",
    date: "2025-12",
    tags: ["AI", "LLM", "Introspection"],
    link: "https://www.anthropic.com/research/introspection",
  },
  {
    title: "Context Engineering for AI Agents: Lessons from Building Manus",
    source: "Manus",
    date: "2025-07",
    tags: ["Context Engineering", "Agent", "LLM"],
    link: "https://manus.im/blog/Context-Engineering-for-AI-Agents-Lessons-from-Building-Manus",
  },
  {
    title: "DeepWiki",
    source: "Devin",
    tags: ["Learning"],
    link: "https://deepwiki.com",
  },
];

export { tags, experiences, projects, photographs, recentLearning };
