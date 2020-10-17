import { db } from '@/src/server/db.server';
import { getServerSession } from 'next-auth';
import { NextResponse } from 'next/server';
import { authOptions } from '../auth/[...nextauth]/route';

export async function GET(request: Request) {
  const session = getServerSession(authOptions);

  if (!session) {
    return NextResponse.json(
      { message: 'Please login' },
      {
        status: 401,
        statusText: 'Unauthorized',
      }
    );
  }

  const users = await db.user.findMany();

  return NextResponse.json(users);
}
