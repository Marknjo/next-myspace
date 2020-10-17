import { db } from '@/src/server/db.server';
import { User } from '@prisma/client';
import Image from 'next/image';
import { notFound } from 'next/navigation';

async function getUser(id: string): Promise<User | null> {
  const user = await db.user.findFirst({ where: { id } });

  if (!user) {
    return null;
  }

  return user;
}

interface IProps {
  params: {
    id: string;
  };
}

export default async function UserProfilePage({ params: { id } }: IProps) {
  const user = await getUser(id);

  if (!user) {
    notFound();
  }

  return (
    <section>
      <h1>{user.name}</h1>
      <Image
        src={user.image || '/mememan.webp'}
        width={300}
        height={300}
        alt={`Mememan's profile`}
      />

      <h3>Bio</h3>
      <p>{user.bio || 'user does not have a bio text'}</p>
    </section>
  );
}
