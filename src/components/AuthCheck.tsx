'use client';

import { useSession } from 'next-auth/react';
import { ReactNode } from 'react';

interface IProps {
  children: ReactNode;
}

export default function AuthCheck({ children }: IProps) {
  const { data: session, status } = useSession();

  if (status === 'authenticated') {
    return <>{children}</>;
  } else {
    return null;
  }
}
