import { redirect } from "next/navigation";
import * as motion from "motion/react-client";
import { BASE_URL } from "@/lib/constants";
import ThemeDropdown from "@/components/global/theme-dropdown";
import { FinalResume } from "@/components/resume/final-resume";
import { getUserData } from "./user";

import type { Metadata } from "next";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ username: string }>;
}): Promise<Metadata> {
  const { username } = await params;
  const { user_id, resume } = await getUserData(username);

  if (!user_id) {
    return {
      title: "User Not Found: Quik|Res",
      description: "This user profile could not be found on Quikres",
    };
  }

  if (!resume?.resumeData || resume.status !== "live") {
    return {
      title: "Resume Not Found: Quik|Res",
      description: "This resume could not be found on Quikres",
    };
  }

  return {
    title: `${resume.resumeData.header.name}: Quik|Res`,
    description: resume.resumeData.summary,
    openGraph: {
      title: `${resume.resumeData.header.name}: Quik|Res`,
      description: resume.resumeData.summary,
      images: [
        {
          url: `${BASE_URL}/${username}/og`,
          width: 1200,
          height: 630,
          alt: "Quik|Res Profile",
        },
      ],
    },
  };
}

export default async function ProfilePage({
  params,
}: {
  params: Promise<{ username: string }>;
}) {
  const { username } = await params;

  const { user_id, resume, clerkUser } = await getUserData(username);

  if (!user_id) redirect(`/?usernameNotFound=${username}`);
  if (!resume?.resumeData || resume.status !== "live")
    redirect(`/?idNotFound=${user_id}`);

  const profilePicture = clerkUser?.imageUrl;

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: resume.resumeData.header.name,
    image: profilePicture,
    jobTitle: resume.resumeData.header.subheader,
    description: resume.resumeData.summary,
    email:
      resume.resumeData.header.contacts.email &&
      `mailto:${resume.resumeData.header.contacts.email}`,
    url: `https://quikres.vercel.app/${username}`,
    skills: resume.resumeData.header.skills,
  };

  return (
    <>
      <script
        type='application/ld+json'
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <div className='grid min-h-[100dvh] w-full grid-rows-[auto_1fr_auto]'>
        <motion.header
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className='mx-auto flex w-full max-w-3xl pt-1 pl-2 lg:pl-0'
        >
          <ThemeDropdown />
        </motion.header>
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2, ease: "easeOut" }}
          className='flex flex-col'
        >
          <FinalResume
            resume={resume?.resumeData}
            profilePicture={profilePicture}
          />
        </motion.section>
        <motion.footer
          className='mx-auto mt-12 mb-4 flex w-full items-center justify-center'
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <a
            target='_blank'
            rel='noopener noreferrer'
            href='https://quikres.vercel.app'
            className='text-background text-shadow-foreground dark:text-foreground text-sm font-black tracking-tight text-shadow-lg dark:text-shadow-none'
          >
            Quik|Res
          </a>
        </motion.footer>
      </div>
    </>
  );
}
