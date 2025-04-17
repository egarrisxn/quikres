"use client";

import { useOrganization, useSession, useUser } from "@clerk/nextjs";
import { formatDate, formatDateWithNumbers } from "@/lib/utils";

function Row({
  desc,
  value,
  children,
}: {
  desc: string;
  value: string;
  children: React.ReactNode;
}) {
  return (
    <div className='relative grid h-[2.125rem] grid-cols-2 items-center'>
      <span className='block flex-shrink-0 text-xs font-semibold'>{desc}</span>
      <span className='relative block font-mono text-xs text-slate-500'>
        <span className='block w-full truncate'>{value}</span>
        {children}
      </span>
    </div>
  );
}

function PointerC({ label }: { label: string }) {
  return (
    <div className='absolute top-1/2 left-full flex w-fit -translate-y-1/2 items-center gap-5'>
      <div className='relative'>
        <div className='h-px w-[6.5rem] bg-slate-400' />
        <div className='absolute top-1/2 right-0 size-1 -translate-y-1/2 rotate-45 bg-slate-400' />
      </div>
      <div className='rounded-base bg-black px-1.5 py-1 font-mono text-xs text-white'>
        {label}
      </div>
    </div>
  );
}

export function UserDetails() {
  const { user } = useUser();
  const { session } = useSession();
  const { organization } = useOrganization();

  if (!user || !session) return null;

  return (
    <div className='rounded-base border-border relative border bg-slate-200 p-16'>
      <div className='max-w-[25rem] rounded-xl bg-slate-100 p-8 shadow-[0_5px_15px_rgba(0,0,0,0.08),0_15px_35px_-5px_rgba(25,28,33,0.2)] ring-1 ring-gray-950/5'>
        <div className='mb-6 flex flex-col items-center gap-2'>
          <div className='relative flex w-full justify-center'>
            <img
              src={user.imageUrl}
              alt='user Image'
              className='size-20 rounded-full'
            />
            <div className='absolute top-1/2 left-full flex w-fit -translate-x-2.5 -translate-y-1/2 items-center gap-5'>
              <div className='relative'>
                <div className='h-px w-[6.5rem] bg-slate-400' />
                <div className='absolute top-1/2 right-0 size-1 -translate-y-1/2 rotate-45 bg-slate-400' />
              </div>
              <div className='rounded-base bg-black px-1.5 py-1 font-mono text-xs text-white'>
                user.imageUrl
              </div>
            </div>
          </div>
          {user.firstName && user.lastName ? (
            <h1 className='relative w-full text-center text-[1.0625rem] font-semibold'>
              {user.firstName} {user.lastName}
              <div className='absolute top-1/2 left-full flex w-fit -translate-x-2.5 -translate-y-1/2 items-center gap-5'>
                <div className='relative'>
                  <div className='h-px w-[6.5rem] bg-slate-400' />
                  <div className='absolute top-1/2 right-0 size-1 -translate-y-1/2 rotate-45 bg-slate-400' />
                </div>
                <div className='rounded-base bg-black px-1.5 py-1 font-mono text-xs text-white'>
                  user.firstName
                </div>
                <div className='rounded-base -translate-x-3 bg-black px-1.5 py-1 font-mono text-xs text-white'>
                  user.lastName
                </div>
              </div>
            </h1>
          ) : (
            <div className='h-4' />
          )}
        </div>

        <div className='rounded-base divide-y divide-slate-200 bg-slate-50 px-2.5 text-slate-800'>
          <Row desc='Email' value={user.emailAddresses[0].emailAddress}>
            <PointerC label='user.emailAddresses[0].emailAddress' />
          </Row>
          <Row desc='Last signed in' value={formatDate(user.lastSignInAt!)}>
            <PointerC label='user.lastSignInAt' />
          </Row>
          <Row desc='Joined on' value={formatDate(user.createdAt!)}>
            <PointerC label='user.createdAt' />
          </Row>
          <Row desc='User ID' value={user.id}>
            <PointerC label='user.user.id' />
          </Row>
        </div>
        <h2 className='mt-6 mb-4 text-[0.9375rem] font-semibold text-slate-950'>
          Session details
        </h2>
        <div className='rounded-base divide-y divide-slate-200 bg-slate-50 px-2.5 text-slate-800'>
          <Row desc='Session ID' value={session.id}>
            <PointerC label='session.id' />
          </Row>
          <Row desc='Status' value={session.status}>
            <PointerC label='session.status' />
          </Row>
          <Row
            desc='Last active'
            value={formatDateWithNumbers(session.lastActiveAt)}
          >
            <PointerC label='session.lastActiveAt' />
          </Row>
          <Row
            desc='Session expiration'
            value={formatDateWithNumbers(session.expireAt)}
          >
            <PointerC label='session.expireAt' />
          </Row>
        </div>
        {organization ? (
          <>
            <h2 className='mt-6 mb-4 text-[0.9375rem] font-semibold text-slate-950'>
              Organization detail
            </h2>
            <div className='rounded-base divide-y divide-slate-200 bg-slate-50 px-2.5 text-slate-800'>
              <Row desc='Organization ID' value={organization.id}>
                <PointerC label='organization.id' />
              </Row>
              <Row desc='Name' value={organization.name}>
                <PointerC label='organization.name' />
              </Row>
              <Row desc='Members' value={String(organization.membersCount)}>
                <PointerC label='organization.membersCount' />
              </Row>
              <Row
                desc='Pending invitations'
                value={String(organization.pendingInvitationsCount)}
              >
                <PointerC label='organization.pendingInvitationsCount' />
              </Row>
            </div>
          </>
        ) : null}
      </div>
    </div>
  );
}
