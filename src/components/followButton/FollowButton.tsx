import { getServerSession } from 'next-auth';
import FollowClient from './FollowClient';
import { authOptions } from '@/src/app/api/auth/[...nextauth]/route';
import { db } from '@/src/server/db.server';

interface IProps {
  targetUserId: string;
}

export default async function FollowButton({ targetUserId }: IProps) {
  const session = await getServerSession(authOptions);

  const currentUserId = await db.user
    .findFirst({
      where: { email: session?.user?.email! },
    })
    .then((user) => user?.id);

  const isFollowing = await db.follows.findFirst({
    where: { followerId: currentUserId, followingId: targetUserId },
  });

  return (
    <FollowClient targetUserId={targetUserId} isFollowing={!!isFollowing} />
  );
}
