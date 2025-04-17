"use client";

import { useState } from "react";
import { useOrganization, useSession, useUser } from "@clerk/nextjs";
import clsx from "clsx";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import theme from "./snytax-theme";

const TYPES = ["user", "session", "organization"];

export function CodeSwitcher() {
  const [selectedType, setSelectedType] = useState(TYPES[0]);
  const { user } = useUser();
  const { session } = useSession();
  const { organization } = useOrganization();

  const selectedCode = JSON.stringify(
    {
      user,
      session,
      organization,
    }[selectedType],
    null,
    2
  );

  const typesToShow = organization
    ? TYPES
    : TYPES.filter((type) => type !== "organization");

  return (
    <div className={clsx(organization ? "h-[54rem]" : "h-[41rem]")}>
      <div className='rounded-base flex w-full gap-1.5 bg-slate-100 p-[0.1875rem]'>
        {typesToShow.map((type) => (
          <button
            className={clsx(
              "font-base rounded-base h-7 flex-1 text-[0.8125rem] capitalize hover:text-black",
              selectedType === type
                ? "bg-white text-black shadow"
                : "text-slate-500"
            )}
            key={type}
            onClick={() => setSelectedType(type)}
          >
            {type}
          </button>
        ))}
      </div>
      <div className='relative h-[calc(100%-40px)]'>
        <div className='mask h-full'>
          {/* @ts-expect-error */}
          <SyntaxHighlighter language='javascript' style={theme}>
            {selectedCode}
          </SyntaxHighlighter>
        </div>
        <div className='absolute top-0 right-0 bottom-0 w-10 bg-gradient-to-l from-white to-transparent' />
        <div className='absolute right-0 bottom-0 left-0 h-px bg-slate-100' />
      </div>
    </div>
  );
}
