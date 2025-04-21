import { SignUp } from "@clerk/nextjs";

export default function Page() {
  return (
    <section className='grid min-h-[80dvh] w-full place-items-center'>
      <SignUp />
    </section>
  );
}
