import FollowButton from '@/src/components/followButton/FollowButton';
import { db } from '@/src/server/db.server';
import { User } from '@prisma/client';
import Image from 'next/image';
import { notFound } from 'next/navigation';
import styles from './page.module.scss';
import Likes from './Likes';
import IconHeartFull from '@/src/components/icons/IconHeartFull';
import IconDislike from '@/src/components/icons/IconDislike';
import LikesOptimistic from './LikesOptimistic';

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

export async function generateMetadata({ params }: IProps) {
  const user = await getUser(params.id);
  return { title: `User profile of ${user?.name}` };
}

export default async function UserProfilePage({ params: { id } }: IProps) {
  const user = await getUser(id);

  if (!user) {
    notFound();
  }

  const likes = user?.likes ? user.likes : 0;
  const dislikes = user?.dislikes ? user.dislikes : 0;

  return (
    <section className={styles.card}>
      <h1 className={styles.cardTitle}>{user?.name}</h1>
      <Image
        src={user.image || '/mememan.webp'}
        width={300}
        height={300}
        alt={`Mememan's profile`}
        className={styles.cardImg}
      />

      <div className={styles.cardBody}>
        <h3 className={styles.cardSubTitle}>Bio</h3>
        <p className={styles.cardIntro}>
          {user.bio || 'user does not have a bio text'}
        </p>

        <footer className={styles.footer}>
          <FollowButton targetUserId={id} />

          <div className={styles.icons}>
            <LikesOptimistic
              likeCount={likes}
              id={id}
              type='like'
              className={`${styles.likes} ${styles.iconHeart}`}>
              <IconHeartFull className={styles.icon} />
            </LikesOptimistic>

            <LikesOptimistic
              likeCount={dislikes}
              id={id}
              type='dislike'
              className={styles.likes}>
              <IconDislike className={styles.icon} />
            </LikesOptimistic>
          </div>
        </footer>
      </div>
    </section>
  );
}
