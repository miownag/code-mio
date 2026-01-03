"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { motion, AnimatePresence } from "framer-motion";
import { BiHide, BiShow } from "react-icons/bi";
import { Skeleton } from "@/components/ui/skeleton";
import { useGetPostMetaData } from "../../hooks";

export default function PostsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const pathname = usePathname();
  const currentId = pathname?.split("/posts/")[1];
  const { data: { data: metaData = [] } = {}, isLoading } =
    useGetPostMetaData();

  // Larger max-width for post page
  return (
    <div className="container mx-auto px-4 pt-16 pb-8 max-w-9xl">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="mb-12"
      >
        <div className="mb-12">
          <h1 className="text-4xl md:text-6xl font-light pixel-font mb-4 flex items-center gap-4">
            <div className="h-10 w-1 bg-primary" />
            Posts
          </h1>
          <p className="text-muted-foreground text-lg">
            My thoughts and learnings on web development, AI, and more.
          </p>
        </div>
      </motion.div>

      {/* Main Content Area */}
      <div className="relative flex gap-8">
        {/* Article List - Collapsible Sidebar */}
        <AnimatePresence mode="wait">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -50 }}
            transition={{ duration: 0.3 }}
            className={cn("shrink-0", {
              "-ml-18": !sidebarOpen,
            })}
          >
            {sidebarOpen ? (
              <motion.aside
                initial={{ width: 0, opacity: 0 }}
                animate={{ width: 300, opacity: 1 }}
                exit={{ width: 0, opacity: 0 }}
                transition={{ duration: 0.3 }}
                className="shrink-0"
              >
                <div className="w-72 space-y-4">
                  <div className="flex justify-between items-center mb-4">
                    <h2 className="text-xl font-semibold">All Posts</h2>
                    {/* Sidebar Toggle Button */}
                    <Button
                      variant="ghost"
                      size="icon"
                      className="cursor-pointer"
                      onClick={() => setSidebarOpen(false)}
                    >
                      <BiHide className="h-4 w-4" />
                    </Button>
                  </div>
                  <nav className="flex flex-col gap-4">
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
                              "cursor-pointer transition-all duration-300 hover:bg-primary/5 rounded-lg py-2 px-4 -ml-4 flex flex-col",
                              {
                                "text-primary": item.id === currentId,
                              }
                            )}
                          >
                            <h3
                              className={cn(
                                "font-semibold mb-2 line-clamp-2",
                                item.id === currentId && "text-primary"
                              )}
                            >
                              {item.title}
                            </h3>
                            <p className="text-sm text-muted-foreground">
                              {item.date}
                            </p>
                          </div>
                        </Link>
                      ))
                    )}
                  </nav>
                </div>
              </motion.aside>
            ) : (
              <Button
                variant="outline"
                size="icon"
                className="cursor-pointer text-muted-foreground"
                onClick={() => setSidebarOpen(true)}
              >
                <BiShow className="h-4 w-4" />
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
