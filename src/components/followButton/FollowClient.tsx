'use client';

import { useRouter } from 'next/navigation';
import { useState, useTransition } from 'react';

interface IProps {
  targetUserId: string;
  isFollowing: boolean;
}

export default function FollowClient({ targetUserId, isFollowing }: IProps) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const [isFetching, setIsFetching] = useState(false);
  const isMutating = isFetching || isPending;

  async function unfollowHandler() {
    setIsFetching(true);

    const res = await fetch(`/api/follow?targetUserId=${targetUserId}`, {
      method: 'DELETE',
    });

    setIsFetching(false);
    startTransition(() => router.refresh());
  }

  async function followHandler() {
    setIsFetching(true);

    const res = await fetch('/api/follow', {
      method: 'POST',
      body: JSON.stringify({ targetUserId }),
      headers: {
        'Content-Type': 'application/json',
      },
    });

    setIsFetching(false);

    startTransition(() => {
      router.refresh();
    });
  }

  if (isFollowing) {
    return (
      <button onClick={unfollowHandler}>
        {!isMutating ? 'Unfollow' : '...'}
      </button>
    );
  }

  return (
    <button onClick={followHandler}>{!isMutating ? 'Follow' : '...'}</button>
  );
}
