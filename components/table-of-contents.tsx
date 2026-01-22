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

  // Match h1, h2, h3 headings (lines starting with #, ##, or ###)
  const headingRegex = /^(#{1,3})\s+(.+)$/gm;
  let match;

  while ((match = headingRegex.exec(markdown)) !== null) {
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

    const observer = new IntersectionObserver(
      (entries) => {
        // Find the first heading that is intersecting
        const visibleHeadings = entries.filter((entry) => entry.isIntersecting);

        if (visibleHeadings.length > 0) {
          // Get the one closest to the top
          const sortedByTop = visibleHeadings.sort(
            (a, b) => a.boundingClientRect.top - b.boundingClientRect.top,
          );
          setActiveId(sortedByTop[0].target.id);
        }
      },
      {
        rootMargin: "-10% 0% -80% 0%", // Trigger when heading is in top 20% of viewport
        threshold: 0,
      },
    );

    // Observe all heading elements
    headingIds.forEach((id) => {
      const element = document.getElementById(id);
      if (element) {
        observer.observe(element);
      }
    });

    return () => observer.disconnect();
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
