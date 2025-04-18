import { UserDetails } from "@/components/dashboard/user-details";
import { CodeSwitcher } from "@/components/dashboard/code-switcher";

export default async function DashboardPage() {
  return (
    <>
      <section className='bf-backgroun mx-auto w-full max-w-[75rem]'>
        <div className='grid grid-cols-1 gap-4 px-4 py-10 lg:grid-cols-[1fr_20.5rem] lg:px-0'>
          <div>
            <UserDetails />
          </div>
          <div>
            <CodeSwitcher />
          </div>
        </div>
      </section>
    </>
  );
}
