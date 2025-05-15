import DashboardClient from "./client";

export default async function DashboardPage() {
  return (
    <section className='grid min-h-[80dvh] w-full place-items-center'>
      <div className='mx-auto w-full max-w-[75rem] px-4 pb-16'>
        <DashboardClient />
      </div>
    </section>
  );
}
