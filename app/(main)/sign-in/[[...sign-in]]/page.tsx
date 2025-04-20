import { SignIn } from "@clerk/nextjs";

export default function Page() {
  return (
    <section className='grid min-h-[70vh] w-full place-items-center sm:min-h-[80vh]'>
      <SignIn />
    </section>
  );
}
