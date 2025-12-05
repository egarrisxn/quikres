import { Suspense } from "react";
import { redirect } from "next/navigation";
import { auth, currentUser } from "@clerk/nextjs/server";
import {
  createUsernameLookup,
  getResume,
  getUsernameById,
  storeResume,
} from "@/lib/actions";
import { generateResumeObject } from "@/lib/generate-resume";
import { MAX_USERNAME_LENGTH } from "@/lib/constants";
import { Loading } from "@/components/ui/loading";
import PreviewClient from "./client";

const LLMProcessing = async ({ userId }: { userId: string }) => {
  const user = await currentUser();
  const resume = await getResume(userId);

  if (!resume?.fileContent || !resume.file) redirect("/upload");

  let messageTip: string | undefined;

  if (!resume.resumeData) {
    let resumeObject = await generateResumeObject(resume?.fileContent);

    if (!resumeObject) {
      messageTip =
        "We couldn't extract data from your PDF. Please edit your resume manually.";
      resumeObject = {
        header: {
          name:
            user?.fullName || user?.emailAddresses[0]?.emailAddress || "user",
          subheader: "This is a short description of your profile",
          location: "",
          contacts: {},
          skills: ["Add your skills here"],
        },
        summary: "You should add a summary here",
        workExperience: [],
        education: [],
      };
    }

    await storeResume(userId, {
      ...resume,
      resumeData: resumeObject,
    });
    resume.resumeData = resumeObject;
  }

  const foundUsername = await getUsernameById(userId);

  const saltLength = 6;

  const createSalt = () =>
    Math.random()
      .toString(36)
      .substring(2, 2 + saltLength);

  if (!foundUsername) {
    const username =
      (
        (resume.resumeData.header.name || "user")
          .toLowerCase()
          .replace(/[^a-z0-9\s]/g, "")
          .replace(/\s+/g, "-") + "-"
      ).slice(0, MAX_USERNAME_LENGTH - saltLength) + createSalt();

    const creation = await createUsernameLookup({
      userId,
      username,
    });

    if (!creation) redirect("/upload?error=usernameCreationFailed");
  }

  return <PreviewClient messageTip={messageTip} />;
};

export default async function Preview() {
  const { userId, redirectToSignIn } = await auth();

  if (!userId) return redirectToSignIn();

  return (
    <>
      <Suspense fallback={<Loading message='Loading' />}>
        <LLMProcessing userId={userId} />
      </Suspense>
    </>
  );
}
