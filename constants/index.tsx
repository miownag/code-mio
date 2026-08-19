import { SiBytedance, SiTencentqq } from "react-icons/si";

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
    company: "ByteDance",
    icon: <SiBytedance />,
    position: "AI Coding Develop Engineer",
    department: "Douyin AI4SE",
    period: "2026.07 - Present",
    description:
      "Building a cloud-based Coding Agent platform and the Douyin HarmonyOS harness.",
  },
  {
    company: "Tencent",
    icon: <SiTencentqq />,
    position: "Frontend Engineer",
    department: "CDG-AMS",
    period: "2024.06 - 2026.06",
    description:
      "In charge of the low-code platform, PC Advertising SDK, and other related business.",
  },
  {
    company: "ByteDance",
    icon: <SiBytedance />,
    position: "Frontend Engineer",
    department: "Customer Service Platform",
    period: "2022.10 - 2024.06",
    description:
      "Support Douyin's customer service. As a member of the FE arch team, responsible for Hi CLI.",
  },
];

const recentLearning = [
  {
    title: "Context Engineering for AI Agents: Lessons from Building Manus",
    source: "Manus",
    date: "2025-07",
    tags: ["Context Engineering", "Agent", "LLM"],
    link: "https://manus.im/blog/Context-Engineering-for-AI-Agents-Lessons-from-Building-Manus",
  },
];

export { tags, experiences, recentLearning };
