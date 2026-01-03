"use client";

import { motion } from "framer-motion";
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
    <div className="flex gap-8">
      <Card className="p-8 w-3/4">
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
    </div>
  );
}

export default NoPost;
