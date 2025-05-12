import { ResumeDataSchemaType } from "@/lib/resumeSchema";
import { Section } from "../ui/section";

export function Summary({
  summary,
  className,
}: {
  summary: ResumeDataSchemaType["summary"];
  className?: string;
}) {
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
