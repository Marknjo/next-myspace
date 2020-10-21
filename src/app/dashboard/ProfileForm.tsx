import { User } from '@prisma/client';
import styles from './ProfileForm.module.css';

interface IProp {
  user: User;
}

export default function ProfileForm({ user }: IProp) {
  return (
    <section className={styles.container}>
      <h2>Edit Your Profile</h2>

      <form action='' className={styles.form}>
        <div className={styles.formControl}>
          <label className={styles.label} htmlFor='name'>
            Name
          </label>
          <input
            className={styles.formInput}
            type='text'
            name='name'
            id='name'
            defaultValue={user?.name ?? ''}
          />
        </div>

        <div className={styles.formControl}>
          <label className={styles.label} htmlFor='bio'>
            Bio
          </label>
          <textarea
            className={styles.formInput}
            name='bio'
            id='bio'
            defaultValue={user?.bio ?? ''}
            rows={10}
          />
        </div>

        <div className={styles.formControl}>
          <label className={styles.label} htmlFor='age'>
            Age
          </label>
          <input
            className={styles.formInput}
            type='number'
            min={10}
            max={150}
            name='age'
            id='age'
            defaultValue={user?.age ?? 0}
          />
        </div>

        <div className={styles.formControl}>
          <label className={styles.label} htmlFor='image'>
            image
          </label>
          <input
            className={styles.formInput}
            type='text'
            name='image'
            id='image'
            defaultValue={user?.image ?? 0}
          />
        </div>

        <div className={styles.formControl}>
          <button className={styles.btn} type='submit'>
            Save
          </button>
        </div>
      </form>
    </section>
  );
}
