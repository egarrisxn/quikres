import { generateObject } from "ai";
import { createTogetherAI } from "@ai-sdk/togetherai";
import { ResumeDataSchema } from "@/lib/resume-schema";
import dedent from "dedent";

const togetherai = createTogetherAI({
  apiKey: process.env.TOGETHER_API_KEY ?? "",
});

export const generateResume = async (resumeText: string) => {
  const startTime = Date.now();
  try {
    const { object } = await generateObject({
      model: togetherai("Qwen/Qwen2.5-72B-Instruct-Turbo"),
      maxRetries: 1,
      schema: ResumeDataSchema,
      prompt:
        dedent(`Your expertise lies in professional document analysis, specifically for curriculum vitae. Your mission is to interpret the provided resume text and structure its information into a standardized data format. Ensure accuracy and conciseness in your interpretation.

## Task Guidelines:

- If the provided resume lacks a dedicated 'about me' section or specific skills are not explicitly listed, please synthesize relevant content for these areas. Base your generated content on the overall context of the resume and infer appropriate information based on the likely job role.
- For the 'about me' section, compose a succinct professional profile that emphasizes the candidate's background, key competencies, and career aspirations.
- For the 'skills' section, identify and list a maximum of ten relevant skills. Prioritize skills mentioned in the resume. If the resume doesn't contain enough skills, deduce additional pertinent skills based on the job function or title implied in the resume.
- Regarding social media links: If a full URL to a social media profile is absent, leave the corresponding username/link field as empty strings. The username should never contain spaces. Only return the exact, space-free username; otherwise, leave the field blank.

    ## Resume text:

    ${resumeText}
    `),
    });

    const endTime = Date.now();
    console.log(
      `Generating resume object took ${(endTime - startTime) / 1000} seconds`
    );

    return object;
  } catch (error) {
    console.warn("Impossible generating resume object", error);
    return undefined;
  }
};
