import { redirect } from "next/navigation";
import { posts } from "./data";

export default function PostsPage() {
  // Redirect to the first post
  if (posts.length > 0) {
    redirect(`/posts/${posts[0].id}`);
  }

  // Fallback if no posts exist
  return (
    <div className="container mx-auto px-4 pt-16 pb-8 max-w-7xl">
      <p className="text-center text-muted-foreground">No posts available</p>
    </div>
  );
}
