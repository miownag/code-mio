import fs from "fs";
import path from "path";

const CONTENT_DIR = path.join(process.cwd(), "content");
const postsPath = path.join(CONTENT_DIR, "posts.json");
const momentsPath = path.join(CONTENT_DIR, "moments.json");

const posts = JSON.parse(fs.readFileSync(postsPath, "utf8"));
const moments = JSON.parse(fs.readFileSync(momentsPath, "utf8"));

const existingPostIds = new Set(
  moments.filter((m) => m.type === "post").map((m) => m.postId),
);

// Find the max numeric id to continue from
const maxId = moments.reduce((max, m) => {
  const num = parseInt(m.id.replace("moment-", ""), 10);
  return Number.isNaN(num) ? max : Math.max(max, num);
}, -1);

let nextId = maxId + 1;
let added = 0;

for (const post of posts) {
  if (existingPostIds.has(post.id)) continue;

  moments.push({
    id: `moment-${nextId++}`,
    type: "post",
    date: post.date,
    postId: post.id,
    comment: "New Post",
  });
  added++;
  console.log(`+ ${post.id} (${post.date})`);
}

if (added === 0) {
  console.log("All posts are already in moments.json");
} else {
  fs.writeFileSync(momentsPath, JSON.stringify(moments, null, 2) + "\n");
  console.log(`\nSynced ${added} post(s) to moments.json`);
}
