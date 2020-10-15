'use client';

import { Session } from 'next-auth';
import { SessionProvider, useSession } from 'next-auth/react';
import { ReactNode } from 'react';

interface IProps {
  children: ReactNode;
  session: Session | null | undefined;
}

export default function AuthProvider({ session, children }: IProps) {
  return <SessionProvider session={session}>{children}</SessionProvider>;
}
