'use client';

import { useState } from 'react';
import type { BushaQuote, PaymentLink } from '@/types';
import { CurrencySelector } from './CurrencySelector';
import { QuoteDisplay } from './QuoteDisplay';

export function CheckoutWidget({ link }: { link: PaymentLink }) {
  const [currency, setCurrency] = useState(link.acceptedCurrencies[0] ?? 'BTC');
  const [quote, setQuote] = useState<BushaQuote | null>(null);
  const [loading, setLoading] = useState(false);

  const fetchQuote = async () => {
    setLoading(true);
    const res = await fetch('/api/quote', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        source_currency: currency,
        target_currency: link.settlementCurrency,
        target_amount: String(link.amount ?? 100)
      })
    });
    const data = (await res.json()) as BushaQuote;
    setQuote(data);
    setLoading(false);
  };

  return (
    <div className="space-y-4">
      <CurrencySelector currencies={link.acceptedCurrencies} value={currency} onChange={setCurrency} />
      <button className="btn-primary" onClick={fetchQuote} disabled={loading} type="button">
        {loading ? 'Fetching quote...' : 'Get Quote'}
      </button>
      <QuoteDisplay quote={quote} />
    </div>
  );
}
