import { Badge } from "@/components/ui/badge";

const PostTag = ({
  tag,
}: {
  tag:
    | {
        name: string;
        important: boolean;
        color: string;
      }
    | string;
}) => {
  if (typeof tag === "string") {
    return <Badge variant="secondary">{tag}</Badge>;
  }

  return (
    <Badge variant="secondary" style={{ color: tag.color }}>
      {tag.name}
    </Badge>
  );
};

export default PostTag;
