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
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.5, delay: 0.2 }}
      className="flex gap-8"
    >
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
    </motion.div>
  );
}

export default NoPost;
