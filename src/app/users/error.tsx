'use client';

import { useEffect } from 'react';

export default function Error({
  error,
  reset,
}: {
  error: Error;
  reset: () => void;
}) {
  return (
    <section>
      <p>Something went wrong!</p>
      <button onClick={() => reset()}>Try Again</button>
    </section>
  );
}
