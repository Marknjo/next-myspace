import { DefaultSession, getServerSession } from 'next-auth';
import { authOptions } from '../auth/[...nextauth]/route';
import { NextResponse } from 'next/server';
import { db } from '@/src/server/db.server';

async function isLoggedIn(): Promise<
  DefaultSession['user'] | { message: string }
> {
  const session = await getServerSession(authOptions);

  if (!session) {
    return { message: 'Please login' };
  }

  return session.user!;
}

export async function POST(req: Request) {
  const sessionUser = await isLoggedIn();

  if ((sessionUser as { message: string })?.message) {
    return NextResponse.json(sessionUser as { message: string }, {
      status: 401,
      statusText: 'Unauthorized',
    });
  }

  const { targetUserId } = await req.json();

  const user = sessionUser as DefaultSession['user'];

  const email = user!.email!;

  const currentUser = await db.user.findUnique({ where: { email } });

  const record = await db.follows.create({
    data: {
      followerId: currentUser!.id,
      followingId: targetUserId,
    },
  });

  return NextResponse.json(record);
}

// remove relationship
export async function DELETE(req: Request) {
  const sessionUser = await isLoggedIn();

  if ((sessionUser as { message: string })?.message) {
    return NextResponse.json(sessionUser as { message: string }, {
      status: 401,
      statusText: 'Unauthorized',
    });
  }

  const user = sessionUser as DefaultSession['user'];

  const email = user!.email!;

  const targetUserId = new URL(req.url).searchParams.get('targetUserId');

  const currentUser = await db.user.findUnique({ where: { email } });
  const userId = currentUser!.id;

  const record = await db.follows.delete({
    where: {
      followerId_followingId: {
        followerId: userId,
        followingId: targetUserId!,
      },
    },
  });

  return NextResponse.json(record);
}
