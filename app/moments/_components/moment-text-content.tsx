"use client";

import { useEffect, useState } from "react";
import { serialize } from "next-mdx-remote/serialize";
import { MDXRemote, type MDXRemoteSerializeResult } from "next-mdx-remote";
import remarkGfm from "remark-gfm";
import { TextMoment } from "@/types/moment";

const bubbleMdxComponents = {
  p: (props: React.HTMLAttributes<HTMLParagraphElement>) => (
    <p
      className="leading-relaxed text-foreground/90 text-sm [&:last-child]:mb-0 mb-2"
      {...props}
    />
  ),
  a: (props: React.AnchorHTMLAttributes<HTMLAnchorElement>) => (
    <a
      className="text-primary hover:underline transition-colors"
      target="_blank"
      rel="noopener noreferrer"
      {...props}
    />
  ),
  strong: (props: React.HTMLAttributes<HTMLElement>) => (
    <strong className="font-bold text-primary/90" {...props} />
  ),
  em: (props: React.HTMLAttributes<HTMLElement>) => (
    <em className="italic text-foreground/95" {...props} />
  ),
  code: (props: React.HTMLAttributes<HTMLElement>) => (
    <code
      className="rounded px-1 py-0.5 text-xs text-primary border border-primary/20 bg-muted"
      {...props}
    />
  ),
  ul: (props: React.HTMLAttributes<HTMLUListElement>) => (
    <ul
      className="list-disc pl-4 space-y-1 text-sm marker:text-primary/80"
      {...props}
    />
  ),
  ol: (props: React.OlHTMLAttributes<HTMLOListElement>) => (
    <ol
      className="list-decimal pl-4 space-y-1 text-sm marker:text-primary/80"
      {...props}
    />
  ),
  blockquote: (
    props: React.BlockquoteHTMLAttributes<HTMLQuoteElement>,
  ) => (
    <blockquote
      className="pl-3 border-l-2 border-primary italic text-muted-foreground text-sm my-2"
      {...props}
    />
  ),
};

interface Props {
  moment: TextMoment;
}

export default function MomentTextContent({ moment }: Props) {
  const [mdx, setMdx] = useState<MDXRemoteSerializeResult | null>(null);

  useEffect(() => {
    serialize(moment.content, {
      mdxOptions: { remarkPlugins: [remarkGfm] },
    }).then(setMdx);
  }, [moment.content]);

  if (!mdx) {
    return (
      <p className="text-sm text-muted-foreground animate-pulse">Loading...</p>
    );
  }

  return (
    <div className="post-content-font">
      <MDXRemote {...mdx} components={bubbleMdxComponents} />
    </div>
  );
}
