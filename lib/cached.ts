import { getResume } from "./actions";
import { clerkClient } from "@clerk/nextjs/server";
import { unstable_cache } from "next/cache";

export async function getCachedUser(userId: string) {
  return unstable_cache(
    async () => {
      return await (await clerkClient()).users.getUser(userId);
    },
    [userId],
    {
      tags: ["users"],
      revalidate: 86400,
    }
  )();
}

export async function getCachedResume(userId: string) {
  return unstable_cache(
    async () => {
      return await getResume(userId);
    },
    [userId],
    {
      tags: ["resumes"],
      revalidate: 86400,
    }
  );
}
