import Image from 'next/image';
import Link from 'next/link';
import styles from './MainNav.module.css';
import { SignInButton, SignOutButton } from '../components/Buttons';
import AuthCheck from '../components/AuthCheck';

export default function MainNav() {
  return (
    <nav className={styles.nav}>
      <Link href='/'>
        <Image src='/logo.svg' width={216} height={30} alt='NextSpace Logo' />
      </Link>

      <ul className={styles.links}>
        <li>
          <Link href='/about'>About</Link>
        </li>
        <li>
          <Link href='/blog'>Blog</Link>
        </li>
        <li>
          <Link href='/users'>Users</Link>
        </li>

        <li>
          <SignInButton />
        </li>

        <li>
          <AuthCheck>
            <SignOutButton />
          </AuthCheck>
        </li>
      </ul>
    </nav>
  );
}
