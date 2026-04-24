'use client';

import { useMemo, useState } from 'react';
import type { PaymentLink } from '@/types';
import { buildDemoCheckoutPath } from '@/lib/demo';

interface PosterActionsProps {
  paymentLink: PaymentLink;
  appUrl: string;
  className?: string;
}

export function PosterActions({ paymentLink, appUrl, className }: PosterActionsProps) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const checkoutPath = useMemo(() => buildDemoCheckoutPath(paymentLink), [paymentLink]);
  const posterPath = useMemo(
    () => `/poster/${paymentLink.id}${checkoutPath.includes('?') ? checkoutPath.slice(checkoutPath.indexOf('?')) : ''}`,
    [checkoutPath, paymentLink.id]
  );
  const openPosterPath = useMemo(() => `${appUrl}${posterPath}`, [appUrl, posterPath]);
  const printPosterPath = useMemo(() => `${openPosterPath}${openPosterPath.includes('?') ? '&' : '?'}print=1`, [openPosterPath]);

  const printPoster = async () => {
    try {
      setLoading(true);
      setError(null);
      window.open(printPosterPath, '_blank', 'noopener,noreferrer');
    } catch {
      setError('Could not prepare poster for printing. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const openPoster = async () => {
    try {
      setLoading(true);
      setError(null);
      window.open(openPosterPath, '_blank', 'noopener,noreferrer');
    } catch {
      setError('Could not open poster preview. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div className={className}>
        <button className="btn-primary" type="button" onClick={printPoster} disabled={loading}>
          Print Poster
        </button>
        <button className="rounded-lg border border-white/20 px-4 py-2 text-sm" type="button" onClick={openPoster} disabled={loading}>
          Open Poster
        </button>
      </div>
      {error ? <p className="text-sm text-red-300">{error}</p> : null}
    </>
  );
}
