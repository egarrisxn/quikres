import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import { Section } from "@/components/ui/section";

type Skills = readonly string[];

export function Skills({
  skills,
  className,
}: {
  skills: Skills;
  className?: string;
}) {
  return (
    <Section className={className}>
      <h2 className='text-foreground text-xl font-bold' id='skills-section'>
        Skills
      </h2>
      <ul
        className={cn("flex list-none flex-wrap gap-1.5 p-0")}
        aria-label='List of skills'
        aria-labelledby='skills-section'
      >
        {skills.map((skill) => (
          <li key={skill}>
            <Badge
              className='pointer-events-none print:text-[0.75rem]'
              aria-label={`Skill: ${skill}`}
            >
              {skill}
            </Badge>
          </li>
        ))}
      </ul>
    </Section>
  );
}
