'use client';

import {
  ElementType,
  ReactNode,
  experimental_useOptimistic as useOptimistic,
} from 'react';
import { dislikeAction, likeAction } from './actions';

export default function LikesOptimistic({
  children,
  className,
  type,
  id,
  likeCount,
}: {
  id: string;
  likeCount: number;
  type: 'like' | 'dislike';
  className?: string;
  children: ReactNode;
}) {
  const [optimisticLikes, addOptimisticLikes] = useOptimistic(
    { likeCount, sending: false },
    (state, newLikeCount: number) => ({
      ...state,
      likeCount: newLikeCount,
      sending: true,
    })
  );

  console.log({ type });

  return (
    <button
      className={`${className ? className : ''}`}
      onClick={async () => {
        if (type === 'like') {
          addOptimisticLikes(optimisticLikes.likeCount + 1);
          likeAction(id);
        }

        if (type === 'dislike') {
          addOptimisticLikes(optimisticLikes.likeCount + 1);
          dislikeAction(id);
        }
      }}>
      {children}{' '}
      <span
        style={{
          fontSize: '0.8rem',
          position: 'absolute',
          right: '-2px',
          top: '-2px',
        }}>
        {optimisticLikes.likeCount}
      </span>
    </button>
  );
}
