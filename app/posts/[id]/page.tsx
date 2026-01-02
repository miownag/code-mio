"use client";

import { motion } from "framer-motion";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { posts } from "../data";
import { useEffect, useState } from "react";
import {
  Empty,
  EmptyContent,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "@/components/ui/empty";
import { MdBrowserNotSupported } from "react-icons/md";

interface PostPageProps {
  params: Promise<{
    id: string;
  }>;
}

const noIdContent = (
  <Card className="opacity-90 bg-[hsl(142,70%,2%)]">
    <CardContent className="px-8 py-4">
      <div className="space-y-4">
        <Skeleton className="h-12 w-3/4" />
        <div className="flex items-center gap-4">
          <Skeleton className="h-4 w-24" />
        </div>
        <div className="flex flex-wrap gap-2">
          <Skeleton className="h-6 w-16" />
          <Skeleton className="h-6 w-16" />
          <Skeleton className="h-6 w-16" />
        </div>
        <Skeleton className="h-24 w-full" />
        <Skeleton className="h-96 w-full" />
      </div>
    </CardContent>
  </Card>
);

const noPostContent = (
  <Card className="p-8">
    <Empty>
      <EmptyHeader>
        <EmptyMedia variant="icon">
          <MdBrowserNotSupported />
        </EmptyMedia>
        <EmptyTitle>No such post</EmptyTitle>
      </EmptyHeader>
      <EmptyContent className="text-primary">
        You can click posts left to read.
      </EmptyContent>
    </Empty>
  </Card>
);

export default function PostPage({ params }: PostPageProps) {
  const [id, setId] = useState<string | null>(null);

  useEffect(() => {
    params.then((p) => setId(p.id));
  }, [params]);

  if (!id) {
    return (
      <Card className="opacity-90 bg-[hsl(142,70%,2%)]">
        <CardContent className="px-8 py-4">
          <div className="space-y-4">
            <Skeleton className="h-12 w-3/4" />
            <div className="flex items-center gap-4">
              <Skeleton className="h-4 w-24" />
            </div>
            <div className="flex flex-wrap gap-2">
              <Skeleton className="h-6 w-16" />
              <Skeleton className="h-6 w-16" />
              <Skeleton className="h-6 w-16" />
            </div>
            <Skeleton className="h-24 w-full" />
            <Skeleton className="h-96 w-full" />
          </div>
        </CardContent>
      </Card>
    );
  }

  const post = posts.find((p) => p.id === id);

  if (!post) {
    return (
      <Card className="p-8">
        <Empty>
          <EmptyHeader>
            <EmptyMedia variant="icon">
              <MdBrowserNotSupported />
            </EmptyMedia>
            <EmptyTitle>No such post</EmptyTitle>
          </EmptyHeader>
          <EmptyContent className="text-primary">
            You can click posts left to read.
          </EmptyContent>
        </Empty>
      </Card>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
    >
      <Card className="opacity-90 bg-[hsl(142,70%,2%)]">
        <CardContent className="px-8 py-4">
          {!id && noIdContent}
          {!post && noPostContent}
          {post && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.2 }}
            >
              <h1 className="text-3xl md:text-4xl font-bold mb-4">
                {post.title}
              </h1>

              <div className="flex items-center gap-4 mb-6 text-muted-foreground">
                <span>{post.date}</span>
              </div>

              <div className="flex flex-wrap gap-2 mb-8">
                {post.tags.map((tag) => (
                  <Badge key={tag} variant="secondary">
                    {tag}
                  </Badge>
                ))}
              </div>

              <div className="prose prose-invert max-w-none">
                <p className="text-lg text-muted-foreground mb-6">
                  {post.excerpt}
                </p>

                <div className="text-foreground leading-relaxed chinese-font">
                  {post.content}
                </div>
              </div>
            </motion.div>
          )}
        </CardContent>
      </Card>
    </motion.div>
  );
}
