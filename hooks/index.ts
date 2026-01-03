import { ApiResponse, Post, PostMetadata } from "@/types/post";
import { useQuery } from "@tanstack/react-query";

const useGetPostMetaData = () =>
  useQuery<ApiResponse<PostMetadata[]>>({
    queryKey: ["postsMetaData"],
    queryFn: async () => {
      const response = await fetch("/api/posts");
      return response.json();
    },
    retry: 3,
    staleTime: "static",
  });

const useGetPostContent = (id?: string) =>
  useQuery<ApiResponse<Post | null>>({
    queryKey: ["postContent", id],
    queryFn: async () => {
      const response = await fetch(`/api/posts/${id}`);
      return response.json();
    },
    retry: 3,
    staleTime: "static",
    enabled: Boolean(id),
  });

export { useGetPostMetaData, useGetPostContent };
