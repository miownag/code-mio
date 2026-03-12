"use client";

import React, { useEffect, useState } from "react";
import { serialize } from "next-mdx-remote/serialize";
import { MDXRemote, type MDXRemoteSerializeResult } from "next-mdx-remote";
import remarkGfm from "remark-gfm";
import rehypePrism from "rehype-prism-plus";
import { TextMoment } from "@/types/moment";
import { cn } from "@/lib/utils";
import { Check, Copy } from "lucide-react";

function extractText(node: React.ReactNode): string {
  if (typeof node === "string") return node;
  if (typeof node === "number") return String(node);
  if (Array.isArray(node)) return node.map(extractText).join("");
  if (React.isValidElement(node))
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    return extractText((node.props as any).children);
  return "";
}

function BubbleCodeBlock(props: React.HTMLAttributes<HTMLPreElement>) {
  const [copied, setCopied] = useState(false);

  const className = props.className || "";
  const languageMatch = className.match(/language-(\w+)/);
  const language = languageMatch ? languageMatch[1] : "code";

  const handleCopy = async () => {
    await navigator.clipboard.writeText(extractText(props.children));
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="relative group my-2 border border-primary/20 rounded-lg overflow-hidden">
      <div className="flex items-center justify-between px-3 py-1.5 bg-muted">
        <span className="text-xs font-mono text-foreground/70 tracking-wider font-semibold">
          {language}
        </span>
        <button
          onClick={handleCopy}
          className={cn(
            "flex items-center gap-1 px-2 py-1 rounded-md text-xs transition-colors hover:bg-primary/10 text-foreground/90 hover:text-primary",
            { "cursor-pointer": !copied },
          )}
        >
          {copied ? (
            <Check className="w-3 h-3" />
          ) : (
            <Copy className="w-3 h-3" />
          )}
        </button>
      </div>
      <pre
        {...props}
        className={cn(
          "overflow-x-auto text-xs text-shadow-none px-3 py-2 font-mono bg-muted/20 m-0",
          props.className,
        )}
      />
    </div>
  );
}

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
  pre: BubbleCodeBlock,
  ul: (props: React.HTMLAttributes<HTMLUListElement>) => (
    <ul
      className="list-disc pl-4 space-y-1 text-sm marker:text-primary/80 mb-2"
      {...props}
    />
  ),
  ol: (props: React.OlHTMLAttributes<HTMLOListElement>) => (
    <ol
      className="list-decimal pl-4 space-y-1 text-sm marker:text-primary/80 mb-2"
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
      mdxOptions: {
        remarkPlugins: [remarkGfm],
        rehypePlugins: [rehypePrism],
      },
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
