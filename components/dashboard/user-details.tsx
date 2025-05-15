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
      <span className='relative block font-mono text-xs'>
        <span className='block w-full truncate'>{value}</span>
        {children}
      </span>
    </div>
  );
}

export function UserDetails() {
  const { user } = useUser();
  const { session } = useSession();
  const { organization } = useOrganization();

  if (!user || !session) return null;

  return (
    <div className='relative'>
      <div className='text-secondary-foreground mx-auto max-w-xl p-8'>
        <div className='relative flex w-full items-center justify-center'>
          <img
            src={user.imageUrl}
            alt='user Image'
            className='border-background size-24 rounded-full border-2'
          />
        </div>
        <h2 className='text-secondary-foreground mt-4 mb-2 text-base font-semibold'>
          User details
        </h2>
        <div className='rounded-base border-background bg-secondary-foreground divide-secondary text-secondary divide-y border-2 px-2'>
          <Row desc='Email' value={user.emailAddresses[0].emailAddress}>
            <span className='sr-only'>Email</span>
          </Row>
          <Row desc='Last signed in' value={formatDate(user.lastSignInAt!)}>
            <span className='sr-only'>Last Signed In</span>
          </Row>
          <Row desc='Joined on' value={formatDate(user.createdAt!)}>
            <span className='sr-only'>Joined On</span>
          </Row>
          <Row desc='User ID' value={user.id}>
            <span className='sr-only'>User ID</span>
          </Row>
        </div>
        <h2 className='text-secondary-foreground mt-6 mb-2 text-base font-semibold'>
          Session details
        </h2>
        <div className='rounded-base border-background bg-secondary-foreground divide-secondary text-secondary divide-y border-2 px-2'>
          <Row desc='Session ID' value={session.id}>
            <span className='sr-only'>Session ID</span>
          </Row>
          <Row desc='Status' value={session.status}>
            <span className='sr-only'>Status</span>
          </Row>
          <Row
            desc='Last active'
            value={formatDateWithNumbers(session.lastActiveAt)}
          >
            <span className='sr-only'>Last Active</span>
          </Row>
          <Row
            desc='Session expiration'
            value={formatDateWithNumbers(session.expireAt)}
          >
            <span className='sr-only'>Session Expiration</span>
          </Row>
        </div>
        {organization ? (
          <>
            <h2 className='text-secondary-foreground mt-6 mb-2 text-base font-semibold'>
              Organization detail
            </h2>
            <div className='rounded-base border-background bg-secondary-foreground divide-secondary text-secondary divide-y border-2 px-2.5'>
              <Row desc='Organization ID' value={organization.id}>
                <span className='sr-only'>Organization ID</span>
              </Row>
              <Row desc='Name' value={organization.name}>
                <span className='sr-only'>Name</span>
              </Row>
              <Row desc='Members' value={String(organization.membersCount)}>
                <span className='sr-only'>Members</span>
              </Row>
              <Row
                desc='Pending invitations'
                value={String(organization.pendingInvitationsCount)}
              >
                <span className='sr-only'>Pending Invitations</span>
              </Row>
            </div>
          </>
        ) : null}
      </div>
    </div>
  );
}
