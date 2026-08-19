"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { motion, AnimatePresence } from "framer-motion";
import { PiSidebarSimpleBold } from "react-icons/pi";
import { Skeleton } from "@/components/ui/skeleton";
import { useGetPostMetaData } from "@/hooks";
import Subtitle from "@/components/subtitle";
import PostTag from "@/components/post-tag";

export default function PostsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const sidebarRef = useRef<HTMLDivElement>(null);
  const pathname = usePathname();
  const currentId = pathname?.split("/posts/")[1];
  const { data: { data: metaData = [] } = {}, isLoading } =
    useGetPostMetaData();

  useEffect(() => {
    if (!sidebarOpen) return;

    let frameId: number | null = null;

    const updateSidebarHeight = () => {
      frameId = null;

      if (!sidebarRef.current) return;

      const rootFontSize =
        Number.parseFloat(
          window.getComputedStyle(document.documentElement).fontSize,
        ) || 16;
      const stickyTop = 5 * rootFontSize;
      const bottomGap = stickyTop;
      const initialHeight = Math.min(
        42 * rootFontSize,
        Math.max(24 * rootFontSize, window.innerHeight - 16 * rootFontSize),
      );
      const expandedHeight = Math.max(
        initialHeight,
        window.innerHeight - stickyTop - bottomGap,
      );
      const sidebarTop = Math.max(
        sidebarRef.current.getBoundingClientRect().top,
        stickyTop,
      );
      const normalTop =
        (sidebarRef.current.parentElement?.getBoundingClientRect().top ??
          sidebarTop) + window.scrollY;
      const distanceToSticky = Math.max(normalTop - stickyTop, 1);
      const progress = Math.min(
        Math.max((normalTop - sidebarTop) / distanceToSticky, 0),
        1,
      );
      const currentHeight =
        initialHeight + (expandedHeight - initialHeight) * progress;

      sidebarRef.current.style.height = `${currentHeight}px`;
    };

    const scheduleSidebarHeightUpdate = () => {
      if (frameId !== null) return;
      frameId = window.requestAnimationFrame(updateSidebarHeight);
    };

    updateSidebarHeight();
    window.addEventListener("scroll", scheduleSidebarHeightUpdate, {
      passive: true,
    });
    window.addEventListener("resize", scheduleSidebarHeightUpdate);

    return () => {
      window.removeEventListener("scroll", scheduleSidebarHeightUpdate);
      window.removeEventListener("resize", scheduleSidebarHeightUpdate);

      if (frameId !== null) {
        window.cancelAnimationFrame(frameId);
      }
    };
  }, [sidebarOpen]);

  // Larger max-width for post page
  return (
    <div className="container mx-auto px-4 pt-24 pb-8 max-w-9xl">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="mb-12"
      >
        <Subtitle size="lg">Posts</Subtitle>
        <p className="text-muted-foreground text-lg">
          My thoughts and learnings on software development, AI, and more.
        </p>
      </motion.div>

      {/* Main Content Area */}
      <div className="relative flex gap-1">
        {/* Article List - Collapsible Sidebar */}
        <AnimatePresence mode="wait">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -50 }}
            transition={{ duration: 0.3 }}
            className="shrink-0"
          >
            {sidebarOpen ? (
              <motion.aside
                initial={{ width: 0, opacity: 0 }}
                animate={{ width: "auto", opacity: 1 }}
                exit={{ width: 0, opacity: 0 }}
                transition={{ duration: 0.3 }}
                className="shrink-0 h-full"
              >
                <div
                  ref={sidebarRef}
                  className="sticky top-20 flex h-[calc(100dvh-16rem)] w-64 min-h-0 flex-col pr-2 will-change-[height]"
                >
                  <div className="flex shrink-0 items-center justify-between border-b border-border/60 pb-4">
                    <h2 className="text-xl font-semibold">All Posts</h2>
                    {/* Sidebar Toggle Button */}
                    <Button
                      variant="ghost"
                      size="icon"
                      className="cursor-pointer"
                      onClick={() => setSidebarOpen(false)}
                    >
                      <PiSidebarSimpleBold />
                    </Button>
                  </div>
                  <div className="relative mt-3 min-h-0 flex-1">
                    <nav
                      data-lenis-prevent
                      aria-label="All posts"
                      className="scrollbar-auto-hide h-full overflow-y-auto overscroll-contain pr-2 pb-12"
                    >
                      <div className="flex flex-col gap-2">
                      {isLoading ? (
                        <>
                          <Skeleton className="h-16 w-full rounded-lg" />
                          <Skeleton className="h-16 w-full rounded-lg" />
                          <Skeleton className="h-16 w-full rounded-lg" />
                        </>
                      ) : (
                        metaData.map((item) => (
                          <Link key={item.id} href={`/posts/${item.id}`}>
                            <div
                              className={cn(
                                "cursor-pointer transition-all duration-300 hover:bg-primary/5 rounded-lg py-2 px-3 flex flex-col",
                                {
                                  "text-primary": item.id === currentId,
                                },
                              )}
                            >
                              <h3
                                className={cn(
                                  "font-semibold mb-2 line-clamp-2 overflow-hidden text-ellipsis",
                                  item.id === currentId && "text-primary",
                                )}
                              >
                                {item.title}
                              </h3>
                              <div className="text-sm text-muted-foreground flex gap-2">
                                {item.date}
                                {item.tags
                                  .filter(
                                    (tag) =>
                                      typeof tag !== "string" && tag.important,
                                  )
                                  .map((tag) => (
                                    <PostTag
                                      key={
                                        typeof tag === "string"
                                          ? tag
                                          : tag.name
                                      }
                                      tag={tag}
                                    />
                                  ))}
                              </div>
                            </div>
                          </Link>
                        ))
                      )}
                      </div>
                    </nav>
                    <div
                      aria-hidden
                      className="pointer-events-none absolute bottom-0 left-0 right-2 h-12 bg-linear-to-b from-transparent via-background/70 to-background"
                    />
                  </div>
                </div>
              </motion.aside>
            ) : (
              <Button
                variant="outline"
                size="icon"
                className="cursor-pointer text-muted-foreground sticky top-20"
                onClick={() => setSidebarOpen(true)}
              >
                <PiSidebarSimpleBold />
              </Button>
            )}
          </motion.div>
        </AnimatePresence>

        {/* Article Content Area */}
        <div className="flex-1 min-w-0">{children}</div>
      </div>
    </div>
  );
}
