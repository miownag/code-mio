import { getPostsMetadata } from "@/lib/posts";
import { PostMetadata } from "@/types/post";
import { moments } from "@/constants/moments";
import MomentsPageClient from "@/app/moments/_components/moments-page-client";

export default async function MomentsPage() {
  const postsMetadata = await getPostsMetadata();
  const postsMap: Record<string, PostMetadata> = {};
  for (const post of postsMetadata) {
    postsMap[post.id] = post;
  }

  return <MomentsPageClient moments={moments} postsMap={postsMap} />;
}
