import { db } from '@/src/server/db.server';
import styles from './page.module.css';
import UserCard from './UserCard';

export default async function Users() {
  const users = await db.user.findMany();

  return (
    <div className={styles.grid}>
      {users.map((user) => (
        <UserCard key={user.id} user={user} />
      ))}
    </div>
  );
}
