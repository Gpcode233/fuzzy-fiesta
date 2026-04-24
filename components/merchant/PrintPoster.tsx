import type { PaymentLink } from '@/types';

interface PrintPosterProps {
  paymentLink: PaymentLink;
  qrSvgMarkup: string;
  checkoutUrl: string;
}

export function PrintPoster({ paymentLink, qrSvgMarkup, checkoutUrl }: PrintPosterProps) {
  const amountLabel = typeof paymentLink.amount === 'number'
    ? `${paymentLink.currency} ${paymentLink.amount.toLocaleString()}`
    : 'Pay any amount';
  const description = paymentLink.description && paymentLink.description !== 'Generated via builder'
    ? paymentLink.description
    : '';

  const shortUrl = checkoutUrl
    .replace(/^https?:\/\//, '')
    .replace(/^www\./, '');

  return (
    <section
      id="payment-poster"
      className="mx-auto flex min-h-[520px] w-[760px] max-w-full flex-col border border-zinc-200 bg-white px-10 py-10 text-zinc-900 shadow-xl font-sans"
    >
      <div className="mb-8 h-3 w-full bg-accent" />
      
      <div className="flex-1 space-y-12">
        <div>
          <h2 className="font-serif text-5xl font-medium tracking-tight text-zinc-900">{paymentLink.title}</h2>
          {description ? <p className="mt-4 text-lg text-zinc-500 max-w-md">{description}</p> : null}
        </div>

        <div className="grid gap-12 md:grid-cols-[1.2fr_0.9fr] md:items-end">
          <div className="space-y-8">
            <div>
              <p className="font-serif text-xs uppercase tracking-[0.3em] text-zinc-400">Total Due</p>
              <p className="mt-2 font-serif text-6xl font-medium text-zinc-900">{amountLabel}</p>
            </div>
            
            <div className="space-y-2">
              <p className="font-serif text-xs uppercase tracking-[0.3em] text-zinc-400">Payment link</p>
              <p className="text-lg font-medium text-zinc-900">{shortUrl}</p>
              <p className="text-sm text-zinc-500">Scan the QR code to pay in BTC, ETH, USDT, NGN or KES</p>
            </div>

          </div>

          <div className="flex items-center justify-center">
            <div className="rounded-[32px] border border-zinc-100 bg-panel p-8 shadow-sm">
              <div
                aria-label={`QR code for ${shortUrl}`}
                className="qr-code-markup"
                dangerouslySetInnerHTML={{ __html: qrSvgMarkup }}
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
