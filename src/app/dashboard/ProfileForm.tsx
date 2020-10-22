'use client';

import { User } from '@prisma/client';
import styles from './ProfileForm.module.css';
import { useState } from 'react';

interface IProp {
  user: User;
  onSubmit: (formData: FormData) => Promise<User>;
}

export default function ProfileForm({ user, onSubmit }: IProp) {
  const [message, setMessage] = useState<{
    message: string;
    alert: '' | 'success' | 'error';
  }>({
    message: '',
    alert: '',
  });

  async function action(formData: FormData) {
    try {
      await onSubmit(formData);
      setMessage({
        message: 'Your profile was successfully updated',
        alert: 'success',
      });
    } catch (error) {
      // @TODO: handle user data appropriately
      setMessage({
        message: 'Failed to update user details',
        alert: 'error',
      });
    }
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

        {message.message && (
          <div
            className={`${styles.formControl} ${styles.alert} ${
              styles[message.alert]
            } `}
            role='alert'
            onClick={() => setMessage({ message: '', alert: '' })}>
            <p>{message.message}</p>
          </div>
        )}

        <div className={styles.formControl}>
          <button className={styles.btn} type='submit'>
            Save
          </button>
        </div>
      </form>
    </section>
  );
}
