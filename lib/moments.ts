import fs from "fs/promises";
import path from "path";
import { Moment } from "@/types/moment";

const CONTENT_DIRECTORY = path.join(process.cwd(), "content");

export async function getMoments(): Promise<Moment[]> {
  try {
    const filePath = path.join(CONTENT_DIRECTORY, "moments.json");
    const fileContents = await fs.readFile(filePath, "utf8");
    return JSON.parse(fileContents);
  } catch (error) {
    console.error("Error reading moments:", error);
    return [];
  }
}
