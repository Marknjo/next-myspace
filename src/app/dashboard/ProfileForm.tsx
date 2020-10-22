import { User } from '@prisma/client';
import styles from './ProfileForm.module.css';
import { revalidatePath } from 'next/cache';
import { db } from '@/src/server/db.server';

interface IProp {
  user: User;
}

export default function ProfileForm({ user }: IProp) {
  async function action(formData: FormData) {
    'use server';
    const formD = Object.fromEntries(formData) as unknown as User;

    // add validations
    formD.age = Number(formD.age);

    const data = {
      name: formD.name,
      image: formD.image,
      age: formD.age,
      bio: formD.bio,
    };

    // submit data
    try {
      await db.user.update({
        where: {
          id: user.id,
        },
        data,
      });
    } catch (error) {
      throw new Error('Could not update the form');
    }

    revalidatePath('/dashboard');
  }

  return (
    <section className={styles.container}>
      <h2>Edit Your Profile</h2>

      <form action={action} className={styles.form}>
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
