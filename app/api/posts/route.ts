import { NextResponse } from "next/server";
import { getPostsMetadata } from "@/lib/posts";
import { ApiResponse, PostMetadata } from "@/types/post";

export async function GET(): Promise<
  NextResponse<ApiResponse<PostMetadata[]>>
> {
  try {
    const posts = await getPostsMetadata();
    return NextResponse.json({ data: posts });
  } catch (error) {
    console.error("Error fetching posts:", error);
    return NextResponse.json(
      { error: "Failed to fetch posts" },
      { status: 500 }
    );
  }
}
