'use client';

import { ElementType, ReactNode, useTransition } from 'react';
import { dislikeAction, likeAction } from './actions';

export default function Likes({
  children,
  className,
  type,
  id,
}: {
  id: string;
  type: 'like' | 'dislike';
  className?: string;
  children: ReactNode;
}) {
  const [isPending, startTransition] = useTransition();

  return (
    <button
      className={`${className ? className : ''}`}
      onClick={() =>
        startTransition(() => {
          if (type === 'like') {
            likeAction(id);
          }

          if (type === 'dislike') {
            dislikeAction(id);
          }
        })
      }>
      {children}
    </button>
  );
}
