import { redirect } from "next/navigation";
import { articles } from "./data";

export default function ArticlesPage() {
  // Redirect to the first article
  if (articles.length > 0) {
    redirect(`/articles/${articles[0].id}`);
  }

  // Fallback if no articles exist
  return (
    <div className="container mx-auto px-4 pt-16 pb-8 max-w-7xl">
      <p className="text-center text-muted-foreground">No articles available</p>
    </div>
  );
}
