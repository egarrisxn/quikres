import { NextResponse } from "next/server";
import { checkUsernameAvailability } from "@/lib/actions";

export type PostResponse = { available: boolean } | { error: string };

export async function POST(
  request: Request
): Promise<NextResponse<PostResponse>> {
  try {
    const { searchParams } = new URL(request.url);
    const username = searchParams.get("username");

    if (!username || typeof username !== "string") {
      return NextResponse.json(
        { error: "Username parameter is required" },
        { status: 400 }
      );
    }

    const { available } = await checkUsernameAvailability(username);

    return NextResponse.json({ available });
  } catch (error) {
    console.error("Error checking username availability:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
