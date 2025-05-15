import { z } from "zod";
import { upstashRedis } from "./redis";
import { ResumeDataSchema } from "./resume-schema";
import { PRIVATE_ROUTES } from "./constants";

const REDIS_KEYS = {
  RESUME_PREFIX: "resume:",
  USER_ID_PREFIX: "user:id:",
  USER_NAME_PREFIX: "user:name:",
} as const;

const FileSchema = z.object({
  name: z.string(),
  url: z.string().nullish(),
  size: z.number(),
  bucket: z.string(),
  key: z.string(),
});

const FORBIDDEN_USERNAMES = PRIVATE_ROUTES;

const ResumeSchema = z.object({
  status: z.enum(["live", "draft"]).default("draft"),
  file: FileSchema.nullish(),
  fileContent: z.string().nullish(),
  resumeData: ResumeDataSchema.nullish(),
});

export type ResumeData = z.infer<typeof ResumeDataSchema>;
export type Resume = z.infer<typeof ResumeSchema>;

export async function getResume(userId: string): Promise<Resume | undefined> {
  try {
    const resume = await upstashRedis.get<Resume>(
      `${REDIS_KEYS.RESUME_PREFIX}${userId}`
    );
    return resume || undefined;
  } catch (error) {
    console.error("Error retrieving resume:", error);
    throw new Error("Failed to retrieve resume");
  }
}

export async function storeResume(
  userId: string,
  resumeData: Resume
): Promise<void> {
  try {
    const validatedData = ResumeSchema.parse(resumeData);
    await upstashRedis.set(
      `${REDIS_KEYS.RESUME_PREFIX}${userId}`,
      validatedData
    );
  } catch (error) {
    if (error instanceof z.ZodError) {
      throw error;
    }
    console.error("Error storing resume:", error);
    throw new Error("Failed to store resume");
  }
}

export const createUsernameLookup = async ({
  userId,
  username,
}: {
  userId: string;
  username: string;
}): Promise<boolean> => {
  // Check if username is forbidden
  if (FORBIDDEN_USERNAMES.includes(username.toLowerCase())) {
    return false;
  }
  // Check if username or user_id already exists
  const [usernameExists, userIdExists] = await Promise.all([
    upstashRedis.exists(`${REDIS_KEYS.USER_NAME_PREFIX}${username}`),
    upstashRedis.exists(`${REDIS_KEYS.USER_ID_PREFIX}${userId}`),
  ]);
  if (usernameExists || userIdExists) {
    return false;
  }
  // Create mappings in both directions
  const transaction = upstashRedis.multi();
  transaction.set(`${REDIS_KEYS.USER_ID_PREFIX}${userId}`, username);
  transaction.set(`${REDIS_KEYS.USER_NAME_PREFIX}${username}`, userId);

  try {
    const results = await transaction.exec();
    return results.every((result) => result === "OK");
  } catch (error) {
    console.error("User creation failed:", error);
    return false;
  }
};

export const getUsernameById = async (
  userId: string
): Promise<string | null> => {
  return await upstashRedis.get(`${REDIS_KEYS.USER_ID_PREFIX}${userId}`);
};

export const getUserIdByUsername = async (
  username: string
): Promise<string | null> => {
  return await upstashRedis.get(`${REDIS_KEYS.USER_NAME_PREFIX}${username}`);
};

export const checkUsernameAvailability = async (
  username: string
): Promise<{
  available: boolean;
}> => {
  if (FORBIDDEN_USERNAMES.includes(username.toLowerCase())) {
    return { available: false };
  }
  const userId = await getUserIdByUsername(username);
  return { available: !userId };
};

export const deleteUser = async (opts: {
  userId?: string;
  username?: string;
}): Promise<boolean> => {
  let userId: string | null = null;
  let username: string | null = null;
  // Determine lookup method based on input
  if (opts.userId) {
    username = await getUsernameById(opts.userId);
    if (!username) return false;
  } else if (opts.username) {
    userId = await getUserIdByUsername(opts.username);
    if (!userId) return false;
  } else {
    return false;
  }
  // Use the found values if not provided
  userId = userId || opts.userId!;
  username = username || opts.username!;
  // Delete both mappings
  const transaction = upstashRedis.multi();
  transaction.del(`${REDIS_KEYS.USER_ID_PREFIX}${userId}`);
  transaction.del(`${REDIS_KEYS.USER_NAME_PREFIX}${username}`);
  try {
    const results = await transaction.exec();
    return results.every((result) => result === 1);
  } catch (error) {
    console.error("User deletion failed:", error);
    return false;
  }
};

export const updateUsername = async (
  userId: string,
  newUsername: string
): Promise<boolean> => {
  // Check if new username is forbidden
  if (FORBIDDEN_USERNAMES.includes(newUsername.toLowerCase())) {
    return false;
  }
  // Get current username
  const currentUsername = await getUsernameById(userId);
  if (!currentUsername) return false;
  // Check if new username is already taken
  const newUsernameExists = await upstashRedis.exists(
    `${REDIS_KEYS.USER_NAME_PREFIX}${newUsername}`
  );
  if (newUsernameExists) return false;
  // Create transaction to update mappings
  const transaction = upstashRedis.multi();
  transaction.del(`${REDIS_KEYS.USER_NAME_PREFIX}${currentUsername}`);
  transaction.set(`${REDIS_KEYS.USER_ID_PREFIX}${userId}`, newUsername);
  transaction.set(`${REDIS_KEYS.USER_NAME_PREFIX}${newUsername}`, userId);
  try {
    const results = await transaction.exec();
    return results.every((result) => result === "OK" || result === 1);
  } catch (error) {
    console.error("Username update failed:", error);
    return false;
  }
};

export async function getAllPublicUsernamesWithLiveResume(): Promise<string[]> {
  try {
    const keys = await upstashRedis.keys(`${REDIS_KEYS.RESUME_PREFIX}*`);
    const publicUsernames: string[] = [];
    for (const resumeKey of keys) {
      const userId = resumeKey.split(":")[1];
      const resumeData = await getResume(userId);
      if (resumeData?.status === "live") {
        const username = await getUsernameById(userId);
        if (username) {
          publicUsernames.push(username);
        }
      }
    }
    return publicUsernames;
  } catch (error) {
    console.error("Error fetching public usernames with live resumes:", error);
    return [];
  }
}
