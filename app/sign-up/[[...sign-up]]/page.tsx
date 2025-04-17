import { SignUp } from "@clerk/nextjs";

export default function Page() {
  return (
    <section className='h-screen w-full bg-gradient-to-tl from-slate-100 via-slate-200 to-slate-300'>
      <div className='mx-auto grid min-h-[80vh] w-full place-items-center'>
        <SignUp />
      </div>
    </section>
  );
}
