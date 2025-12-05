import { unstable_cache } from "next/cache";
import { clerkClient } from "@clerk/nextjs/server";
import { getResume, getUserIdByUsername } from "@/lib/actions";

export async function getUserData(username: string) {
  const user_id = await getUserIdByUsername(username);
  if (!user_id)
    return { user_id: undefined, resume: undefined, clerkUser: undefined };

  const resume = await getResume(user_id);
  if (!resume?.resumeData || resume.status !== "live") {
    return { user_id, resume: undefined, clerkUser: undefined };
  }

  const getCachedUser = unstable_cache(
    async () => {
      return await (await clerkClient()).users.getUser(user_id);
    },
    [user_id],
    {
      tags: ["users"],
      revalidate: 60,
    }
  );
  const clerkUser = await getCachedUser();

  return { user_id, resume, clerkUser };
}
