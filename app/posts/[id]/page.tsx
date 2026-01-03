"use client";

import { motion } from "framer-motion";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { useEffect, useState } from "react";
import { serialize } from "next-mdx-remote/serialize";
import { useGetPostContent } from "@/hooks";
import { MDXRemote, type MDXRemoteSerializeResult } from "next-mdx-remote";
import { mdxComponents } from "@/components/mdx-components";
import rehypeHighlight from "rehype-highlight";
import rehypeSlug from "rehype-slug";
import remarkGfm from "remark-gfm";
import TableOfContents from "@/components/table-of-contents";
import { useParams } from "next/navigation";
import { Skeleton } from "@/components/ui/skeleton";
import NoPost from "@/components/no-post";

const loadingContent = (
  <motion.div
    initial={{ opacity: 0, x: 20 }}
    animate={{ opacity: 1, x: 0 }}
    transition={{ duration: 0.5, delay: 0.2 }}
    className="flex gap-8"
  >
    <Card className="p-8 w-3/4">
      <div className="space-y-4">
        <Skeleton className="h-10 w-3/4" />
        <Skeleton className="h-4 w-1/4" />
        <div className="flex gap-2">
          <Skeleton className="h-6 w-16" />
          <Skeleton className="h-6 w-16" />
        </div>
        <div className="space-y-3 pt-6">
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-3/4" />
        </div>
      </div>
    </Card>
  </motion.div>
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
        rehypePlugins: [rehypeSlug, rehypeHighlight],
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
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-3/4" />
      </motion.div>
    );
  }

  if (!mdxContent) return null;

  return <MDXRemote {...mdxContent} components={mdxComponents} />;
}

export default function PostPage() {
  const { id } = useParams<{ id: string }>();
  const { data: { data: post } = {}, isLoading } = useGetPostContent(id);

  if (!id) {
    return (
      <NoPost
        title="No such post"
        content="You can check posts by click left list."
      />
    );
  }

  if (isLoading) {
    return loadingContent;
  }

  if (!post) {
    return (
      <NoPost
        title="No such post"
        content="You can check posts by click left list."
      />
    );
  }

  return (
    <div className="flex gap-8">
      <Card className="opacity-90 bg-[hsl(142,70%,2%)] flex-1 min-w-0">
        <CardContent className="px-8 py-4">
          <div>
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
          </div>
        </CardContent>
      </Card>

      {/* Table of Contents - hidden on mobile */}
      <aside className="hidden xl:block shrink-0">
        <div className="sticky top-20">
          <TableOfContents content={post.content} />
        </div>
      </aside>
    </div>
  );
}
