import { z } from "zod";

const HeaderContactsSchema = z.object({
  website: z.string().describe("Website/Portfolio URL").optional(),
  email: z.string().describe("Email address").optional(),
  phone: z.string().describe("Phone number").optional(),
  twitter: z.string().describe("Twitter/X username").optional(),
  linkedin: z.string().describe("LinkedIn username").optional(),
  github: z.string().describe("GitHub username").optional(),
});

const HeaderSection = z.object({
  name: z.string(),
  subheader: z.string().describe("Brief description about yourself"),
  location: z
    .string()
    .describe("Location with format 'City, Country'")
    .optional(),
  contacts: HeaderContactsSchema,
  skills: z
    .array(z.string())
    .describe("Skills used within the different jobs the user has had."),
});

const SummarySection = z.string().describe("Summary of your profile");

const WorkExperienceSection = z.array(
  z.object({
    company: z.string().describe("Company name"),
    link: z.string().describe("Company website URL"),
    location: z
      .string()
      .describe(
        "Location with format 'City, Country' or could be Hybrid or Remote"
      ),
    contract: z
      .string()
      .describe("Type of work contract like Full-time, Part-time, Contract"),
    title: z.string().describe("Job title"),
    start: z.string().describe("Start date in format 'YYYY-MM-DD'"),
    end: z
      .string()
      .optional()
      .nullable()
      .describe("End date in format 'YYYY-MM-DD'"),
    description: z.string().describe("Job description"),
  })
);

const EducationSection = z.array(
  z.object({
    school: z.string().describe("School/University name"),
    degree: z.string().describe("Degree/Certification received"),
    start: z.string().describe("Start year"),
    end: z.string().describe("End year"),
  })
);

export const ResumeDataSchema = z.object({
  header: HeaderSection,
  summary: SummarySection,
  workExperience: WorkExperienceSection,
  education: EducationSection,
});

export type ResumeDataSchemaType = z.infer<typeof ResumeDataSchema>;
