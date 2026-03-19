'use client';

export function CurrencySelector({
  currencies,
  value,
  onChange
}: {
  currencies: string[];
  value: string;
  onChange: (next: string) => void;
}) {
  return (
    <div className="grid grid-cols-2 gap-2 md:grid-cols-4">
      {currencies.map((currency) => (
        <button
          key={currency}
          className={`card ${value === currency ? 'ring-2 ring-accent' : ''}`}
          onClick={() => onChange(currency)}
          type="button"
        >
          {currency}
        </button>
      ))}
    </div>
  );
}
