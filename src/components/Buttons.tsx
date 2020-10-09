'use client';

import { signOut } from 'next-auth/react';

export function SignInButton() {
  return <button>Sign In</button>;
}

export function SignOutButton() {
  return <button onClick={() => signOut()}>Sign Out</button>;
}
