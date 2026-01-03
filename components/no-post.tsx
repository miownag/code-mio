"use client";

import { MdBrowserNotSupported } from "react-icons/md";
import { Card } from "./ui/card";
import {
  Empty,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
  EmptyContent,
} from "./ui/empty";

function NoPost({ title, content }: { title: string; content: string }) {
  return (
    <Card className="p-8 w-full">
      <Empty>
        <EmptyHeader>
          <EmptyMedia variant="icon">
            <MdBrowserNotSupported />
          </EmptyMedia>
          <EmptyTitle>{title}</EmptyTitle>
        </EmptyHeader>
        <EmptyContent className="text-primary">{content}</EmptyContent>
      </Empty>
    </Card>
  );
}

export default NoPost;
