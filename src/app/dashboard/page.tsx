import { getServerSession } from 'next-auth';
import { authOptions } from '../api/auth/[...nextauth]/route';
import { redirect } from 'next/navigation';
import { User } from '@prisma/client';
import { db } from '@/src/server/db.server';
import ProfileForm from './ProfileForm';
import { revalidatePath } from 'next/cache';

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

  async function handleAction(formData: FormData) {
    'use server';
    const formD = Object.fromEntries(formData) as unknown as User;

    // add validations
    formD.age = Number(formD.age);

    const data = {
      name: formD.name,
      image: formD.image,
      age: formD.age,
      bio: formD.bio,
    };

    // submit data
    try {
      const updatedUser = await db.user.update({
        where: {
          id: user.id,
        },
        data,
      });
      return updatedUser;
    } catch (error) {
      throw error;
    }

    revalidatePath('/dashboard');
  }

  return (
    <>
      <h1>Dashboard</h1>
      <ProfileForm user={user} onSubmit={handleAction} />
    </>
  );
}
