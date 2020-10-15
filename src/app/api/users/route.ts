import { db } from '@/src/server/db.server';
import { getServerSession } from 'next-auth';
import { NextResponse } from 'next/server';

export async function GET(request: Request) {
  const session = getServerSession();

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
