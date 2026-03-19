import type { BushaQuote } from '@/types';

export function QuoteDisplay({ quote }: { quote: BushaQuote | null }) {
  if (!quote) return <div className="card">Select currency to fetch quote.</div>;
  return (
    <div className="card space-y-2">
      <p className="text-sm text-white/70">Locked quote</p>
      <p>You send <span className="font-bold">{quote.source_amount} {quote.source_currency}</span></p>
      <p>Merchant receives <span className="font-bold">{quote.target_amount} {quote.target_currency}</span></p>
      <div className="h-2 rounded-full bg-white/10">
        <div className="h-2 w-3/5 rounded-full bg-accent" />
      </div>
    </div>
  );
}
