import { SignIn } from "@clerk/nextjs";

export default function Page() {
  return (
    <section className='h-screen w-full'>
      <div className='mx-auto grid min-h-[80vh] w-full place-items-center'>
        <SignIn />
      </div>
    </section>
  );
}
