import { redirect } from "next/navigation";
import { auth } from "@clerk/nextjs/server";
import { processPdfResume } from "@/lib/server/pdf";

export default async function Pdf() {
  const { userId, redirectToSignIn } = await auth();
  if (!userId) return redirectToSignIn();

  const result = await processPdfResume(userId);

  return redirect(`/${result}`);
}
