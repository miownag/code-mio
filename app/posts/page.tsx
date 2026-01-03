"use client";

import { redirect } from "next/navigation";
import { useEffect } from "react";
import { useGetPostMetaData } from "@/hooks";

export default function PostsPage() {
  const { data: { data: metaData = [] } = {}, isLoading } =
    useGetPostMetaData();

  useEffect(() => {
    if (!isLoading && metaData.length > 0) {
      redirect(`/posts/${metaData[0].id}`);
    }
  }, [isLoading, metaData]);

  if (isLoading) {
    return (
      <div className="container mx-auto px-4 pt-16 pb-8 max-w-7xl">
        <p className="text-center text-muted-foreground">Loading...</p>
      </div>
    );
  }

  // Fallback if no posts exist
  return (
    <div className="container mx-auto px-4 pt-16 pb-8 max-w-7xl">
      <p className="text-center text-muted-foreground">No posts available</p>
    </div>
  );
}
