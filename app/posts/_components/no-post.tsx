"use client";

import { MdBrowserNotSupported } from "react-icons/md";
import {
  Empty,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
  EmptyContent,
} from "@/components/ui/empty";

function NoPost({ title, content }: { title: string; content: string }) {
  return (
    <div className="p-8 w-full">
      <Empty>
        <EmptyHeader>
          <EmptyMedia variant="icon">
            <MdBrowserNotSupported />
          </EmptyMedia>
          <EmptyTitle>{title}</EmptyTitle>
        </EmptyHeader>
        <EmptyContent className="text-primary">{content}</EmptyContent>
      </Empty>
    </div>
  );
}

export default NoPost;
