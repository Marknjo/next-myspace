import { getServerSession } from 'next-auth';
import { authOptions } from '../api/auth/[...nextauth]/route';
import { redirect } from 'next/navigation';
import { User } from '@prisma/client';
import { db } from '@/src/server/db.server';
import ProfileForm from './ProfileForm';

async function getUser(email: string): Promise<User> {
  const user = await db.user.findFirst({ where: { email: email } });

  return user!;
}

export default async function DashboardPage() {
  const session = await getServerSession(authOptions);

  if (!session) {
    redirect('/api/auth/signin');
  }

  const email = session.user?.email;

  if (!email) {
    redirect('/');
  }

  const user = await getUser(email);

  return (
    <>
      <h1>Dashboard</h1>
      <ProfileForm user={user} />
    </>
  );
}
