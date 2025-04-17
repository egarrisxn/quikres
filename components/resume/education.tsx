import { useMemo } from "react";
import { ResumeDataSchemaType } from "@/lib/resume";
import { Section } from "@/components/ui/section";
import { getYear } from "@/lib/utils";

function EducationItem({
  education,
}: {
  education: ResumeDataSchemaType["education"][0];
}) {
  const { school, start, end, degree } = education;

  // Skip rendering if required fields are missing
  if (!school || !degree || !start) {
    return null;
  }

  return (
    <div className='flex flex-col gap-1'>
      <div>
        <div className='flex flex-col justify-between gap-2 text-base sm:flex-row sm:items-center'>
          <h3
            className='text-primary font-bold'
            id={`education-${school.toLowerCase().replace(/\s+/g, "-")}`}
          >
            {school}
          </h3>
          <div
            className='text-foreground/90 font-base text-sm tabular-nums'
            aria-label={`Period: ${getYear(start)} to ${
              end ? ` ${getYear(end)}` : "Present"
            }`}
          >
            {getYear(start)} - {end ? `${getYear(end)}` : "Present"}
          </div>
        </div>
      </div>
      <div
        className='text-foreground/90 @container/card-header grid auto-rows-min grid-rows-[auto_auto] items-start gap-1 px-0 text-sm font-semibold has-data-[slot=card-action]:grid-cols-[1fr_auto] print:text-[.75rem] [.border-b]:pb-6'
        aria-labelledby={`education-${school
          .toLowerCase()
          .replace(/\s+/g, "-")}`}
      >
        {degree}
      </div>
    </div>
  );
}

export function Education({
  educations,
}: {
  educations: ResumeDataSchemaType["education"];
}) {
  // Filter out invalid education entries
  const validEducations = useMemo(
    () => educations.filter((edu) => edu.school && edu.degree && edu.start),
    [educations]
  );

  if (validEducations.length === 0) {
    return null;
  }

  return (
    <Section>
      <h2 className='text-foreground text-xl font-bold' id='education-section'>
        Education
      </h2>
      <div
        className='flex flex-col gap-4'
        role='feed'
        aria-labelledby='education-section'
      >
        {validEducations.map((item, idx) => (
          <article key={idx} role='article'>
            <EducationItem education={item} />
          </article>
        ))}
      </div>
    </Section>
  );
}
