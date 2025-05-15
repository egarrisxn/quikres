"use client";

import { useOrganization, useSession, useUser } from "@clerk/nextjs";
import { motion } from "motion/react";
import { formatDate, formatDateWithNumbers } from "@/lib/utils";
import { DetailRow } from "@/components/dashboard/detail-row";

export default function DashboardClient() {
  const { user } = useUser();
  const { session } = useSession();
  const { organization } = useOrganization();

  if (!user || !session) return null;

  const fadeIn = {
    hidden: { opacity: 0, y: 10 },
    show: { opacity: 1, y: 0, transition: { duration: 0.4, ease: "easeOut" } },
  };

  return (
    <motion.div
      className='mx-auto max-w-xl p-8'
      initial='hidden'
      animate='show'
      variants={{ show: { transition: { staggerChildren: 0.1 } } }}
    >
      <motion.section
        className='mx-auto mb-6 flex items-center justify-center'
        variants={fadeIn}
      >
        <img
          src={user.imageUrl}
          alt='user Image'
          className='border-background size-32 rounded-full border-2'
        />
      </motion.section>
      <motion.section variants={fadeIn}>
        <h2 className='text-secondary-foreground mt-4 mb-2 text-base font-semibold'>
          User details
        </h2>
        <div className='rounded-base border-background bg-secondary-foreground divide-secondary text-secondary divide-y border-2 px-2'>
          <DetailRow desc='Email' value={user.emailAddresses[0].emailAddress}>
            <span className='sr-only'>Email</span>
          </DetailRow>
          <DetailRow
            desc='Last signed in'
            value={formatDate(user.lastSignInAt!)}
          >
            <span className='sr-only'>Last Signed In</span>
          </DetailRow>
          <DetailRow desc='Joined on' value={formatDate(user.createdAt!)}>
            <span className='sr-only'>Joined On</span>
          </DetailRow>
          <DetailRow desc='User ID' value={user.id}>
            <span className='sr-only'>User ID</span>
          </DetailRow>
        </div>
        <h2 className='text-secondary-foreground mt-6 mb-2 text-base font-semibold'>
          Session details
        </h2>
        <div className='rounded-base border-background bg-secondary-foreground divide-secondary text-secondary divide-y border-2 px-2'>
          <DetailRow desc='Session ID' value={session.id}>
            <span className='sr-only'>Session ID</span>
          </DetailRow>
          <DetailRow desc='Status' value={session.status}>
            <span className='sr-only'>Status</span>
          </DetailRow>
          <DetailRow
            desc='Last active'
            value={formatDateWithNumbers(session.lastActiveAt)}
          >
            <span className='sr-only'>Last Active</span>
          </DetailRow>
          <DetailRow
            desc='Session expiration'
            value={formatDateWithNumbers(session.expireAt)}
          >
            <span className='sr-only'>Session Expiration</span>
          </DetailRow>
        </div>
        {organization ? (
          <>
            <h2 className='text-secondary-foreground mt-6 mb-2 text-base font-semibold'>
              Organization detail
            </h2>
            <div className='rounded-base border-background bg-secondary-foreground divide-secondary text-secondary divide-y border-2 px-2.5'>
              <DetailRow desc='Organization ID' value={organization.id}>
                <span className='sr-only'>Organization ID</span>
              </DetailRow>
              <DetailRow desc='Name' value={organization.name}>
                <span className='sr-only'>Name</span>
              </DetailRow>
              <DetailRow
                desc='Members'
                value={String(organization.membersCount)}
              >
                <span className='sr-only'>Members</span>
              </DetailRow>
              <DetailRow
                desc='Pending invitations'
                value={String(organization.pendingInvitationsCount)}
              >
                <span className='sr-only'>Pending Invitations</span>
              </DetailRow>
            </div>
          </>
        ) : null}
      </motion.section>
    </motion.div>
  );
}
