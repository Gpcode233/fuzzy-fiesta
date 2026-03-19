'use client';

import { useState } from 'react';
import type { PaymentLink } from '@/types';

type CommercePayload = {
  public_key: string;
  quote_amount?: string;
  quote_currency?: string;
  target_currency: string;
  meta: { name: string; email: string };
  devMode: boolean;
  source: 'payment-link';
  source_id: string;
  onSuccess: (data: unknown) => void;
  onClose: (data: unknown) => void;
};

type BushaCommerceFn = (payload: CommercePayload) => void;

export function CheckoutWidget({ link }: { link: PaymentLink }) {
  const [name, setName] = useState('Customer');
  const [email, setEmail] = useState('customer@email.com');
  const [status, setStatus] = useState<'idle' | 'success'>('idle');

  const openWidget = async () => {
    const module = await import('@busha/commerce-js');
    const BushaCommerce = (module.default as unknown as BushaCommerceFn);

    BushaCommerce({
      public_key: link.pubKey,
      quote_amount: link.quoteAmount,
      quote_currency: link.quoteCurrency,
      target_currency: link.settlementCurrency,
      meta: { name, email },
      devMode: true,
      source: 'payment-link',
      source_id: link.id,
      onSuccess: () => setStatus('success'),
      onClose: () => undefined
    });
  };

  if (status === 'success') {
    return (
      <div className="card space-y-2 border-accent/40">
        <h2 className="text-2xl font-semibold">Payment received!</h2>
        <p className="text-white/70">Thanks for your payment. The merchant has been notified.</p>
      </div>
    );
  }

  return (
    <section className="card space-y-4">
      <h2 className="text-xl font-semibold">Pay now</h2>
      <p className="text-sm text-white/70">Enter your details and continue in the secure payment popup.</p>
      <input className="input" value={name} onChange={(event) => setName(event.target.value)} placeholder="Your name" />
      <input className="input" value={email} onChange={(event) => setEmail(event.target.value)} placeholder="Email" type="email" />
      <button className="btn-primary w-full" type="button" onClick={openWidget}>Pay Now</button>
    </section>
  );
}
