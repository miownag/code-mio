"use client";

import { useEffect, useState, useCallback } from "react";
import { cn } from "@/lib/utils";
import GithubSlugger from "github-slugger";
import { motion } from "framer-motion";
import { BiHide, BiShow } from "react-icons/bi";
import { Button } from "@/components/ui/button";

interface TocItem {
  id: string;
  text: string;
  level: 1 | 2 | 3;
}

function extractHeadings(markdown: string): TocItem[] {
  const headings: TocItem[] = [];
  const slugger = new GithubSlugger();

  // Remove code blocks first to avoid matching headings inside them
  // Matches both fenced code blocks (```) and indented code blocks
  const contentWithoutCodeBlocks = markdown
    .replace(/```[\s\S]*?```/g, "") // Remove fenced code blocks
    .replace(/`[^`\n]+`/g, ""); // Remove inline code

  // Match h1, h2, h3 headings (lines starting with #, ##, or ###)
  const headingRegex = /^(#{1,3})\s+(.+)$/gm;
  let match;

  while ((match = headingRegex.exec(contentWithoutCodeBlocks)) !== null) {
    const level = match[1].length as 1 | 2 | 3;
    const text = match[2].trim();
    // Generate slug the same way rehype-slug does
    const id = slugger.slug(text);

    headings.push({ id, text, level });
  }

  return headings;
}

function useActiveHeading(headingIds: string[]) {
  const [activeId, setActiveId] = useState<string>("");

  useEffect(() => {
    if (headingIds.length === 0) return;

    const handleScroll = () => {
      // Find the heading that is closest to the top of the viewport but still above or at the scroll position
      const scrollTop = window.scrollY;
      const offset = 100; // Account for sticky header

      let currentActiveId = headingIds[0] || "";

      for (const id of headingIds) {
        const element = document.getElementById(id);
        if (element) {
          const elementTop = element.getBoundingClientRect().top + scrollTop;
          if (elementTop <= scrollTop + offset) {
            currentActiveId = id;
          } else {
            break;
          }
        }
      }

      setActiveId(currentActiveId);
    };

    // Initial check
    handleScroll();

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [headingIds]);

  return activeId;
}

interface TableOfContentsProps {
  content: string;
}

export default function TableOfContents({ content }: TableOfContentsProps) {
  const [headings, setHeadings] = useState<TocItem[]>([]);
  const [isOpen, setIsOpen] = useState(true);

  useEffect(() => {
    const extracted = extractHeadings(content);
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setHeadings(extracted);
  }, [content]);

  const activeId = useActiveHeading(headings.map((h) => h.id));

  const scrollToHeading = useCallback((id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  }, []);

  if (headings.length === 0) {
    return null;
  }

  return (
    <div className="sticky top-20">
      <div
        className={cn("shrink-0", {
          "-mr-18": !isOpen,
        })}
      >
        {isOpen ? (
          <motion.nav
            initial={{ x: 20, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: 20, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="shrink-0"
          >
            <div className="flex justify-between items-center mb-4">
              <h4 className="text-sm font-semibold">Table of Contents</h4>
              <Button
                variant="ghost"
                size="icon"
                className="cursor-pointer"
                onClick={() => setIsOpen(false)}
              >
                <BiHide className="h-4 w-4" />
              </Button>
            </div>
            <ul className="space-y-2 text-sm">
              {headings.map((heading) => (
                <li
                  key={heading.id}
                  className={cn({
                    "pl-0": heading.level === 1,
                    "pl-4": heading.level === 2,
                    "pl-8": heading.level === 3,
                  })}
                >
                  <button
                    onClick={() => scrollToHeading(heading.id)}
                    className={cn(
                      "text-left hover:text-primary transition-colors duration-200 line-clamp-2 cursor-pointer",
                      activeId === heading.id
                        ? "text-primary font-medium"
                        : "text-muted-foreground",
                    )}
                  >
                    {heading.text}
                  </button>
                </li>
              ))}
            </ul>
          </motion.nav>
        ) : (
          <Button
            variant="outline"
            size="icon"
            className="cursor-pointer text-muted-foreground"
            onClick={() => setIsOpen(true)}
          >
            <BiShow className="h-4 w-4" />
          </Button>
        )}
      </div>
    </div>
  );
}
