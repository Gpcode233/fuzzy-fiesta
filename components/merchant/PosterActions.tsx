'use client';

import { useMemo, useRef, useState } from 'react';
import { toPng } from 'html-to-image';
import QRCode from 'qrcode';
import type { PaymentLink } from '@/types';
import { PrintPoster } from '@/components/merchant/PrintPoster';

interface PosterActionsProps {
  paymentLink: PaymentLink;
  appUrl: string;
  className?: string;
}

const waitForRender = () => new Promise<void>((resolve) => {
  requestAnimationFrame(() => requestAnimationFrame(() => resolve()));
});

export function PosterActions({ paymentLink, appUrl, className }: PosterActionsProps) {
  const [qrDataUrl, setQrDataUrl] = useState<string>('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const posterRef = useRef<HTMLDivElement>(null);

  const checkoutUrl = useMemo(() => `${appUrl}/pay/${paymentLink.id}`, [appUrl, paymentLink.id]);

  const ensureQrCode = async () => {
    if (!qrDataUrl) {
      const dataUrl = await QRCode.toDataURL(checkoutUrl, {
        width: 300,
        margin: 2,
        color: { dark: '#000000', light: '#FFFFFF' }
      });
      setQrDataUrl(dataUrl);
    }

    await waitForRender();
  };

  const printPoster = async () => {
    try {
      setLoading(true);
      setError(null);
      await ensureQrCode();
      window.print();
    } catch {
      setError('Could not prepare poster for printing. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const downloadPoster = async () => {
    try {
      setLoading(true);
      setError(null);
      await ensureQrCode();

      if (!posterRef.current) {
        throw new Error('Poster node missing');
      }

      const dataUrl = await toPng(posterRef.current, { cacheBust: true });
      const link = document.createElement('a');
      link.download = `${paymentLink.name.toLowerCase().replaceAll(/[^a-z0-9]+/g, '-')}-payment-poster.png`;
      link.href = dataUrl;
      link.click();
    } catch {
      setError('Could not download poster. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div className={className}>
        <button className="btn-primary" type="button" onClick={printPoster} disabled={loading}>
          🖨 Print Poster
        </button>
        <button className="rounded-lg border border-white/20 px-4 py-2 text-sm" type="button" onClick={downloadPoster} disabled={loading}>
          ⬇ Download PNG
        </button>
      </div>
      {error ? <p className="text-sm text-red-300">{error}</p> : null}
      <div className="pointer-events-none fixed left-[-9999px] top-0 print:pointer-events-auto print:static print:mt-0" ref={posterRef}>
        {qrDataUrl ? <PrintPoster paymentLink={paymentLink} qrDataUrl={qrDataUrl} checkoutUrl={checkoutUrl} /> : null}
      </div>
    </>
  );
}
