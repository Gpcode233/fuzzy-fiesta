import type { BushaQuote } from '@/types';

export function QuoteDisplay({ quote }: { quote: BushaQuote | null }) {
  if (!quote) return <div className="card text-zinc-500">Select currency to fetch quote.</div>;
  return (
    <div className="card space-y-2 border-zinc-200 bg-white">
      <p className="font-serif text-sm uppercase tracking-wider text-zinc-400">Locked quote</p>
      <p className="text-zinc-900">You send <span className="font-serif font-medium">{quote.source_amount} {quote.source_currency}</span></p>
      <p className="text-zinc-900">Merchant receives <span className="font-serif font-medium">{quote.target_amount} {quote.target_currency}</span></p>
      <div className="h-2 rounded-full bg-zinc-100 overflow-hidden">
        <div className="h-2 w-3/5 rounded-full bg-accent" />
      </div>
    </div>
  );
}
