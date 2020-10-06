export const dynamic = 'force-static';

import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'About us',
  description: 'We are a social media company',
};

export default function About() {
  return (
    <main>
      <h1>About</h1>
      <p>We are a social media company!</p>
    </main>
  );
}
