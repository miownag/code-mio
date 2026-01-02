"use client";

import { motion } from "framer-motion";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { posts } from "../data";
import { useEffect, useState } from "react";
import { serialize } from "next-mdx-remote/serialize";
import { MDXRemote, type MDXRemoteSerializeResult } from "next-mdx-remote";
import { mdxComponents } from "@/components/mdx-components";
import rehypeHighlight from "rehype-highlight";
import remarkGfm from "remark-gfm";
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

function MDXContent({ source }: { source: string }) {
  const [mdxContent, setMdxContent] = useState<MDXRemoteSerializeResult | null>(
    null
  );
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setIsLoading(true);
    serialize(source, {
      mdxOptions: {
        remarkPlugins: [remarkGfm],
        rehypePlugins: [rehypeHighlight],
      },
    })
      .then(setMdxContent)
      .finally(() => setIsLoading(false));
  }, [source]);

  if (isLoading) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="space-y-4"
      >
        <div className="h-4 w-full bg-muted/20 rounded animate-pulse" />
        <div className="h-4 w-full bg-muted/20 rounded animate-pulse" />
        <div className="h-4 w-3/4 bg-muted/20 rounded animate-pulse" />
      </motion.div>
    );
  }

  if (!mdxContent) return null;

  return <MDXRemote {...mdxContent} components={mdxComponents} />;
}

export default function PostPage({ params }: PostPageProps) {
  const [id, setId] = useState<string | null>(null);

  useEffect(() => {
    params.then((p) => setId(p.id));
  }, [params]);

  if (!id) {
    return null;
  }

  const post = posts.find((p) => p.id === id);

  if (!post) {
    return noPostContent;
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
            transition={{ duration: 0.3 }}
          >
            <h1 className="text-4xl font-bold mb-4">{post.title}</h1>

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

              <div className="text-foreground leading-relaxed post-content-font mdx-content">
                <MDXContent source={post.content} />
              </div>
            </div>
          </motion.div>
        </CardContent>
      </Card>
    </motion.div>
  );
}
