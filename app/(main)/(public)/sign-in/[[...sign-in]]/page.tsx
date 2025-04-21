import { SignIn } from "@clerk/nextjs";

export default function Page() {
  return (
    <section className='grid min-h-[80vh] w-full place-items-center'>
      <SignIn />
    </section>
  );
}
