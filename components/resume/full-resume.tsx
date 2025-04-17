import { ResumeData } from "@/lib/server/redisActions";
import LoadingFallback from "../loading-fallback";
import { Education } from "./resume-education";
import { Header } from "./resume-header";
import { Skills } from "./resume-skills";
import { Summary } from "./resume-summary";
import { WorkExperience } from "./resume-experience";

export const FullResume = ({
  resume,
  profilePicture,
}: {
  resume?: ResumeData | null;
  profilePicture?: string;
}) => {
  if (!resume) {
    return <LoadingFallback message='Loading Resume...' />;
  }

  return (
    <section
      className='bg-background mx-auto my-10 w-full max-w-3xl space-y-8 px-4 md:px-2 lg:px-0 print:space-y-4'
      aria-label='Resume Content'
    >
      <Header header={resume?.header} picture={profilePicture} />

      <div className='flex flex-col gap-6'>
        <Summary summary={resume?.summary} />

        <WorkExperience work={resume?.workExperience} />

        <Education educations={resume.education} />

        <Skills skills={resume.header.skills} />
      </div>
    </section>
  );
};
