"use client";

import Link from "next/link";
import { PostMoment } from "@/types/moment";
import { PostMetadata } from "@/types/post";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { LuFileText } from "react-icons/lu";

interface Props {
  moment: PostMoment;
  postsMap: Record<string, PostMetadata>;
}

export default function MomentPostContent({ moment, postsMap }: Props) {
  const post = postsMap[moment.postId];

  return (
    <div className="space-y-2">
      <Badge
        variant="default"
        className="post-content-font font-semibold uppercase"
      >
        New Post
      </Badge>

      {post ? (
        <Link href={`/posts/${post.id}`} className="block">
          <Card className="py-3 hover:border-primary/50 transition-colors cursor-pointer">
            <CardHeader className="px-4 gap-1">
              <div className="flex items-center gap-2">
                <LuFileText className="w-4 h-4 text-primary shrink-0" />
                <CardTitle className="text-sm line-clamp-1">
                  {post.title}
                </CardTitle>
              </div>
              <CardDescription className="text-xs line-clamp-2">
                {post.excerpt}
              </CardDescription>
            </CardHeader>
          </Card>
        </Link>
      ) : (
        <Card className="py-3 opacity-50">
          <CardHeader className="px-4">
            <CardDescription className="text-xs">
              Post not found: {moment.postId}
            </CardDescription>
          </CardHeader>
        </Card>
      )}
    </div>
  );
}
