"use client";

import React, { useState } from "react";
import { cn } from "@/lib/utils";
import Image from "next/image";
import { Check, Copy } from "lucide-react";
import { Button } from "./ui/button";

// Code block component with language label and copy button
function CodeBlock(props: React.HTMLAttributes<HTMLPreElement>) {
  const [copied, setCopied] = useState(false);

  // Extract language from className (e.g., "language-tsx")
  const className = props.className || "";
  const languageMatch = className.match(/language-(\w+)/);
  const language = languageMatch ? languageMatch[1] : "code";

  // Get the code content - recursively extract text from React elements
  const getCodeContent = (): string => {
    const extractText = (node: React.ReactNode): string => {
      if (typeof node === "string") {
        return node;
      }
      if (typeof node === "number") {
        return String(node);
      }
      if (Array.isArray(node)) {
        return node.map(extractText).join("");
      }
      if (React.isValidElement(node)) {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        return extractText((node.props as any).children);
      }
      return "";
    };

    return extractText(props.children);
  };

  const handleCopy = async () => {
    const code = getCodeContent();
    await navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="relative group my-6 border border-primary/20 rounded-lg overflow-hidden">
      {/* Language label and copy button bar */}
      <div className="flex items-center justify-between px-4 py-2 bg-muted">
        <span className="text-xs font-mono text-foreground/70 uppercase tracking-wider font-semibold">
          {language}
        </span>
        <Button
          variant="ghost"
          onClick={handleCopy}
          className={cn(
            "rounded-lg text-xs transition-colors hover:bg-primary/10 text-foreground/70 hover:text-primary",
            { "cursor-pointer": !copied }
          )}
        >
          {copied ? (
            <>
              <Check className="w-3.5 h-3.5" />
              <span>Copied!</span>
            </>
          ) : (
            <>
              <Copy className="w-3.5 h-3.5" />
              <span>Copy</span>
            </>
          )}
        </Button>
      </div>
      {/* Code block */}
      <pre
        {...props}
        className={cn(
          "overflow-x-auto shadow-lg text-sm text-shadow-none px-4 py-3 font-mono bg-muted/70 m-0",
          props.className
        )}
      />
    </div>
  );
}

export const mdxComponents = {
  // Headings
  h1: (props: React.HTMLAttributes<HTMLHeadingElement>) => (
    <h1
      id={props.id}
      className="text-4xl md:text-5xl font-bold text-foreground mt-10 mb-6 scroll-m-20"
      {...props}
    />
  ),
  h2: (props: React.HTMLAttributes<HTMLHeadingElement>) => (
    <h2
      id={props.id}
      className="text-3xl md:text-4xl font-bold text-foreground mt-8 mb-4 pb-2 scroll-m-20"
      {...props}
    />
  ),
  h3: (props: React.HTMLAttributes<HTMLHeadingElement>) => (
    <h3
      id={props.id}
      className="text-2xl md:text-3xl font-bold text-foreground mt-6 mb-3 scroll-m-20"
      {...props}
    />
  ),
  h4: (props: React.HTMLAttributes<HTMLHeadingElement>) => (
    <h4
      className="text-xl md:text-2xl font-bold text-foreground mt-4 mb-2 scroll-m-20"
      {...props}
    />
  ),
  h5: (props: React.HTMLAttributes<HTMLHeadingElement>) => (
    <h5
      className="text-lg md:text-xl font-bold text-foreground mt-3 mb-2"
      {...props}
    />
  ),
  h6: (props: React.HTMLAttributes<HTMLHeadingElement>) => (
    <h6
      className="text-base md:text-lg font-bold text-foreground mt-3 mb-2"
      {...props}
    />
  ),

  // Paragraph
  p: (props: React.HTMLAttributes<HTMLParagraphElement>) => (
    <p className="leading-relaxed mb-4 text-foreground/90" {...props} />
  ),

  // Links
  a: (props: React.AnchorHTMLAttributes<HTMLAnchorElement>) => (
    <a
      className="text-blue-400 hover:text-blue-600 underline-offset-4 underline transition-colors font-medium"
      target={props.href?.startsWith("http") ? "_blank" : undefined}
      rel={props.href?.startsWith("http") ? "noopener noreferrer" : undefined}
      {...props}
    />
  ),

  // Strong and Emphasis
  strong: (props: React.HTMLAttributes<HTMLElement>) => (
    <strong className="font-bold text-primary/90" {...props} />
  ),
  em: (props: React.HTMLAttributes<HTMLElement>) => (
    <em className="italic text-foreground/95" {...props} />
  ),

  // Code
  code: (props: React.HTMLAttributes<HTMLElement>) => {
    return (
      <code
        className="rounded px-1.5 py-0.5 mx-1 text-sm text-primary border border-primary/20 bg-muted text-shadow-none"
        {...props}
      />
    );
  },

  // Pre (code blocks)
  pre: CodeBlock,

  // Lists
  ul: (props: React.HTMLAttributes<HTMLUListElement>) => (
    <ul
      className="list-disc pl-6 space-y-2 mb-4 marker:text-primary/80"
      {...props}
    />
  ),
  ol: (props: React.OlHTMLAttributes<HTMLOListElement>) => (
    <ol
      className="list-decimal pl-6 space-y-2 mb-4 marker:text-primary/80 marker:font-semibold"
      {...props}
    />
  ),
  li: (props: React.LiHTMLAttributes<HTMLLIElement>) => (
    <li className="text-foreground/90 leading-relaxed" {...props} />
  ),

  // Blockquote
  blockquote: (props: React.BlockquoteHTMLAttributes<HTMLQuoteElement>) => (
    <blockquote
      className="pl-4 border-l-4 border-primary italic text-muted-foreground my-6 bg-primary/5 py-3 rounded-r"
      {...props}
    >
      <div className="[&>p:last-child]:mb-0">{props.children}</div>
    </blockquote>
  ),

  // Horizontal Rule
  hr: (props: React.HTMLAttributes<HTMLHRElement>) => (
    <hr
      className="my-8 border-0 h-px bg-linear-to-r from-transparent via-primary to-transparent"
      {...props}
    />
  ),

  // Table
  table: (props: React.TableHTMLAttributes<HTMLTableElement>) => (
    <div className="overflow-x-auto my-6">
      <table className="w-full border-collapse" {...props} />
    </div>
  ),
  thead: (props: React.HTMLAttributes<HTMLTableSectionElement>) => (
    <thead className="bg-primary/5" {...props} />
  ),
  tbody: (props: React.HTMLAttributes<HTMLTableSectionElement>) => (
    <tbody {...props} />
  ),
  tr: (props: React.HTMLAttributes<HTMLTableRowElement>) => (
    <tr
      className="border-b border-border hover:bg-muted/50 transition-colors"
      {...props}
    />
  ),
  th: (props: React.ThHTMLAttributes<HTMLTableCellElement>) => (
    <th
      className="border border-border p-3 text-left font-semibold text-primary"
      {...props}
    />
  ),
  td: (props: React.TdHTMLAttributes<HTMLTableCellElement>) => (
    <td className="border border-border p-3 text-foreground/90" {...props} />
  ),

  // Images
  img: (props: React.ImgHTMLAttributes<HTMLImageElement>) => (
    <Image
      src={typeof props.src === "string" ? props.src : ""}
      height={Number(props.height)}
      width={Number(props.width)}
      className="rounded-lg shadow-lg my-6 max-w-full h-auto"
      alt={props.alt || "Image"}
    />
  ),
};
