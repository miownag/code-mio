"use client";

import { motion } from "framer-motion";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { articles } from "../data";
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
      <Card className="p-8">
        <p className="text-center text-muted-foreground">Article not found</p>
      </Card>
    );
  }

  return (
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
  );
}
