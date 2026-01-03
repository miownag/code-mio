"use client";

import { redirect } from "next/navigation";
import { useEffect } from "react";
import { useGetPostMetaData } from "@/hooks";
import PostsLoading from "@/components/posts-loading";
import NoPost from "@/components/no-post";

export default function PostsPage() {
  const { data: { data: metaData = [] } = {}, isLoading } =
    useGetPostMetaData();

  useEffect(() => {
    if (!isLoading && metaData.length > 0) {
      redirect(`/posts/${metaData[0].id}`);
    }
  }, [isLoading, metaData]);

  if (isLoading) {
    return <PostsLoading />;
  }

  return <NoPost title="No post available" content="Coming soon..." />;
}
