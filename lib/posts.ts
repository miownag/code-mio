import fs from "fs/promises";
import path from "path";
import { PostMetadata, Post } from "@/types/post";

const POSTS_DIRECTORY = path.join(process.cwd(), "content");

/**
 * Read metadata for all posts from posts.json
 */
export async function getPostsMetadata(): Promise<PostMetadata[]> {
  try {
    const filePath = path.join(POSTS_DIRECTORY, "posts.json");
    const fileContents = await fs.readFile(filePath, "utf8");
    return JSON.parse(fileContents);
  } catch (error) {
    console.error("Error reading posts metadata:", error);
    return [];
  }
}

/**
 * Read a single post with full content by id
 */
export async function getPostById(id: string): Promise<Post | null> {
  try {
    // Get metadata
    const metadata = await getPostsMetadata();
    const postMeta = metadata.find((p) => p.id === id);

    if (!postMeta) {
      return null;
    }

    // Get content from MDX file
    const contentPath = path.join(POSTS_DIRECTORY, "posts", `${id}.mdx`);
    const content = await fs.readFile(contentPath, "utf8");

    return {
      ...postMeta,
      content,
    };
  } catch (error) {
    console.error(`Error reading post ${id}:`, error);
    return null;
  }
}
