'use server';

import { db } from '@/src/server/db.server';
import { revalidatePath } from 'next/cache';

export async function likeAction(id: string) {
  const user = await db.user.findUnique({ where: { id } });

  const likes = user?.likes ? user.likes + 1 : 1;

  await db.user.update({
    where: {
      id,
    },
    data: {
      likes,
    },
  });

  revalidatePath(`/users/${id}`);
}

export async function dislikeAction(id: string) {
  const user = await db.user.findUnique({ where: { id } });

  const dislikes = user?.dislikes && user.dislikes > 0 ? user.dislikes + 1 : 1;

  await db.user.update({
    where: {
      id,
    },
    data: {
      dislikes,
    },
  });

  revalidatePath(`/users/${id}`);
}
