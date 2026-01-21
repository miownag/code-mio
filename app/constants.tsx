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
    description: "Short-term employment, laid off as a fresh graduate.",
  },
];

const projects = [
  {
    name: "Chat Desktop App Boilerplate",
    description: "A full-stack AI chatbot desktop app boilerplate 🤖",
    tech: ["React", "Bun", "Hono", "PostgreSQL"],
    link: "https://github.com/miownag/chat-desktop-app-boilerplate",
    image: undefined, // Optional: Add image URL here
  },
  {
    name: "Billionaire CLI Framework",
    description:
      "A File-based Conventional CLI Framework built on Commander.js 💰",
    tech: ["Node.js", "TypeScript", "commander.js"],
    link: "https://github.com/miownag/bn-cli-framework",
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

export { tags, experiences, projects, recentLearning };
