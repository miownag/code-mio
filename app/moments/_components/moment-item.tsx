"use client";

import Image from "next/image";
import { Moment } from "@/types/moment";
import { PostMetadata } from "@/types/post";
import { cn } from "@/lib/utils";
import { LuPin } from "react-icons/lu";
import MomentTextContent from "./moment-text-content";
import MomentPostContent from "./moment-post-content";
import MomentPhotoContent from "./moment-photo-content";

interface Props {
  moment: Moment;
  postsMap: Record<string, PostMetadata>;
}

export default function MomentItem({ moment, postsMap }: Props) {
  return (
    <div className="flex gap-3 items-start">
      {/* Avatar */}
      <div className="shrink-0 w-10 h-10 rounded-full overflow-hidden">
        <Image
          src="/avatar.jpeg"
          alt="Avatar"
          width={40}
          height={40}
          className="object-cover w-full h-full"
        />
      </div>

      {/* Bubble + metadata */}
      <div className="flex-1 min-w-0">
        {/* Chat bubble */}
        <div
          className={cn(
            "relative rounded-2xl rounded-tl-sm px-4 py-3",
            "bg-card border border-border",
            "shadow-sm",
          )}
        >
          {moment.type === "text" && <MomentTextContent moment={moment} />}
          {moment.type === "post" && (
            <MomentPostContent moment={moment} postsMap={postsMap} />
          )}
          {moment.type === "photo" && <MomentPhotoContent moment={moment} />}
        </div>

        {/* Timestamp + pin indicator */}
        <div className="flex items-center gap-2 mt-1.5 px-1">
          <span className="text-sm text-muted-foreground pixel-font">
            {moment.date}
          </span>
          {moment.pinned && (
            <span className="flex items-center gap-0.5 text-sm text-primary">
              <LuPin className="w-3 h-3" />
              <span className="pixel-font">Pinned</span>
            </span>
          )}
        </div>
      </div>
    </div>
  );
}
