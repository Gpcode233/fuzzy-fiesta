'use client';

import { useEffect } from 'react';

export function PosterPrintTrigger({ enabled }: { enabled: boolean }) {
  useEffect(() => {
    if (!enabled) {
      return;
    }

    const frame = requestAnimationFrame(() => {
      window.print();
    });

    return () => cancelAnimationFrame(frame);
  }, [enabled]);

  return null;
}
