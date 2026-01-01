"use client";

import { motion } from "framer-motion";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { articles } from "../data";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { useEffect, useState } from "react";

interface ArticlePageProps {
  params: Promise<{
    id: string;
  }>;
}

export default function ArticlePage({ params }: ArticlePageProps) {
  const [id, setId] = useState<string | null>(null);

  useEffect(() => {
    params.then((p) => setId(p.id));
  }, [params]);

  if (!id) return null;

  const article = articles.find((a) => a.id === id);

  if (!article) {
    return (
      <div className="container mx-auto px-4 pt-16 pb-8 max-w-7xl">
        <Card className="p-8">
          <p className="text-center text-muted-foreground">Article not found</p>
        </Card>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 pt-16 pb-8 max-w-7xl">
      <div className="mb-12">
        <h1 className="text-4xl md:text-6xl font-light pixel-font mb-4 flex items-center gap-4">
          <div className="h-10 w-1 bg-primary" />
          Articles
        </h1>
        <p className="text-muted-foreground text-lg">
          My thoughts and learnings on web development, AI, and more.
        </p>
      </div>

      <div className="grid md:grid-cols-[300px_1fr] gap-8">
        {/* Article List - Left Side */}
        <div className="space-y-4">
          <h2 className="text-xl font-semibold mb-4">All Articles</h2>
          <nav className="flex flex-col gap-4">
            {articles.map((item) => (
              <Link key={item.id} href={`/articles/${item.id}`}>
                <div
                  className={cn(
                    "cursor-pointer transition-all duration-300 hover:bg-primary/5 rounded-lg p-2 -ml-2 flex flex-col",
                    {
                      "text-primary": item.id === id,
                    }
                  )}
                >
                  <h3
                    className={cn(
                      "font-semibold mb-2 line-clamp-2",
                      item.id === id && "text-primary"
                    )}
                  >
                    {item.title}
                  </h3>
                  <p className="text-sm text-muted-foreground">{item.date}</p>
                </div>
              </Link>
            ))}
          </nav>
        </div>

        {/* Article Content - Right Side */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <Card className="opacity-90 bg-[hsl(142,70%,2%)]">
            <CardContent className="px-8 py-4">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
              >
                <h1 className="text-3xl md:text-4xl font-bold mb-4">
                  {article.title}
                </h1>

                <div className="flex items-center gap-4 mb-6 text-muted-foreground">
                  <span>{article.date}</span>
                </div>

                <div className="flex flex-wrap gap-2 mb-8">
                  {article.tags.map((tag) => (
                    <Badge key={tag} variant="secondary">
                      {tag}
                    </Badge>
                  ))}
                </div>

                <div className="prose prose-invert max-w-none">
                  <p className="text-lg text-muted-foreground mb-6">
                    {article.excerpt}
                  </p>

                  <div className="text-foreground leading-relaxed chinese-font">
                    {article.content}
                  </div>
                </div>
              </motion.div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  );
}
