import type { PaymentLink } from '@/types';

interface PrintPosterProps {
  paymentLink: PaymentLink;
  qrDataUrl: string;
  checkoutUrl: string;
}

export function PrintPoster({ paymentLink, qrDataUrl, checkoutUrl }: PrintPosterProps) {
  const amountLabel = paymentLink.isFixed && paymentLink.quoteAmount
    ? `${paymentLink.quoteCurrency} ${Number(paymentLink.quoteAmount).toLocaleString()}`
    : 'Pay any amount';

  const shortUrl = checkoutUrl
    .replace(/^https?:\/\//, '')
    .replace(/^www\./, '');

  return (
    <section
      id="payment-poster"
      className="mx-auto flex h-[500px] w-[500px] flex-col border border-black bg-white p-6 text-black shadow-2xl"
    >
      <div className="mb-4 h-2 w-full bg-accent" />
      <h2 className="text-3xl font-bold uppercase tracking-tight">{paymentLink.name}</h2>
      <p className="mt-1 min-h-10 text-sm text-black/70">{paymentLink.description ?? paymentLink.title}</p>
      <p className="mt-4 text-4xl font-extrabold">{amountLabel}</p>
      <div className="mt-6 flex flex-1 items-center justify-center">
        <div className="rounded-xl border border-black/20 bg-white p-4">
          <img src={qrDataUrl} alt={`QR code for ${shortUrl}`} className="h-[220px] w-[220px]" />
        </div>
      </div>
      <p className="mt-4 text-center text-sm font-medium">{shortUrl}</p>
      <p className="text-center text-sm text-black/70">Scan to pay with any currency</p>
      <p className="mt-5 text-center text-xs text-black/60">AnyPay · Secured by Busha</p>
    </section>
  );
}
