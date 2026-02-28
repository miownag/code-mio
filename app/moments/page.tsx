import { getMoments } from "@/lib/moments";
import { getPostsMetadata } from "@/lib/posts";
import { PostMetadata } from "@/types/post";
import MomentsPageClient from "@/app/moments/_components/moments-page-client";

export default async function MomentsPage() {
  const [moments, postsMetadata] = await Promise.all([
    getMoments(),
    getPostsMetadata(),
  ]);

  const postsMap: Record<string, PostMetadata> = {};
  for (const post of postsMetadata) {
    postsMap[post.id] = post;
  }

  return <MomentsPageClient moments={moments} postsMap={postsMap} />;
}
