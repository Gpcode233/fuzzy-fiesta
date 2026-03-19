'use client';

import { useMemo, useState } from 'react';
import Link from 'next/link';
import { PosterActions } from '@/components/merchant/PosterActions';
import type { PaymentLink } from '@/types';

export function PaymentLinkCard({ link }: { link: PaymentLink }) {
  const appUrl = process.env.NEXT_PUBLIC_APP_URL ?? 'http://localhost:3000';
  const shareUrl = useMemo(() => `${appUrl}/pay/${link.id}`, [appUrl, link.id]);
  const [copied, setCopied] = useState(false);

  const copyLink = async () => {
    await navigator.clipboard.writeText(shareUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };

  return (
    <article className="card space-y-3">
      <div>
        <p className="text-xs uppercase tracking-wide text-white/60">Your store link</p>
        <h4 className="text-lg font-semibold">{link.title}</h4>
        <p className="text-sm text-white/70">You&apos;ll receive in {link.settlementCurrency}</p>
      </div>

      <div className="rounded-lg border border-white/10 bg-black/20 p-3 text-sm text-white/80">
        <p>{shareUrl.replace(/^https?:\/\//, '')}</p>
      </div>

      <div className="flex flex-wrap gap-2">
        <button className="rounded-lg border border-white/20 px-3 py-2 text-sm" type="button" onClick={copyLink}>
          {copied ? 'Copied!' : 'Copy link'}
        </button>
        <Link href={shareUrl} className="rounded-lg border border-white/20 px-3 py-2 text-sm">
          Share preview
        </Link>
      </div>

      <PosterActions paymentLink={link} appUrl={appUrl} className="flex flex-wrap gap-2" />
    </article>
  );
}
