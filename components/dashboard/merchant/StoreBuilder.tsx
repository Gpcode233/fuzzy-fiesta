'use client';

import { useMemo, useState } from 'react';
import { PosterActions } from '@/components/merchant/PosterActions';
import type { PaymentLink, PaymentLinkPayload } from '@/types';

const currencies = ['NGN', 'USDT', 'BTC', 'ETH'];

export function StoreBuilder() {
  const appUrl = process.env.NEXT_PUBLIC_APP_URL ?? 'http://localhost:3000';
  const [name, setName] = useState('Lavender Perfume Store');
  const [title, setTitle] = useState('Buy Lavender No.5');
  const [description, setDescription] = useState('Premium perfume, 50ml');
  const [amount, setAmount] = useState('25000');
  const [settlementCurrency, setSettlementCurrency] = useState('NGN');
  const [fixedAmount, setFixedAmount] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [createdLink, setCreatedLink] = useState<PaymentLink | null>(null);
  const [error, setError] = useState<string | null>(null);

  const checkoutUrl = useMemo(() => (createdLink ? `${appUrl}/pay/${createdLink.id}` : ''), [appUrl, createdLink]);

  const onSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsSubmitting(true);
    setError(null);

    const payload: PaymentLinkPayload = {
      fixed: fixedAmount,
      one_time: false,
      name,
      title,
      description,
      target_currency: settlementCurrency,
      quote_amount: fixedAmount ? amount : undefined,
      quote_currency: settlementCurrency,
      allow_customer_amount: !fixedAmount,
      require_extra_info: [{ field_name: 'email', required: true }]
    };

    try {
      const response = await fetch('/api/payment-links', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });

      const body = (await response.json()) as PaymentLink | { error?: string };
      if (!response.ok || !('id' in body)) {
        const message = 'error' in body && body.error ? body.error : 'Unable to create payment link. Please try again.';
        setError(message);
        return;
      }

      setCreatedLink(body);
    } catch {
      setError('Unable to create payment link right now. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const copyLink = async () => {
    if (checkoutUrl) await navigator.clipboard.writeText(checkoutUrl);
  };

  return (
    <div className="grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
      <form className="card space-y-4" onSubmit={onSubmit}>
        <h2 className="text-xl font-semibold">Create payment link</h2>
        <p className="text-sm text-white/70">Share this with customers and get paid in your preferred currency.</p>

        <label className="block text-sm">
          Store or campaign name
          <input className="input mt-1" value={name} onChange={(e) => setName(e.target.value)} required />
        </label>
        <label className="block text-sm">
          Link title
          <input className="input mt-1" value={title} onChange={(e) => setTitle(e.target.value)} required />
        </label>
        <label className="block text-sm">
          Description
          <textarea className="input mt-1 min-h-20" value={description} onChange={(e) => setDescription(e.target.value)} />
        </label>

        <div className="grid gap-3 md:grid-cols-2">
          <label className="block text-sm">
            You&apos;ll receive in
            <select className="input mt-1" value={settlementCurrency} onChange={(e) => setSettlementCurrency(e.target.value)}>
              {currencies.map((currency) => <option key={currency} value={currency}>{currency}</option>)}
            </select>
          </label>
          <label className="flex items-end gap-2 text-sm">
            <input type="checkbox" checked={fixedAmount} onChange={(e) => setFixedAmount(e.target.checked)} />
            Fixed amount
          </label>
        </div>

        {fixedAmount ? (
          <label className="block text-sm">
            Amount
            <input className="input mt-1" value={amount} onChange={(e) => setAmount(e.target.value)} required={fixedAmount} />
          </label>
        ) : null}

        {error ? <p className="text-sm text-red-300">{error}</p> : null}

        <button className="btn-primary" type="submit" disabled={isSubmitting}>
          {isSubmitting ? 'Creating...' : 'Generate link'}
        </button>
      </form>

      <aside className="card space-y-4">
        <h3 className="text-lg font-semibold">Creation success</h3>
        {createdLink ? (
          <>
            <p className="text-sm text-white/70">Your shareable AnyPay URL is ready.</p>
            <div className="rounded-lg border border-white/10 bg-black/30 p-3 text-sm">{checkoutUrl}</div>
            <div className="flex gap-2">
              <button className="rounded-lg border border-white/20 px-3 py-2 text-sm" type="button" onClick={copyLink}>Copy Link</button>
              <a href={checkoutUrl} className="rounded-lg border border-white/20 px-3 py-2 text-sm">Share</a>
            </div>
            <PosterActions paymentLink={createdLink} appUrl={appUrl} className="flex flex-wrap gap-2" />
          </>
        ) : (
          <p className="text-sm text-white/70">Fill the form to generate your first customer-facing link.</p>
        )}
      </aside>
    </div>
  );
}
