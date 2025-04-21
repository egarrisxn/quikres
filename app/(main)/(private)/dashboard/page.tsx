import { UserDetails } from "@/components/dashboard/user-details";

export default async function DashboardPage() {
  return (
    <section className='grid min-h-[80dvh] w-full place-items-center'>
      <div className='mx-auto w-full max-w-[75rem] px-4 py-10 lg:px-0'>
        <UserDetails />
      </div>
    </section>
  );
}
