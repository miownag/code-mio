import { NextResponse } from "next/server";
import { getMoments } from "@/lib/moments";
import { Moment } from "@/types/moment";
import { ApiResponse } from "@/types/post";

export async function GET(): Promise<NextResponse<ApiResponse<Moment[]>>> {
  try {
    const moments = await getMoments();
    return NextResponse.json({ data: moments });
  } catch (error) {
    console.error("Error fetching moments:", error);
    return NextResponse.json(
      { error: "Failed to fetch moments" },
      { status: 500 },
    );
  }
}
