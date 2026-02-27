import { Moment } from "@/types/moment";

const moments: Moment[] = [
  {
    id: "moment-1",
    type: "text",
    date: "2026-02-27",
    pinned: true,
    content:
      "Welcome to my moments! Here I share random thoughts, new articles, and photography updates.",
  },
  {
    id: "moment-2",
    type: "post",
    date: "2026-02-01",
    postId: "mcp-to-skills",
    comment: "发表了一篇关于渐进式披露的思考。",
  },
  {
    id: "moment-3",
    type: "photo",
    date: "2026-01-20",
    photoIds: [25, 6],
    caption: "Some of my favorite shots from recent trips.",
  },
  {
    id: "moment-4",
    type: "text",
    date: "2026-01-15",
    content:
      "Been diving deep into **Rust** and `WebAssembly` lately. The performance gains are incredible.",
  },
];

export { moments };
