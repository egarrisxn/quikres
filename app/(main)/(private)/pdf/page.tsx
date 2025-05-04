import { redirect } from "next/navigation";
import { auth } from "@clerk/nextjs/server";
import { processResume } from "@/server/process-resume";

export default async function Pdf() {
  const { userId, redirectToSignIn } = await auth();
  if (!userId) return redirectToSignIn();

  const result = await processResume(userId);

  return redirect(`/${result}`);
}
