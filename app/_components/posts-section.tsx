"use client";

import { motion } from "framer-motion";
import { Badge } from "@/components/ui/badge";
import { LuArrowUpRight, LuArrowRight } from "react-icons/lu";
import { recentLearning } from "@/constants";
import Link from "next/link";
import Subtitle from "./subtitle";
import { cn } from "@/lib/utils";
import { useEffect, useState } from "react";
import { PostMetadata, ApiResponse } from "@/types/post";

type PostItem = {
  id?: string;
  title: string;
  source?: string;
  date?: string;
  tags: string[];
  link?: string;
  type: "post" | "learning";
};

export default function PostsSection() {
  const [items, setItems] = useState<PostItem[]>([]);

  useEffect(() => {
    async function fetchAndMerge() {
      // 转换 recentLearning 为统一格式
      const learningItems: PostItem[] = recentLearning.map((item) => ({
        title: item.title,
        source: item.source,
        date: item.date,
        tags: item.tags,
        link: item.link,
        type: "learning" as const,
      }));

      try {
        // 从 API 获取 posts
        const res = await fetch("/api/posts");
        const json: ApiResponse<PostMetadata[]> = await res.json();

        if (json.data) {
          const postItems: PostItem[] = json.data.map((post) => ({
            id: post.id,
            title: post.title,
            date: post.date,
            tags: post.tags,
            type: "post" as const,
          }));

          // 合并并按时间倒序排序
          const merged = [...postItems, ...learningItems].sort((a, b) => {
            const dateA = a.date ? new Date(a.date).getTime() : 0;
            const dateB = b.date ? new Date(b.date).getTime() : 0;
            return dateB - dateA;
          });

          // 取最新的 1 篇 post 和 2 篇 learning
          const posts = merged
            .filter((item) => item.type === "post")
            .slice(0, 1);
          const learnings = merged
            .filter((item) => item.type === "learning")
            .slice(0, 2);

          setItems([...posts, ...learnings]);
        } else {
          // 如果 API 出错，只显示 learning
          setItems(learningItems.slice(0, 2));
        }
      } catch {
        // 如果请求失败，只显示 learning
        setItems(learningItems.slice(0, 2));
      }
    }

    fetchAndMerge();
  }, []);

  return (
    <motion.section
      id="posts"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-100px" }}
      className="mb-20"
    >
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        className="flex items-center justify-between mb-8"
      >
        <Subtitle>Posts & Learning</Subtitle>
        <Link href="/posts">
          <motion.div
            className="flex items-center gap-2 hover:text-primary transition-colors pixel-font text-xl"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            View More
            <LuArrowRight className="h-4 w-4" />
          </motion.div>
        </Link>
      </motion.div>

      <div className="flex flex-col">
        {items.map((item, index) => {
          const isPost = item.type === "post";

          const content = (
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              className={cn(
                "group flex pr-4 items-start gap-4 py-5 transition-all cursor-pointer",
                "border-b border-border/30",
                index === items.length - 1 && "border-b-0",
              )}
            >
              <span className="text-primary pixel-font text-2xl shrink-0">
                {">"}
              </span>

              <div className="flex flex-col gap-2 flex-1 min-w-0">
                <div className="flex items-center gap-2">
                  <h3 className="text-lg font-medium group-hover:text-primary transition-colors">
                    {item.title}
                  </h3>
                  {isPost && (
                    <Badge className="pixel-font text-md h-4">My Post</Badge>
                  )}
                </div>
                <div className="flex items-center gap-2 text-sm text-muted-foreground mb-2">
                  {item.date && (
                    <span className="font-mono">[{item.date}]</span>
                  )}
                  {!isPost && item.source && <span>{item.source}</span>}
                  {isPost && "Mio"}
                </div>
                <div className="flex flex-wrap gap-2">
                  {item.tags.map((tag) => (
                    <Badge
                      key={tag}
                      variant="outline"
                      className="text-xs text-muted-foreground hover:text-foreground hover:border-primary/30 transition-colors"
                    >
                      {tag}
                    </Badge>
                  ))}
                </div>
              </div>

              <LuArrowUpRight
                className={cn(
                  "h-5 w-5 shrink-0 text-muted-foreground transition-all duration-200 mt-1",
                  "group-hover:rotate-45 group-hover:text-primary ",
                )}
              />
            </motion.div>
          );

          if (isPost) {
            return (
              <Link key={item.id || index} href={`/posts/${item.id}`}>
                {content}
              </Link>
            );
          }

          return (
            <a
              key={item.id || index}
              href={item.link}
              target="_blank"
              rel="noopener noreferrer"
            >
              {content}
            </a>
          );
        })}
      </div>
    </motion.section>
  );
}
