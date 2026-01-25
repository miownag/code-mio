import { redirect } from "next/navigation";
import NoPost from "@/app/posts/_components/no-post";
import { getPostsMetadata } from "@/lib/posts";

async function getFirstPostId() {
  try {
    const data = await getPostsMetadata();
    return data[0].id;
  } catch {
    return null;
  }
}

export default async function PostsPage() {
  const id = await getFirstPostId();

  if (id) {
    redirect(`/posts/${id}`);
  }

  return <NoPost title="No post available" content="Coming soon..." />;
}
