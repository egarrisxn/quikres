import { useMemo } from "react";
import { ResumeDataSchemaType } from "@/lib/resume-schema";
import { getMonth, getYear } from "@/lib/utils";
import { Section } from "@/components/ui/section";

export function WorkExperience({
  work,
}: {
  work: ResumeDataSchemaType["workExperience"];
}) {
  const validWork = useMemo(() => {
    return work
      .filter(
        (item) =>
          item.company && item.location && item.title && item.description
      )
      .map((item) => ({
        ...item,
        formattedDate: `${getMonth(item.start)} ${getYear(item.start)} - ${
          !!item.end ? `${getMonth(item.end)} ${getYear(item.end)}` : "Present"
        }`,
        companyLower: item.company.toLowerCase(),
      }));
  }, [work]);

  if (validWork.length === 0) {
    return null;
  }

  return (
    <Section>
      <h2 className='text-foreground text-xl font-bold' id='work-experience'>
        Work Experience
      </h2>
      <div
        className='flex flex-col gap-4'
        role='feed'
        aria-labelledby='work-experience'
      >
        {validWork.map((item) => {
          return (
            <div
              key={item.company + item.location + item.title}
              className='flex flex-col items-start justify-start gap-1 print:mb-4'
            >
              <div className='flex flex-wrap items-start justify-between gap-1 self-stretch'>
                <div className='xs:flex-row xs:items-center xs:flex-wrap flex flex-col items-start justify-start gap-1'>
                  <p className='text-primary xs:text-base text-left text-sm font-bold'>
                    {item.title}
                  </p>
                  <div className='xs:rounded-base xs:bg-secondary/40 text-foreground/80 xs:px-[6px] xs:justify-center xs:items-center relative flex items-start justify-start overflow-hidden py-0.5'>
                    <p className='xs:text-center text-left text-[10px] font-semibold'>
                      {item.location}
                    </p>
                  </div>
                </div>
                <p className='text-foreground/90 font-base xs:text-sm xs:items-center flex-1 text-right text-xs'>
                  {item.formattedDate}
                </p>
              </div>
              <div className='relative flex flex-col items-start justify-start gap-1.5'>
                <p className='text-foreground xs:text-sm flex flex-wrap gap-1 self-stretch text-left text-xs font-semibold capitalize'>
                  <span>{item.companyLower}</span>
                  {item.company && item.contract && <span>·</span>}
                  <span>{item.contract}</span>
                </p>
                <p className='text-foreground/90 font-base xs:text-sm self-stretch text-left text-xs'>
                  {item.description}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </Section>
  );
}
