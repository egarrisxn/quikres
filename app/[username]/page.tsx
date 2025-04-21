import type { Metadata } from "next";
import { redirect } from "next/navigation";
import Link from "next/link";
import { getUserData } from "@/lib/user";
import { FullResume } from "@/components/resume/final-resume";
import { ThemeDropdown } from "@/components/theme-dropdown";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ username: string }>;
}): Promise<Metadata> {
  const { username } = await params;
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { user_id, resume, clerkUser } = await getUserData(username);

  if (!user_id) {
    return {
      title: "User Not Found - Quik|Res",
      description: "This user profile could not be found on Quikres",
    };
  }

  if (!resume?.resumeData || resume.status !== "live") {
    return {
      title: "Resume Not Found - Quik|Res",
      description: "This resume could not be found on Quikres",
    };
  }

  return {
    title: `${resume.resumeData.header.name}'s Resume - Quik|Res`,
    description: resume.resumeData.summary,
    openGraph: {
      title: `${resume.resumeData.header.name}'s Resume - Quik|Res`,
      description: resume.resumeData.summary,
      images: [
        {
          url: `https://quikres.vercel.app/${username}/og`,
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
        <header className='mx-auto flex w-full max-w-3xl pt-1 pl-2 lg:pl-0'>
          <ThemeDropdown />
        </header>
        <section className='flex flex-col'>
          <FullResume
            resume={resume?.resumeData}
            profilePicture={profilePicture}
          />
        </section>
        <footer className='mx-auto mt-12 mb-4 flex w-full items-center justify-center'>
          <Link
            href={`/?ref=${username}`}
            className='bg-foreground/5 rounded-base p-0.5 shadow-sm'
          >
            <img src='/icons/icon.svg' alt='logo' width={24} height={24} />
          </Link>
        </footer>
      </div>
    </>
  );
}
