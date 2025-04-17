import { unstable_cache } from "next/cache";
import { clerkClient } from "@clerk/nextjs/server";
import { getResume } from "./redisActions";

export const getCachedUser = async (userId: string) => {
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
};

export const getCachedResume = async (userId: string) => {
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
};
