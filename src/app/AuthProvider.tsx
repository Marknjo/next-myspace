'use client';

import { SessionProvider } from 'next-auth/react';
import { ReactNode } from 'react';

interface IProps {
  children: ReactNode;
}

export default function AuthProvider({ children }: IProps) {
  return <SessionProvider>{children}</SessionProvider>;
}
