import { ResumeData } from "@/lib/actions";
import LoadingFallback from "../loading-fallback";
import { Education } from "./education";
import { Header } from "./header";
import { Skills } from "./skills";
import { Summary } from "./summary";
import { WorkExperience } from "./experience";

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
      className='bg-background mx-auto my-10 w-full max-w-3xl space-y-8 px-4 lg:px-0 print:space-y-4'
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
