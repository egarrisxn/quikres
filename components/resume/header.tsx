import { useMemo } from "react";
import { GlobeIcon, MailIcon, PhoneIcon } from "lucide-react";
import { ResumeDataSchemaType } from "@/lib/resume-schema";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { GitHubIcon, LinkedInIcon, XIcon } from "../icons";

function SocialButton({
  href,
  icon: Icon,
  label,
}: {
  href: string;
  icon: React.ElementType;
  label: string;
}) {
  return (
    <Button className='size-6.5' size='icon' asChild>
      <a
        href={
          href.startsWith("mailto:") || href.startsWith("tel:")
            ? href
            : `${href}${href.includes("?") ? "&" : "?"}ref=quikres`
        }
        aria-label={label}
        target='_blank'
        rel='noopener noreferrer'
      >
        <Icon className='sm:size-4' aria-hidden='true' />
      </a>
    </Button>
  );
}

export function Header({
  header,
  picture,
}: {
  header: ResumeDataSchemaType["header"];
  picture?: string;
}) {
  const prefixUrl = (stringToFix?: string) => {
    if (!stringToFix) return undefined;
    const url = stringToFix.trim();
    return url.startsWith("http") ? url : `https://${url}`;
  };

  const socialLinks = useMemo(() => {
    const formatSocialUrl = (
      url: string | undefined,
      platform: "github" | "twitter" | "linkedin"
    ) => {
      if (!url) return undefined;

      const cleanUrl = url.trim();
      if (cleanUrl.startsWith("http")) return cleanUrl;

      if (
        platform === "twitter" &&
        (cleanUrl.startsWith("twitter.com") || cleanUrl.startsWith("x.com"))
      ) {
        return `https://${cleanUrl}`;
      }

      const platformUrls = {
        github: "github.com",
        twitter: "x.com",
        linkedin: "linkedin.com/in",
      } as const;

      return `https://${platformUrls[platform]}/${cleanUrl}`;
    };

    return {
      website: prefixUrl(header.contacts.website),
      github: formatSocialUrl(header.contacts.github, "github"),
      twitter: formatSocialUrl(header.contacts.twitter, "twitter"),
      linkedin: formatSocialUrl(header.contacts.linkedin, "linkedin"),
    };
  }, [
    header.contacts.website,
    header.contacts.github,
    header.contacts.twitter,
    header.contacts.linkedin,
  ]);

  return (
    <header className='flex items-start justify-between gap-2.5 lg:gap-0'>
      <div className='flex-1 space-y-1'>
        <h1
          className='text-foreground text-3xl font-bold text-pretty xl:text-4xl'
          id='resume-name'
        >
          {header.name}
        </h1>
        <p
          className='text-foreground/80 font-base max-w-md text-sm text-pretty xl:text-base print:text-[0.75rem]'
          aria-labelledby='resume-subheader'
        >
          {header.subheader}
        </p>
        <p className='max-w-md items-center text-pretty'>
          <a
            className='text-link font-base inline-flex gap-1 align-baseline text-xs leading-none underline-offset-2 hover:underline xl:text-sm'
            href={`https://www.google.com/maps/search/${encodeURIComponent(
              header.location || ""
            )}`}
            target='_blank'
            rel='noopener noreferrer'
            aria-label={`Location: ${header.location}`}
          >
            {header.location}
          </a>
        </p>

        <div
          className='text-foreground flex gap-1.5 pt-2 text-sm lg:gap-2 print:hidden'
          role='list'
          aria-label='Contact links'
        >
          {socialLinks.website && (
            <SocialButton
              href={socialLinks.website}
              icon={GlobeIcon}
              label='Personal website'
            />
          )}
          {header.contacts.email && (
            <SocialButton
              href={`mailto:${header.contacts.email}`}
              icon={MailIcon}
              label='Email'
            />
          )}
          {header.contacts.phone && (
            <SocialButton
              href={`tel:${header.contacts.phone}`}
              icon={PhoneIcon}
              label='Phone'
            />
          )}
          {socialLinks.github && (
            <SocialButton
              href={socialLinks.github}
              icon={GitHubIcon}
              label='GitHub'
            />
          )}
          {socialLinks.twitter && (
            <SocialButton
              href={socialLinks.twitter}
              icon={XIcon}
              label='Twitter'
            />
          )}
          {socialLinks.linkedin && (
            <SocialButton
              href={socialLinks.linkedin}
              icon={LinkedInIcon}
              label='LinkedIn'
            />
          )}
        </div>

        <div
          className='text-foreground hidden gap-1.5 text-sm print:flex print:text-[0.75rem]'
          aria-label='Print contact information'
        >
          {socialLinks.website && (
            <>
              <a
                className='hover:text-foreground/80 underline'
                href={socialLinks.website}
              >
                {new URL(socialLinks.website).hostname}
              </a>
              <span aria-hidden='true'>/</span>
            </>
          )}
          {header.contacts.email && (
            <>
              <a
                className='hover:text-foreground/80 underline'
                href={`mailto:${header.contacts.email}`}
              >
                {header.contacts.email}
              </a>
              <span aria-hidden='true'>/</span>
            </>
          )}
          {header.contacts.phone && (
            <a
              className='hover:text-foreground/80 underline'
              href={`tel:${header.contacts.phone}`}
            >
              {header.contacts.phone}
            </a>
          )}
        </div>
      </div>

      <Avatar className='size-22 sm:size-28 xl:size-36' aria-hidden='true'>
        <AvatarImage src={picture} alt={`${header.name}'s profile picture`} />
        <AvatarFallback>
          {header.name
            .split(" ")
            .map((n) => n[0])
            .join("")}
        </AvatarFallback>
      </Avatar>
    </header>
  );
}
