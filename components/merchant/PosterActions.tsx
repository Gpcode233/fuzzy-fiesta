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

export function PosterActions({ paymentLink, appUrl, className }: PosterActionsProps) {
  const [qrDataUrl, setQrDataUrl] = useState<string>('');
  const [loading, setLoading] = useState(false);
  const posterRef = useRef<HTMLDivElement>(null);

  const checkoutUrl = useMemo(() => `${appUrl}/pay/${paymentLink.id}`, [appUrl, paymentLink.id]);

  const ensureQrCode = async () => {
    if (qrDataUrl) return qrDataUrl;
    const dataUrl = await QRCode.toDataURL(checkoutUrl, {
      width: 300,
      margin: 2,
      color: { dark: '#000000', light: '#FFFFFF' }
    });
    setQrDataUrl(dataUrl);
    return dataUrl;
  };

  const printPoster = async () => {
    setLoading(true);
    await ensureQrCode();
    setLoading(false);
    window.print();
  };

  const downloadPoster = async () => {
    setLoading(true);
    await ensureQrCode();

    if (!posterRef.current) {
      setLoading(false);
      return;
    }

    const dataUrl = await toPng(posterRef.current, { cacheBust: true });
    const link = document.createElement('a');
    link.download = `${paymentLink.name.toLowerCase().replaceAll(/[^a-z0-9]+/g, '-')}-payment-poster.png`;
    link.href = dataUrl;
    link.click();
    setLoading(false);
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
      <div className="pointer-events-none fixed left-[-9999px] top-0 print:pointer-events-auto print:static print:mt-0" ref={posterRef}>
        {qrDataUrl ? <PrintPoster paymentLink={paymentLink} qrDataUrl={qrDataUrl} checkoutUrl={checkoutUrl} /> : null}
      </div>
    </>
  );
}
