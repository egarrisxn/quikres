import { useMemo } from "react";
import { ResumeDataSchemaType } from "@/lib/resume-schema";
import { Section } from "@/components/ui/section";
import { getMonth, getYear } from "@/lib/utils";

export function WorkExperience({
  work,
}: {
  work: ResumeDataSchemaType["workExperience"];
}) {
  // Filter out invalid work experiences and pre-format dates
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
              <div className='flex flex-wrap items-start justify-between gap-2 self-stretch'>
                <div className='flex flex-wrap items-center justify-start gap-2'>
                  <p className='text-primary text-left text-base font-bold'>
                    {item.title}
                  </p>
                  <div className='rounded-base bg-secondary/40 text-foreground/80 relative flex items-center justify-center overflow-hidden px-[6px] py-0.5'>
                    <p className='text-center text-[10px] font-semibold'>
                      {item.location}
                    </p>
                  </div>
                </div>
                <p className='text-foreground/90 font-base text-right text-sm'>
                  {item.formattedDate}
                </p>
              </div>
              <div className='relative flex flex-col items-start justify-start gap-1.5'>
                <p className='text-foreground flex flex-wrap gap-1 self-stretch text-left text-sm font-semibold capitalize'>
                  <span>{item.companyLower}</span>
                  {item.company && item.contract && <span>·</span>}
                  <span>{item.contract}</span>
                </p>
                <p className='text-foreground/90 font-base self-stretch text-left text-sm'>
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
