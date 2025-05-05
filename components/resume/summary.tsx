import { ResumeDataSchemaType } from "@/lib/resumeSchema";
import { Section } from "../ui/section";

interface AboutProps {
  summary: ResumeDataSchemaType["summary"];
  className?: string;
}

export function Summary({ summary, className }: AboutProps) {
  return (
    <Section className={className}>
      <h2 className='text-foreground text-xl font-bold' id='about-section'>
        About
      </h2>
      <div
        className='text-foreground/90 text-sm text-pretty print:text-[0.75rem]'
        aria-labelledby='about-section'
      >
        {summary}
      </div>
    </Section>
  );
}
