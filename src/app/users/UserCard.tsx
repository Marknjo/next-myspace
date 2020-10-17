import { User } from '@prisma/client';
import styles from './UserCard.module.css';
import Image from 'next/image';
import Link from 'next/link';

interface IProps {
  user: User;
}

export default function UserCard({ user }: IProps) {
  return (
    <article className={styles.card}>
      <Image
        src={user.image ?? '/mememan.webp'}
        alt={`${user.name}'s profile`}
        className={styles.cardImage}
        width={150}
        height={120}
      />

      <header className={styles.cardContent}>
        <h3>
          <Link href={`/users/${user.id}`}>{user.name}</Link>
        </h3>
        <p>Age: {user?.age || 'n/a'}</p>
      </header>
    </article>
  );
}
