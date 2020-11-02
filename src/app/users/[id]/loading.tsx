import styles from './page.module.scss';

export default function LoadingUser() {
  return (
    <article className={styles.card}>
      <h1 className={`${styles.cardTitle} ${styles.skeleton}`}></h1>
      <div className={`${styles.cardImg} ${styles.skeleton}`}></div>
      <div className={styles.cardBody}>
        <h2 className={`${styles.cardSubTitle} ${styles.skeleton}`}></h2>
        <p className={`${styles.cardIntro} ${styles.skeleton}`}></p>
        <button className={`${styles.btn} ${styles.skeleton}`}></button>
      </div>
    </article>
  );
}
